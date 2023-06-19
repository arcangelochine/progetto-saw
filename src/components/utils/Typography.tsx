import { styled } from "styled-components";

export const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;

  @media only screen and (max-width: 768px) {
    font-size: 32px;
  }
`;

export const Subtitle = styled.h1`
  font-size: 32px;
  font-weight: medium;

  @media only screen and (max-width: 768px) {
    font-size: 24px;
  }
`;

export const Paragraph = styled.p`
  font-size: 16px;
  font-weight: normal;

  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Link = styled.a`
  font-size: inherit;
  font-weight: inherit;
  text-decoration: none;
  color: var(--text);
`;

export const Accent = styled.span`
  font-size: inherit;
  font-weight: inherit;
  color: var(--accent);
`;

export const Gradient = styled.span`
  font-size: inherit;
  font-weight: inherit;
  background: -webkit-linear-gradient(90deg, var(--accent), var(--text));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Bold = styled.span`
  font-size: inherit;
  font-weight: bold;
`;

export const Underline = styled.span`
  font-size: inherit;
  font-weight: inherit;
  text-decoration: underline;
`;

export const Small = styled.span`
  font-size: 14px;
  font-weight: inherit;

  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;
