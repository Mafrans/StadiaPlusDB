import {NextFunction, Response} from "express";
import {getLoginSession} from "../../../auth/helpers";
import {ProfileUpdateRequest} from "../../model";
import {prisma} from "../../../index";
import {User} from "@prisma/client";


export async function apiProfileUpdate(req: ProfileUpdateRequest, res: Response, next: NextFunction) {
    const login = getLoginSession(req);
    if (!login || !login.data) {
        return;
    }

    const data = req.body.data;
    const user = await prisma.user.update({
        where: {
            googleId: login.data
        },
        data: {
            avatar: data.profile.avatar
        }
    })

    if (!user.names.includes(data.profile.name)) {
        await prisma.user.update({
            where: {
                googleId: login.data
            },
            data: {
                names: {
                    push: data.profile.name
                },
                searchNames: {
                    push: data.profile.name.toLowerCase()
                }
            }
        })
    }

    if (data.game) {
        const oldGame = await prisma.game.findUnique({
            where: {
                userId_gameId: {
                    userId: user.id,
                    gameId: data.game.id
                }
            }
        });

        const game = await prisma.game.upsert({
            where: {
                userId_gameId: {
                    userId: user.id,
                    gameId: data.game.id
                }
            },
            create: {
                gameId: data.game.id,
                name: data.game.name,
                imageURL: data.game.image,
                playTime: data.playTime || 0,
                totalAchievements: data.achievementCount || data.achievements.length,
                userId: user.id
            },
            update: {
                playTime: data.playTime || 0,
                name: data.game.name,
                totalAchievements: data.achievementCount || data.achievements.length,
                imageURL: data.game.image
            }
        })

        let time = data.playTime;
        if (oldGame) {
            time -= oldGame.playTime;
        }

        const history = await prisma.history.create({
            data: {
                playTime: time,
                gameId: game.id,
                userId: user.id,
                type: 'progress'
            }
        })

        const oldAchievements = await prisma.achievement.findMany({ where: { gameId: game.id }});
        const newAchievements = data.achievements.filter(a => oldAchievements.find(b => parseInt(a.id) === b.index) !== null);

        await prisma.achievement.createMany({
            data: newAchievements.map(it => ({
                index: parseInt(it.id),
                name: it.name,
                description: it.description,
                imageURL: it.icon,
                gameId: game.id,
                userId: user.id,
                historyId: history.id
            })),
            skipDuplicates: true
        });

        // await updateXP(user);

        return res.status(200).end();
    }
    return res.status(500).end();
}

async function updateXP(user: User) {
    const achievements = await prisma.achievement.count({
        where: {
            userId: user.id
        }
    });

    const games = await prisma.game.count({
        where: {
            userId: user.id,
            achievements: {

            }
        }
    })
}