import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../core";
import { Center, IconContainer, Row } from "./Containers";
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

const NavbarLink = styled(NavbarElement)`
  display: inline-block;

  transition: background-color 0.3s;

  &:hover {
    background-color: var(--secondary);
  }

  &.hideable {
    @media only screen and (max-width: 768px) {
      display: none;
    }
  }

  & > * {
    color: var(--text);
  }
`;

const Navbar = () => {
  const user = useContext(AuthContext);

  return (
    <NavbarContainer>
      <NavbarLeft>
        {user ? (
          <div>
            <NavbarLink>
              <Link href={"/edit"}>
                <Center>
                  <IconContainer icon={faUser} />
                </Center>
              </Link>
            </NavbarLink>
            <NavbarElement>{user.displayName || "Benvenuto!"}</NavbarElement>
          </div>
        ) : (
          <div>
            <NavbarLink>
              <Link href="/">logo</Link>
            </NavbarLink>
            <NavbarLink className="hideable">
              <Link href="/">iSort</Link>
            </NavbarLink>
          </div>
        )}
      </NavbarLeft>
      <NavbarRight>
        {user ? (
          <NavbarLink>
            <Link href="/logout">Esci</Link>
          </NavbarLink>
        ) : (
          <div>
            <NavbarLink>
              <Link href="/register">Registrati</Link>
            </NavbarLink>
            <NavbarLink>
              <Link href="/login">Accedi</Link>
            </NavbarLink>
          </div>
        )}
      </NavbarRight>
    </NavbarContainer>
  );
};

export default Navbar;
