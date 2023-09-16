import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 25px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
  margin-bottom: 16px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);

  > nav {
    display: flex;
  }
`;

export const Link = styled(NavLink)`
  padding: 8px 24px;
  font-size: 20px;
  text-decoration: none;
  color: black;
  font-weight: 700;

  &.active {
    color: red;
  }
`;
