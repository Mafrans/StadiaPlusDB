import React, {useEffect, useState} from 'react';
import {CgSandClock, CgTrophy} from "react-icons/cg";
import {formatPlayTime} from "../helpers";
import styled from "styled-components";
import ProgressCircle from "./ProgressCircle";
import {Game} from "@prisma/client";
import style from '../styles/components/game-card.css';

interface GameCardProps {
    game: Game
    achievementCount: number
}

export default function GameCard(props: GameCardProps) {
    const {game, achievementCount} = props;

    return <article className={style['game-card']}>
        <div role="img" className={style.thumbnail} style={{backgroundImage: `url("${game.imageURL}")`}} />
        <div className={style['text-container']}>
            <p className={style.name}>{game.name}</p>
            <div className={style['stat-list']}>
                <div className={style.stat}>
                    <CgSandClock size={16} />
                    { formatPlayTime(game.playTime) }
                </div>
                <div className={style.stat}>
                    { calculateXP(achievementCount, game.playTime, game.totalAchievements) } XP
                </div>
                <div className={style.stat}>
                    <CgTrophy size={16} />
                    {achievementCount}/{game.totalAchievements}
                    <ProgressCircle
                        style={{ top: 3, marginLeft: '0.325rem' }}
                        size={18}
                        value={achievementCount / game.totalAchievements}
                    />
                </div>
            </div>
        </div>
    </article>
}

function calculateXP(achievementCount: number, playTime: number, totalAchievements: number) {
    const value = playTime/3600 * 10
        + achievementCount * (1000 / totalAchievements)
        + (achievementCount === totalAchievements ? 200 : 0);

    return Math.floor(value / 10) * 10;
}