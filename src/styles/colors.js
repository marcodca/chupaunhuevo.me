import { css } from "styled-components";
import chroma from "chroma-js";

const defaultColors = {
  primary: "#f38181",
  accent: "#fce38a",
  success: "#88c459",
  error: "#f5414f",
  warning: "#ffd137"
};

const { primary, accent, success, error, warning } = defaultColors;

const colors = css`
  :root {
    /* main colors */

  
    --color-primary: ${props => props.theme.colors.primary || primary};
    --color-primary-light: ${props =>
      chroma(props.theme.colors.primary || primary).brighten()};
    --color-primary-dark: ${props =>
      chroma(props.theme.colors.primary || primary).darken()};
    --color-primary-bg: ${props =>
      chroma(props.theme.colors.primary || primary).alpha(0.2)};

    --color-accent: ${props => props.theme.colors.accent || accent};
    --color-accent-light: ${props =>
      chroma(props.theme.colors.accent || accent).brighten()};
    --color-accent-dark: ${props =>
      chroma(props.theme.colors.accent || accent).darken()};
    --color-accent-bg: ${props =>
      chroma(props.theme.colors.accent || accent).alpha(0.2)};


    /* Generating the base color scale */
    ${props =>
      chroma
        .scale([props.theme.colors.base.initial, props.theme.colors.base.final])
        .mode("lch")
        .colors(8)
        .map((color, i) => css`--color-base-${i}: ${color};`)}
          
    --color-success: ${props => props.theme.colors.success || success};
    --color-error: ${props => props.theme.colors.error || error};
    --color-warning: ${props => props.theme.colors.success || warning};

    /* typography */
    --color-text: var(--color-base-6);
    --color-text-heading: var(--color-base-7);
    --color-text-subtle: var(--color-base-5);
    --color-link: var(--color-primary);
    --color-link-visited: var(--color-primary-dark);
    --color-mark: var(--color-accent-bg);
    --color-blockquote-border: var(--color-base-3);
    /* border */
    --color-border: var(--color-base-2);

    /* mock body color */
      body {
        background: var(--color-base-0);
        /* optional transition  */
        transition: font-size 0.2s, background-color 0.6s;
      }

    /* forms */
    --form-element-border: var(--color-border);
    --form-element-border-focus: var(--color-primary);
    --form-element-border-error: var(--color-error);
    --form-element-bg: var(--color-base-0);
    --form-text-placeholder: var(--color-base-4);

    /* buttons */
    --btn-primary-bg: var(--color-primary);
    --btn-primary-hover: var(--color-primary-light);
    --btn-primary-active: var(--color-primary-dark);
    --btn-primary-label: var(--color-base-0);

    /* icons */
    --color-icon-primary: var(--color-base-4);
    --color-icon-secondary: inherit;
  }
`;

export default colors;
