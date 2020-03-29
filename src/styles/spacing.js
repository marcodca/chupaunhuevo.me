import { css } from "styled-components";

const spacing = css`
  :root {
    /* spacing values */
    --space-unit: 1em;
    --space-xxs: calc(0.25 * var(--space-unit));
    --space-xs: calc(0.5 * var(--space-unit));
    --space-sm: calc(0.75 * var(--space-unit));
    --space-md: calc(1.25 * var(--space-unit));
    --space-lg: calc(2 * var(--space-unit));
    --space-xl: calc(3.25 * var(--space-unit));
    --space-xxl: calc(5.25 * var(--space-unit));

    /* fixed values - not affected by --space-unit or --text-base-size */
    --space-unit-fixed: 1rem;
    --space-xxs-fixed: calc(0.25 * var(--space-unit-fixed));
    --space-xs-fixed: calc(0.5 * var(--space-unit-fixed));
    --space-sm-fixed: calc(0.75 * var(--space-unit-fixed));
    --space-md-fixed: calc(1.25 * var(--space-unit-fixed));
    --space-lg-fixed: calc(2 * var(--space-unit-fixed));
    --space-xl-fixed: calc(3.25 * var(--space-unit-fixed));
    --space-xxl-fixed: calc(5.25 * var(--space-unit-fixed));
  }
`;

export default spacing;
