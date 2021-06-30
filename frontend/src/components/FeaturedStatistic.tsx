import React from 'react';
import styled from "styled-components";
import {mixins} from "../styleHelper";

type FeaturedStatisticProps = {
    color?: string
    gradient?: string
    large?: boolean
    prefix?: string
    value: any
    label?: string
    suffix?: string
}

function FeaturedStatistic(props: FeaturedStatisticProps) {
    return (
        <Wrapper>
            <Content>
                <ValueContainer>
                    <Prefix>{ props.prefix }</Prefix>
                    <Value color={props.color} gradient={props.gradient} large={props.large}>{ props.value }</Value>
                    <Suffix>{ props.suffix }</Suffix>
                </ValueContainer>
                <Label>{ props.label }</Label>
            </Content>
        </Wrapper>
    );
}

const Wrapper = styled.div`
  position: relative;
  padding-top: 50%;
  
  border-radius: var(--border-radius-lg);
  background: var(--color-gray-800);
`

const Content = styled.div`
  max-width: 100%;
  max-height: 100%;
  
  ${mixins.absoluteCenterBoth}
  color: var(--color-white);
`

const Prefix = styled.span`
  margin: 0 0.5rem;
  
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-regular);
`
const Suffix = Prefix;

const ValueContainer = styled.div`
  width: 100%;
  text-align: center;
`

const Value = styled.span<{large: boolean, color?: string, gradient?: string}>`
  margin: 0 auto;
  
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-${p => p.large ? `xl` : '2xl'});
  ${p => p.color && `color: ${p.color}`};
  ${p => p.gradient && mixins.textGradient(p.gradient)};
`

const Label = styled.p`
  opacity: 70%;
  width: max-content;
  
  font-weight: var(--font-weight-thin);
`

export default FeaturedStatistic;