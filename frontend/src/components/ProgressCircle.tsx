import React, {CSSProperties} from 'react';
import styled from "styled-components";

type ProgressCircleProps = {
    size: number
    value: number
    style: CSSProperties
}

function ProgressCircle(props: ProgressCircleProps) {
    return (
        <Wrapper style={props.style} size={props.size}>
            <HalfWrapper>
                <Half rot={Math.min(props.value * 360, 180) + 180} />
            </HalfWrapper>
            <HalfWrapper right>
                <Half right rot={Math.max(props.value * 360, 180)} />
            </HalfWrapper>
            <BackgroundCircle />
        </Wrapper>
    );
}

const Wrapper = styled.div<{size: number}>`
    position: relative;
    width: ${p => p.size}px;
    height: ${p => p.size}px;
`

const HalfWrapper = styled.div<{right?: boolean}>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip-path: inset(${p => p.right ? '0 50% 0 0' : '0 0 0 50%'});
    z-index: 1;
`

const Half = styled.div<{rot: number, right?: boolean}>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 2px solid var(--color-neon-cherry);
    border-radius: var(--border-radius-full);
    transform: rotate(${p => p.rot}deg);
    clip-path: inset(${p => p.right ? '0 50% 0 0' : '0 0 0 50%'});
`

const BackgroundCircle = styled.div`
    position: absolute;
    inset: 1px;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    border-radius: var(--border-radius-full);
    border: 1px solid var(--color-gray-700);
    box-sizing: border-box;
`

export default ProgressCircle;