import React from 'react';
import styled from "styled-components";
import {CgDanger} from "react-icons/cg";
import ProgressBar from "./ProgressBar";
import Halo from "./Halo";
import {breakpoints} from "../styleHelpers";

interface LevelCardProps {
    xp: number
    last: number
    next: number
    className?: string
}

export default function LevelCard(props: LevelCardProps) {
    return <Wrapper className={props.className}>
        <Level>
            <LevelLabel>Level</LevelLabel>
            <LevelCircleWrapper>
                <Halo color={'var(--color-neon-cherry)'}>
                    <LevelCircle>7</LevelCircle>
                </Halo>
            </LevelCircleWrapper>
        </Level>
        <Progress>
            <ProgressBar
                value={(props.xp - props.last)/(props.next - props.last)}
            />
            <XPLabels>
                <span>{props.xp.toLocaleString()} XP</span>
                <span>{props.next.toLocaleString()}</span>
            </XPLabels>
        </Progress>
        <Report>
            <CgDanger size={24} />
            <ReportLabel>Report this user</ReportLabel>
        </Report>
    </Wrapper>
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 4rem;
  color: var(--color-white);
  
  @media (min-width: ${breakpoints.sm}px) {
    width: 13rem;
    margin-left: 1rem;
    margin-top: 0rem;
  }
`;

const Level = styled.h3`
  display: flex;
  align-items: center;
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-lg);
`;

const LevelLabel = styled.span`
  margin-right: 1rem;
`

const LevelCircleWrapper = styled.div`
  margin-bottom: 0.4rem;
`

const LevelCircle = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 0.4rem;
  width: 2.75rem;
  height: 2.75rem;
  box-sizing: border-box;
`;

const Progress = styled.div`
  margin-top: 1rem;
`;

const XPLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  
  font-weight: var(--font-weight-thin);
`

const Report = styled.div`
  display: flex;
  margin-top: 1.5rem;
  opacity: 70%;
  
  font-weight: var(--font-weight-light);
`;

const ReportLabel = styled.span`
  margin-left: 0.5rem;
  text-decoration: underline;
`