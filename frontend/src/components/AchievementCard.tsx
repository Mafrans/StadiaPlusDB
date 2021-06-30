import React from 'react';
import {Achievement} from "../../../backend/src/database/models/Achievement";
import styled from "styled-components";
import tw from "twin.macro";
import {Theme} from "../Theme";

interface AchievementCardProps {
    achievement: Achievement
}

export default function AchievementCard(props: AchievementCardProps) {
    let {imageURL, name, description} = props.achievement;
    description = description.length <= 64 ? description : description.substring(0, 64) + '...';

    return <Wrapper>
        <Thumbnail src={imageURL} />
        <TextContainer>
            <Name>{name}</Name>
            <Description>{description}</Description>
        </TextContainer>
    </Wrapper>
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    border-radius: var(--border-radius-lg);
    padding: 0.25rem;
    background: var(--color-gray-800);
`

const Thumbnail = styled.img`
    width: 5rem;
    height: 5rem;
    border-radius: var(--border-radius-md);
    margin-right: 1rem;
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
    color: var(--color-white);
`

const Name = styled.p`
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-semibold);
`

const Description = styled.p`
    font-weight: var(--font-weight-thin);
    opacity: 70%;
`