import React from 'react';
import styled from "styled-components";

interface ProgressBarProps {
    value: number
    bg?: string
}

export default function ProgressBar(props: ProgressBarProps) {
    return <Wrapper>
        <Progress bg={props.bg || 'var(--color-neon-gradient)'} value={props.value}/>
    </Wrapper>
}

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.2);
  height: 2px;
  
  border-radius: var(--border-radius-full);
`;

const Progress = styled.div<{bg: string, value: number}>`
  position: absolute;
  height: 100%;
  width: ${props => props.value * 100}%;
  background: ${props => props.bg};
`;