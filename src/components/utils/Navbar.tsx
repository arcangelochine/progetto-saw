import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../core";
import { IconContainer, Row } from "./Containers";
import { Link, Paragraph } from "./Typography";

import { faUser } from "@fortawesome/free-solid-svg-icons";

const NavbarContainer = styled(Row)`
  position: fixed;
  top: 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  background-color: var(--bg);
`;

const NavbarLeft = styled.div`
  justify-self: flex-start;
`;

const NavbarRight = styled.div`
  justify-self: flex-end;
`;

const NavbarElement = styled(Paragraph)`
  display: inline-block;
  padding: 10px 15px;

  color: var(--text);

  @media only screen and (max-width: 768px) {
    display: none;
    padding: 10px 10px;
  }
`;

const NavbarLink = styled(Link)`
  display: inline-block;
  padding: 10px 15px;

  cursor: pointer;

  transition: background-color 0.3s;

  &:hover {
    background-color: var(--secondary);
  }

  &.hideable {
    @media only screen and (max-width: 768px) {
      display: none;
    }
  }
`;

const NavbarIcon = styled(NavbarLink)`
  text-align: center;
  vertical-align: auto;
`;

const Navbar = () => {
  const user = useContext(AuthContext);

  return (
    <NavbarContainer>
      <NavbarLeft>
        {user ? (
          <>
            <NavbarIcon href={"/edit"}>
              <IconContainer icon={faUser} />
            </NavbarIcon>
            <NavbarElement>{user.displayName || "Benvenuto!"}</NavbarElement>
          </>
        ) : (
          <>
            <NavbarIcon href="/">logo</NavbarIcon>
            <NavbarLink href="/" className="hideable">
              iSort
            </NavbarLink>
          </>
        )}
      </NavbarLeft>
      <NavbarRight>
        {user ? (
          <NavbarLink href="/logout">Esci</NavbarLink>
        ) : (
          <>
            <NavbarLink href="/register">Registrati</NavbarLink>
            <NavbarLink href="/login">Accedi</NavbarLink>
          </>
        )}
      </NavbarRight>
    </NavbarContainer>
  );
};

export default Navbar;
