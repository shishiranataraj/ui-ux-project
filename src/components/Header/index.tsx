import React from 'react';

import logoImg from '../../assets/logo.png';

import { Container, Content, Logo, Date } from './styles';

interface HeaderProps {
  small?: boolean;
}

const Header: React.FC<HeaderProps> = ({ small }: HeaderProps) => (
  <Container small={small}>
    <Content>
      <Logo source={logoImg} />
    </Content>
  </Container>
);

export default Header;
