import {css} from "styled-components";

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
    `
};