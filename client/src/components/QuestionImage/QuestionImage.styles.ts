import styled from "styled-components";

export const Figure = styled.figure`
  margin: 0 0 1rem;
`;

export const Img = styled.img`
  display: block;
  width: 100%;
  max-height: 280px;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radius.option};
  border: 1px solid ${({ theme }) => theme.colors.surface2};
  background: ${({ theme }) => theme.colors.bg};
`;

export const Caption = styled.figcaption`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 0.35rem;
  text-align: center;
`;
