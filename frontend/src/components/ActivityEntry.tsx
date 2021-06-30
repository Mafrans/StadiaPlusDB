import React, {useState} from 'react';
import AchievementCard from "./AchievementCard";
import styled from "styled-components";
import {CgChevronUp, CgMore} from "react-icons/cg";

type ActivityEntryProps = {
    entry: any
}

function formatPlayTime(playTime: number) {
    const hours = Math.floor(playTime / 3600);
    const minutes = Math.floor((playTime - hours * 3600) / 60);

    return `${hours || ''} ${hours ? 'h' : ''} ${minutes} min`;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function formatTimestamp(timestamp: number) {
    const date = new Date(timestamp);

    return `${date.getDay()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function ActivityEntry(props: ActivityEntryProps) {
    const [showAll, setShowAll] = useState<boolean>(false);

    const {type, game, achievements, playTime, timestamp} = props.entry;
    console.log(props.entry)
    const lineImage = `<svg width="2" height="12" viewBox="0 0 2 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="1" cy="1" r="1" fill="#BFBFBF"/></svg>`;

    let label;
    switch (type) {
        case 'unlock':
            label = <Label>Unlocked an item</Label>;
            break;
        case 'progress':
            label = <Label>Played <Name>{game.name}</Name> for {formatPlayTime(playTime) + (achievements.length ? `, unlocking ${achievements.length} achievements` : '')}.</Label>;
            break;
        case 'patreon':
            label = <Label>Is now a Patreon supporter</Label>;
            break;
    }

    return (
        <Wrapper>
            <Line image={lineImage}/>
            <Handle />
            <Timestamp>{ formatTimestamp(timestamp) }</Timestamp>
            { label }
            <Achievements>
                { achievements.slice(0, showAll ? -1 : 6).map(achievement => <AchievementCard achievement={achievement}/>) }
            </Achievements>
            { achievements.length > 6 && <CollapseButton onClick={() => setShowAll(!showAll)}>
                { showAll ? <CgChevronUp size={24} /> : <CgMore size={24} /> }
                <span>Show { showAll ? 'less' : achievements.length - 6 + ' more' }</span>
            </CollapseButton> }
        </Wrapper>
    );
}

const Wrapper = styled.div`
  position: relative;
  margin-left: 10rem;
  margin-top: 0.5rem;
  padding-left: 2rem;
  padding-bottom: 4rem;
  width: 64rem;
    
  &:last-child>div:first-child{
    mask-image: linear-gradient(to bottom, #FFFFFF, #FFFFFF, transparent);
  }
`

const Line = styled.div<{ image: string }>`
  position: absolute;
  top: 1.25rem;
  left: 0;
  height: 100%;
  width: 2px;
  background-image: url("data:image/svg+xml,${props => encodeURIComponent(props.image)}");
  background-repeat: repeat-y;
`

const Handle = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 1px; /* half the width of the Line */
  width: 0.75rem;
  height: 0.75rem;
  transform: translateX(-50%);
  border: solid 2px #FFFFFF;
  
  border-radius: var(--border-radius-full);
  background: var(--color-gray-900);
`

const Timestamp = styled.div`
  position: absolute;
  width: 8rem;
  left: -10rem;
  top: -0.25rem;
  padding: 0.25rem 0;
  text-align: center;

  border-radius: var(--border-radius-full);
  color: var(--color-white);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-thin);
  background: var(--color-gray-800);
`

const Label = styled.p`
  margin-bottom: 0.25rem;

  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-thin);
  color: var(--color-white);
`

const Name = styled.span`
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-lg);
  color: var(--color-neon-tomato);
`

const Achievements = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  width: 100%;
`

const CollapseButton = styled.div`
  display: inline-flex;
  align-items: center;
  opacity: 70%;
  margin-top: 0.5rem;
  margin-left: auto;
  text-decoration: underline;
  cursor: pointer;

  color: var(--color-white);
  
  >span {
    margin-left: 0.5rem;
    margin-top: 0.3rem;
    
    font-weight: var(--font-weight-thin);
  }
`

export default ActivityEntry;