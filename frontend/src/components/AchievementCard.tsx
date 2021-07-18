import React from 'react';
import {Achievement} from "@prisma/client";
import style from '../styles/components/achievement-card.css'

interface AchievementCardProps {
    achievement: Achievement
}

export default function AchievementCard(props: AchievementCardProps) {
    let {imageURL, name, description} = props.achievement;
    description = description.length <= 64 ? description : description.substring(0, 64) + '...';

    return <div className={style['achievement-card']}>
        <img className={style.thumbnail} alt={'Achievement thumbnail'} src={imageURL} />
        <p className={style.name}>{name}</p>
        <p className={style.description}>{description}</p>
    </div>
}