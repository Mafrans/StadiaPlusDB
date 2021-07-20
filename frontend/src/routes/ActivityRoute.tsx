import React, {useEffect, useState} from 'react';
import Container from "../components/Container";
import style from '../styles/routes/activity-route.css'
import {CgArrowLeft} from "react-icons/cg";
import Avatar from "../components/Avatar";
import {Achievement, Game, History, User} from "@prisma/client";
import {getAchievements, getGames, getProfile, getRecentHistory} from "../apiHelpers";
import {useParams} from "react-router";
import FeaturedStatistic from "../components/FeaturedStatistic";
import {largestTimeBetween} from "../helpers";
import ActivityEntry from "../components/ActivityEntry";
import {useHistory} from "react-router-dom";

interface ActivityRouteParams {
    nameAndTag?: string
    name?: string
    tag?: string
}

function ActivityRoute(props) {
    const [profile, setProfile] = useState<User>(null);
    const [history, setHistory] = useState<History[]>(null);
    const [games, setGames] = useState<Game[]>(null);
    const [achievements, setAchievements] = useState<Achievement[]>(null);

    const router = useHistory();

    let { name, tag } = useParams<ActivityRouteParams>();

    if (!tag) {
        const hash = location.hash.substring(1, 5);
        tag = hash ?? '0000';
    }

    useEffect(() => {
        getProfile(name, tag).then(json => setProfile(json));
        getAchievements(name, tag, undefined, 0, 9999).then(achievements => setAchievements(achievements));
        getRecentHistory(name, tag).then(history => setHistory(history));
        getGames(name, tag).then(games => setGames(games));
    }, []);

    const earliestActivePoint = new Date(history?.[history.length-1]?.createdAt);
    const timeActive = largestTimeBetween(Date.now(), earliestActivePoint?.getTime());

    return (profile && history && games && achievements) && <Container>
        <section>
            <nav className={style.navigation}>
                <button onClick={() => router.goBack()} className={style['back-button']}>
                    <CgArrowLeft size={24}/>
                </button>

                <div className={style.avatar}>
                    <Avatar url={profile.avatar} />
                </div>

                <p className={style.username}>{name}</p>
                <span className={style.tag}>#{tag}</span>
            </nav>

            <h1>Activity</h1>
        </section>
        <section>
            <div className={style.statistics}>
                <FeaturedStatistic
                    large
                    label={'Total play time'}
                    value={Math.floor(games.reduce((a, b) => a + (b.playTime / 3600), 0))}
                    suffix={'h'}
                />
                <FeaturedStatistic large label={'Achievements'} value={achievements.length} />
                <FeaturedStatistic large label={'Longest session'} value={'-:--'} suffix={'h'} />
                <FeaturedStatistic large label={'Since first activity'} value={timeActive.value ?? '-:--'} suffix={timeActive.abbrUnit} />
            </div>
        </section>
        <section>
            { history.map(entry => <ActivityEntry entry={entry} />) }
        </section>
    </Container>
}

export default ActivityRoute;