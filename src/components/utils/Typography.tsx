import { styled } from "styled-components";

export const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;

  @media only screen and (max-width: 768px) {
    font-size: 30px;
  }
`;

export const Paragraph = styled.p`
  font-size: 16px;
  font-weight: normal;

  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Accent = styled.span`
  font-size: inherit;
  font-weight: inherit;
  color: var(--accent);
`;

export const Link = styled.a`
  font-size: inherit;
  font-weight: inherit;
  text-decoration: none;
  color: var(--accent);
`;
