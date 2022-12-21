import { css } from "styled-components";

export const sm = (props: any) => {
  return css`
    @media only screen and (max-width: 430px) {
      ${props}
    }
  `;
};

export const md = (props: any) => {
  return css`
    @media only screen and (max-width: 550px) {
      ${props}
    }
  `;
};
export const md2 = (props: any) => {
  return css`
    @media only screen and (max-width: 640px) {
      ${props}
    }
  `;
};
export const m1000 = (props: any) => {
  return css`
    @media only screen and (max-width: 1000px) {
      ${props}
    }
  `;
};
