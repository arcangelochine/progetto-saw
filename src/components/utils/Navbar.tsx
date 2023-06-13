import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../core";
import { Row } from "./Containers";
import { Link, Paragraph } from "./Typography";

const NavbarContainer = styled(Row)`
  position: fixed;
  top: 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
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
  font-size: 16px;

  color: var(--text);

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const NavbarLink = styled(Link)`
  display: inline-block;
  padding: 10px 15px;
  font-size: 16px;

  color: var(--text);
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

const Navbar = () => {
  const user = useContext(AuthContext);

  return (
    <NavbarContainer>
      <NavbarLeft>
        {user ? (
          <div>
            <NavbarLink href={"/edit"}>icona</NavbarLink>
            <NavbarElement>{"username"}</NavbarElement>
          </div>
        ) : (
          <div>
            <NavbarLink href="/">logo</NavbarLink>
            <NavbarLink href="/" className="hideable">
              iSort
            </NavbarLink>
          </div>
        )}
      </NavbarLeft>
      <NavbarRight>
        {user ? (
          <NavbarLink href="/logout">Esci</NavbarLink>
        ) : (
          <div>
            <NavbarLink href="/register">Registrati</NavbarLink>
            <NavbarLink href="/login">Accedi</NavbarLink>
          </div>
        )}
      </NavbarRight>
    </NavbarContainer>
  );
};

export default Navbar;
