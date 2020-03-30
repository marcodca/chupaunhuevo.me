import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import colors from "./colors";
import typography from "./typography";
import spacing from "./spacing";
import shadows from './shadows';

//based on the amazing work from CodyHouse, create your design system: https://medium.com/codyhouse/create-your-design-system-part-1-typography-7c630d9092bd

const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${spacing}
  ${colors}
  ${typography}
  ${shadows}
`;

export default GlobalStyle;
