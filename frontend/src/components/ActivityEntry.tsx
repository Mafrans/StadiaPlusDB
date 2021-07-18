import React, {useState} from 'react';
import AchievementCard from "./AchievementCard";
import styled from "styled-components";
import {CgChevronUp, CgMore} from "react-icons/cg";
import {formatPlayTime} from "../helpers";
import style from '../styles/components/activity-entry.css';

type ActivityEntryProps = {
    entry: any
}

function ActivityEntry(props: ActivityEntryProps) {
    const [showAll, setShowAll] = useState<boolean>(false);

    const {type, game, achievements, playTime, createdAt} = props.entry;
    console.log(props.entry)
    const lineImage = `<svg width="2" height="12" viewBox="0 0 2 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="1" cy="1" r="1" fill="#BFBFBF"/></svg>`;

    let label;
    switch (type) {
        case 'unlock':
            label = <p>Unlocked an item</p>;
            break;
        case 'progress':
            label = <p>Played <strong>{game.name}</strong> for {formatPlayTime(playTime) + (achievements.length ? `, unlocking ${achievements.length} achievements` : '')}.</p>;
            break;
        case 'patreon':
            label = <p>Is now a Patreon supporter</p>;
            break;
    }

    return (
        <div className={style['activity-entry']}>
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

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function formatTimestamp(timestamp: number) {
    const date = new Date(timestamp);

    return `${date.getDay()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export default ActivityEntry;