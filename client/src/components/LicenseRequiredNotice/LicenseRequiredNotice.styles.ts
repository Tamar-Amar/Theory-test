import { Link } from "react-router-dom";
import styled from "styled-components";

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  text-align: center;
  padding: 0.25rem 0;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const Text = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.55;
  font-size: 0.95rem;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.25rem;
`;

export const ProfileLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.1rem;
  border-radius: ${({ theme }) => theme.radius.control};
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  font-size: 0.95rem;

  &:hover {
    filter: brightness(1.05);
  }
`;
