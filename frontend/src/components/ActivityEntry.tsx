import React, {useState} from 'react';
import AchievementCard from "./AchievementCard";
import styled from "styled-components";
import {CgChevronUp, CgMore} from "react-icons/cg";
import {formatPlayTime, formatTimestamp} from "../helpers";
import style from '../styles/components/activity-entry.css';

type ActivityEntryProps = {
    entry: any
    fade?: boolean
}

function ActivityEntry(props: ActivityEntryProps) {
    const [showAll, setShowAll] = useState<boolean>(false);

    const {type, game, achievements, playTime, createdAt} = props.entry;

    let label;
    switch (type) {
        case 'unlock':
            label = <p className={style.description}>Unlocked an item</p>;
            break;
        case 'progress':
            label = <p className={style.description}>Played <strong>{game.name}</strong> for {formatPlayTime(playTime) + (achievements.length ? `, unlocking ${achievements.length} achievements` : '')}.</p>;
            break;
        case 'patreon':
            label = <p className={style.description}>Is now a Patreon supporter</p>;
            break;
    }

    return (
        <div className={style['activity-entry'] + ' ' + (props.fade ? style.fade : '')}>
            <div className={style.line} />
            <div className={style.timestamp}>{ formatTimestamp(createdAt) }</div>
            { label }
            <div className={style.achievements}>
                { achievements.slice(0, showAll ? -1 : 6).map(achievement => <AchievementCard achievement={achievement}/>) }
            </div>
            <div className={style['button-container']}>
                { achievements.length > 6 && <button onClick={() => setShowAll(!showAll)}>
                    { showAll ? <CgChevronUp size={24} /> : <CgMore size={24} /> }
                    <span>Show { showAll ? 'less' : achievements.length - 6 + ' more' }</span>
                </button> }
            </div>
        </div>
    );
}

export default ActivityEntry;