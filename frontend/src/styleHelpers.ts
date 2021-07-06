import {css, FlattenSimpleInterpolation} from "styled-components";

const breakpoints = {
    xs: 640,
    sm: 768,
    md: 1024,
    lg: 1280,
    xl: 1536
}

export const mixins = {
    absoluteCenterX: css`
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    `,
    absoluteCenterY: css`
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    `,
    absoluteCenterBoth: `
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    `,
    textGradient: (gradient: string) => css`
      background: ${gradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    `,
    breakpoint: (bp: "xs" | "sm" | "md" | "lg" | "xl", content: FlattenSimpleInterpolation) => css`
      @media (min-width: ${breakpoints[bp]}px) {
        ${content};
      }
    `
};