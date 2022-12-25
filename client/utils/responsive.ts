import { css } from "styled-components";

export const sm = (props: any) => {
  return css`
    @media only screen and (max-width: 320px) {
      ${props}
    }
  `;
};

export const md = (props: any) => {
  return css`
    @media only screen and (max-width: 500px) {
      ${props}
    }
  `;
};
export const md2 = (props: any) => {
  return css`
    @media only screen and (max-width: 768px) {
      ${props}
    }
  `;
};
export const m1000 = (props: any) => {
  return css`
    @media only screen and (max-width: 1024px) {
      ${props}
    }
  `;
};
