import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../core";
import { Row } from "./Containers";
import { Link } from "./Typography";

const NavbarContainer = styled(Row)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const NavbarLeft = styled.div`
  justify-self: flex-start;
`;

const NavbarRight = styled.div`
  justify-self: flex-end;
`;

const NavbarCollapse = styled.div`
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const NavbarElement = styled(NavbarCollapse)`
  display: inline-block;
  padding: 10px 15px;
  font-size: 16px;

  color: var(--text);
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
            <NavbarCollapse>
              <NavbarLink href="/">iSort</NavbarLink>
            </NavbarCollapse>
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
