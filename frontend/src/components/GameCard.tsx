import React, {useEffect, useState} from 'react';
import {CgSandClock, CgTrophy} from "react-icons/cg";
import {formatPlayTime} from "../helpers";
import styled from "styled-components";
import ProgressCircle from "./ProgressCircle";
import {Game} from "@prisma/client";

interface GameCardProps {
    game: Game
    achievementCount: number
}

export default function GameCard(props: GameCardProps) {
    const {game, achievementCount} = props;

    useEffect(() => {

    }, [game])

    return <Wrapper>
        <Thumbnail src={game.imageURL} />
        <GameInfo>
            <Name>{game.name}</Name>
            <Stats>
                <Stat>
                    <CgSandClock size={16} />
                    { formatPlayTime(game.playTime) }
                </Stat>
                <Stat>
                    { 350 /* TODO: calculate XP here */ } XP
                </Stat>
                <Stat>
                    <CgTrophy size={16} />
                    {achievementCount}/{game.totalAchievements}
                    <ProgressCircle
                        style={{ top: 3, marginLeft: '0.325rem' }}
                        size={18}
                        value={achievementCount / game.totalAchievements}
                    />
                </Stat>
            </Stats>
        </GameInfo>
    </Wrapper>
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
  
    border-radius: var(--border-radius-lg);
    color: var(--color-white);
    font-size: var(--font-size-base);
`

const Thumbnail = styled.div<{src: string}>`
    height: 0;
    padding-top: 61.835%; // Golden ratio, look at how cool I am
    background-image: url("${p => p.src}");
    background-position: center;
    background-size: cover;
`

const GameInfo = styled.div`
    padding: 1rem;
  
    background: var(--color-gray-800);
`

const Name = styled.h3`
    font-weight: var(--font-weight-medium);
`

const Stats = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 0.25rem;
  
    color: var(--color-gray-400);
    font-weight: var(--font-weight-light);
`

const Stat = styled.div`
    display: flex;
    align-items: baseline;
    
    >* {
        position: relative;
        top: 1px;
        
        &:first-child {
            margin-right: 0.325rem;
        }
    }
`