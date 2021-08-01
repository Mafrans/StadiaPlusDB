import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import Avatar from "../components/Avatar";
import {CgArrowRight, CgGift, CgPin} from "react-icons/cg";
import LevelCard from "../components/LevelCard";
import {getAchievements, getGames, getProfile, getRecentHistory} from "../apiHelpers";
import FeaturedStatistic from "../components/FeaturedStatistic";
import ActivityEntry from "../components/ActivityEntry";
import GameCard from "../components/GameCard";
import {Achievement, Game, History, User} from "@prisma/client";
import style from '../styles/routes/profile-route.css';
import Container from "../components/Container";
import { useHistory } from 'react-router-dom';

interface ProfileRouteParams {
    nameAndTag?: string
    name?: string
    tag?: string
}

interface ProfileRouteProps {
}


export default function ProfileRoute(props: ProfileRouteProps) {
    const [profile, setProfile] = useState<User>();
    const [history, setHistory] = useState<History[]>([]);
    const [games, setGames] = useState<Game[]>([]);
    const [achievements, setAchievements] = useState<Achievement[]>([]);

    const router = useHistory();

    let { name, tag } = useParams<ProfileRouteParams>();

    if (!tag) {
        const hash = location.hash.substring(1, 5);
        tag = hash ?? '0000';
    }

    useEffect(() => {
        getProfile(name, tag).then(json => setProfile(json));
        getAchievements(name, tag, undefined, 0, 9999).then(achievements => setAchievements(achievements));
        getRecentHistory(name, tag, 0, 4).then(history => setHistory(history));
        getGames(name, tag).then(games => setGames(games));
    }, [])

    if (!profile) {
        return null;
    }

    const perfectGames = games.filter(game => true /* TODO: Add real achievement statistics here */);

    return <Container>
        <section className={style.about}>
            {/* TODO: The following div is an unnecessary wrapper */}
            <div className={style.avatar}>
                <Avatar url={profile.avatar} />
            </div>

            <div className={style['name-container']}>
                <h1 className={style.username}>
                    {name}
                </h1>
                <span className={style.tag}>#{tag}</span>
            </div>
            <p className={style.biography}>
                I am xfoxx, the world-famous fox that likes to arrange rectangles on the computer.
            </p>
            <div className={style['badge-list']}>
                <div className={style.badge}>
                    <CgGift size={24}/>
                    <span>Bronze Tier</span>
                </div>
                <div className={style.badge}>
                    <CgPin size={24}/>
                    <span>Sweden</span>
                </div>
            </div>

            {/* TODO: The following div is an unnecessary wrapper */}
            <div className={style['level-card']}>
                <LevelCard xp={3170} last={3000} next={3240} />
            </div>
        </section>
        <section className={style.featured}>
            <dl>
                <FeaturedStatistic
                    value={games.length}
                    label={'Games Owned'}
                />
                <FeaturedStatistic
                    value={games.length && Math.round(games.map(it => it.playTime).reduce((a, b) => a + b) / 3600)}
                    suffix={'h'}
                    label={'Total play time'}
                />
                <FeaturedStatistic
                    value={achievements.length}
                    label={'Achievements'}
                />
                <FeaturedStatistic
                    value={games.length && perfectGames.length/games.length}
                    suffix={'%'}
                    label={'Avg. Completion Rate'}
                />
                <FeaturedStatistic
                    value={perfectGames.length}
                    label={'Perfect games'}
                />
            </dl>
        </section>
        <section className={style.activity}>
            <h2>Recent Activity</h2>
            <div>
                { history.map(entry => <ActivityEntry fade entry={entry} />) }
            </div>
            <button onClick={() => router.push(`/profile/${name}/${tag}/activity`)} className={style['all-activity']}>
                <span>Show all activity</span>
                <CgArrowRight size={24} />
            </button>
        </section>
        <section>
            <h2>Most Played Games</h2>
            <div className={style.games}>
                { games.map(game =>
                    <GameCard game={game} achievementCount={achievements.length && achievements.filter(it => it.gameId === game.id).length} />
                ) }
            </div>
        </section>
    </Container>;
}