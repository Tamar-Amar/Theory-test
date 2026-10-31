import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem 1.25rem;
  border-radius: ${({ theme }) => theme.radius.answer};
  background: ${({ theme }) => theme.colors.orangeTint};
  text-align: right;
`;

export const Head = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.orangeInk};
`;

export const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.orange};
`;

export const Text = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.ink};
`;
