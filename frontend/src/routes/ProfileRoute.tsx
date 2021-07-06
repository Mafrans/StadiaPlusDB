import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import ProfilePicture from "../components/ProfilePicture";
import {CgArrowRight, CgGift, CgPin} from "react-icons/cg";
import styled from "styled-components";
import LevelCard from "../components/LevelCard";
import {getAchievementCount, getGames, getProfile, getRecentHistory} from "../apiHelpers";
import Container from "../Container";
import FeaturedStatistic from "../components/FeaturedStatistic";
import ActivityEntry from "../components/ActivityEntry";
import {mixins} from "../styleHelpers";
import GameCard from "../components/GameCard";
import {Game, History, User} from "@prisma/client";

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
    const [achievementCount, setAchievementCount] = useState<number>();

    let { name, tag } = useParams<ProfileRouteParams>();

    if (!tag) {
        const hash = location.hash.substring(1, 5);
        if (!hash) {
            tag = '0000';
        }
        tag = hash;
    }

    useEffect(() => {
        getProfile(name, tag).then(json => setProfile(json));
        getAchievementCount(name, tag).then(count => setAchievementCount(count));
        getRecentHistory(name, tag).then(history => setHistory(history));
        getGames(name, tag).then(games => setGames(games));
    }, [])

    if (!profile) {
        return null;
    }

    return <Container>
        <Wrapper>
            <AboutSection>
                <ProfilePictureWrapper>
                    <ProfilePicture url={profile.avatar} />
                </ProfilePictureWrapper>
                <Biography>
                    <NameWrapper>
                        <Name>{name}</Name>
                        <Tag>#{tag}</Tag>
                    </NameWrapper>
                    <AboutText>I am xfoxx, the world-famous fox that likes to arrange rectangles on the computer.</AboutText>

                    <BadgeWrapper>
                        <Badge>
                            <CgGift size={24}/>
                            <BadgeLabel>Bronze Tier</BadgeLabel>
                        </Badge>
                        <Badge>
                            <CgPin size={24}/>
                            <BadgeLabel>Sweden</BadgeLabel>
                        </Badge>
                    </BadgeWrapper>
                </Biography>
                <LevelCardWrapper>
                    <LevelCard xp={3170} last={3000} next={3240} />
                </LevelCardWrapper>
            </AboutSection>
            <FeaturedStatisticsSection>
                <FeaturedStatistic
                    value={26} label={'Games Owned'}
                    gradient={'var(--color-neon-gradient)'}
                />
                <FeaturedStatistic
                    value={638} suffix={'h'} label={'Total play time'}
                    gradient={'var(--color-neon-gradient)'}
                />
                <FeaturedStatistic
                    value={achievementCount} label={'Achievements'}
                    gradient={'var(--color-neon-gradient)'}
                />
                <FeaturedStatistic
                    value={26} suffix={'%'} label={'Avg. Completion Rate'}
                    gradient={'var(--color-neon-gradient)'}
                />
                <FeaturedStatistic
                    value={4} label={'Perfect games'}
                    gradient={'var(--color-neon-gradient)'}
                />
            </FeaturedStatisticsSection>
            <RecentActivitySection>
                <Heading>Recent Activity</Heading>
                <div>
                    { history.map(entry => <ActivityEntry entry={entry} />) }
                </div>
                <ActivityButton>
                    <span>Show all activity</span>
                    <CgArrowRight size={24} />
                </ActivityButton>
            </RecentActivitySection>
            <GamesSection>
                <Heading>Most Played Games</Heading>
                <GameCardGrid>
                    { games.map(game => <GameCard game={game} achievementCount={1} />) }
                </GameCardGrid>
            </GamesSection>
        </Wrapper>
    </Container>
}

const Wrapper = styled.div`
  font-family: Overpass, sans-serif;
`

const ProfilePictureWrapper = styled.div`
  margin-top: -3rem;
`

const AboutSection = styled.section`
  display: flex;
`

const Biography = styled.div`
  width: 36rem;
  
  color: var(--color-white)
`

const LevelCardWrapper = styled.div`
  margin-right: 6rem;
  margin-left: auto;
`

const NameWrapper = styled.div`
  display: flex;
  align-items: baseline;
`

const Name = styled.div`
  ${mixins.textGradient('var(--color-neon-gradient)')}
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
`

const Tag = styled.div`
  margin-left: 0.25rem;
  opacity: 70%;
  
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-thin);
`

const AboutText = styled.div`
  margin-top: 0.5rem;
  
  font-weight: var(--font-weight-light);
`

const BadgeWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
`

const Badge = styled.div`
  display: flex;
  margin-right: 1.5rem;
  opacity: 70%;
`

const BadgeLabel = styled.span`
  margin-left: 0.5rem;
  
  font-weight: var(--font-weight-thin);
`

const FeaturedStatisticsSection = styled.section`
  display: grid;
  gap: 1rem;
  grid-template-columns: auto auto auto auto auto;
  margin-top: 12rem;
`

const Section = styled.section`
  margin-top: 6rem;
`
const RecentActivitySection = Section;
const GamesSection = Section;

const Heading = styled.h2`
  padding-bottom: 1.5rem;
  padding-top: 0.5rem;
    
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-white);
`

const ActivityButton = styled.button`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  padding: 1rem;
  border: none;
  
  color: var(--color-white);
  border-radius: var(--border-radius-lg);
  background: var(--color-gray-800);
  
  span {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    font-family: Overpass, sans-serif;
    margin-right: 0.5rem;
  }
`

const GameCardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
`

