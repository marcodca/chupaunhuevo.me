import { css } from "styled-components"

const shadows = css`
  :root {
    --elevation-1: 0 2.9px 3.7px -21px rgba(0, 0, 0, 0.045),
      0 6.8px 8.8px -21px rgba(0, 0, 0, 0.065),
      0 12.9px 16.5px -21px rgba(0, 0, 0, 0.08),
      0 23px 29.5px -21px rgba(0, 0, 0, 0.095),
      0 43px 55.1px -21px rgba(0, 0, 0, 0.115),
      0 103px 132px -21px rgba(0, 0, 0, 0.16);
    --elevation-2: 0 2.9px 2.7px -9px rgba(0, 0, 0, 0.07),
      0 6.8px 6.5px -9px rgba(0, 0, 0, 0.101),
      0 12.9px 12.1px -9px rgba(0, 0, 0, 0.125),
      0 23px 21.7px -9px rgba(0, 0, 0, 0.149),
      0 43px 40.5px -9px rgba(0, 0, 0, 0.18),
      0 103px 97px -9px rgba(0, 0, 0, 0.25);
    --elevation-3: 0 3px 2.7px -2px rgba(0, 0, 0, 0.093),
      0 7.2px 6.5px -2px rgba(0, 0, 0, 0.133),
      0 13.6px 12.1px -2px rgba(0, 0, 0, 0.165),
      0 24.3px 21.7px -2px rgba(0, 0, 0, 0.197),
      0 45.5px 40.5px -2px rgba(0, 0, 0, 0.237),
      0 109px 97px -2px rgba(0, 0, 0, 0.33);
  }
`

export default shadows
