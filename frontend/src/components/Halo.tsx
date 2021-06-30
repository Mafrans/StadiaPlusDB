import React, {PropsWithChildren} from 'react';
import styled from "styled-components";

type HaloProps = {
    color?: string
    thickness?: number
    range?: number
}

function Halo(props: PropsWithChildren<HaloProps>) {
    return (
        <Wrapper>
            <Content thickness={props.thickness || 2}>{props.children}</Content>
            <Shadow thickness={props.thickness || 2} blur={props.range || 8} color={props.color || 'var(--color-neon-gradient)'} />
        </Wrapper>
    );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
`;

const Content = styled.div<{thickness: number}>`
  display: flex;
  border-radius: var(--border-radius-full);
  overflow: hidden;
`

const Shadow = styled.div<{color: string, thickness: number, blur: number}>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: var(--border-radius-full);
  background: ${props => props.color};
  transform: scale(2);
    
  /* The world famous gradient, it works much better than you'd expect. */
  ${props => {
      const base = 34 + '%';
      const blur = props.blur + 'px';
      const thickness = props.thickness / 2 + 'px';
      const antialias = 0.25 + 'px';
      const theGradient = `radial-gradient(
          transparent ${base}, 
          black calc(${base} + ${antialias}), 
          black calc(${base} + ${antialias} + ${thickness}),
          rgba(0, 0, 0, 0.4) calc(${base} + ${antialias} + ${thickness} + ${antialias}),
          transparent calc(${base} + ${antialias} + ${thickness} + ${antialias} + ${blur})
      )`;
      
      return `
          -webkit-mask-image: ${theGradient};
          mask-image: ${theGradient};
      `;
  }}
`

export default Halo;