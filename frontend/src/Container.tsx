import styled, {css} from "styled-components";
import {mixins} from "./styleHelpers";

const Container = styled.div`
  padding: 14rem;
  font-family: Overpass, sans-serif;
  background: var(--color-gray-900);
  
  @media (max-width: var(--breakpoint-xl)) {
    padding: 10rem;
  }
  @media (max-width: var(--breakpoint-lg)) {
    padding: 8rem;
  }
  @media (max-width: var(--breakpoint-md)) {
    padding: 4rem;
  }
`

export default Container;