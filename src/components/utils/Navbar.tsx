import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../core";

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 100;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const NavbarLeft = styled.div`
  justify-self: flex-start;
  height: auto;
`;

const NavbarRight = styled.div`
  justify-self: flex-end;
  height: auto;
`;

const NavbarElement = styled.a`
  display: inline-block;
  padding: 12px;
  text-align: center;
  text-decoration: none;

  font-size: 16px;
  color: #103003;

  transition: background-color 0.3s;

  &:hover {
    background-color: #dde4f3;
  }
`;

const Navbar = () => {
  const user = useContext(AuthContext);

  return (
    <NavbarContainer>
      <NavbarLeft>
        {user ? (
          <div>
            <NavbarElement href={`/edit`}>{user.email}</NavbarElement>
          </div>
        ) : (
          <div>
            <NavbarElement href="/">logo</NavbarElement>
            <NavbarElement href="/">iSort</NavbarElement>
          </div>
        )}
      </NavbarLeft>
      <NavbarRight>
        {user ? (
          <NavbarElement href="/logout">Esci</NavbarElement>
        ) : (
          <div>
            <NavbarElement href="/register">Registrati</NavbarElement>
            <NavbarElement href="/login">Accedi</NavbarElement>
          </div>
        )}
      </NavbarRight>
    </NavbarContainer>
  );
};

export default Navbar;
