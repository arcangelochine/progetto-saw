import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../core";
import { IconContainer, Row } from "./Containers";
import { Bold, Link } from "./Typography";

import {
  faHouse,
  faDatabase,
  faArrowUp,
  faArrowDown,
  faChartLine,
  faQuestionCircle,
  faUser,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

const NavbarContainer = styled(Row)`
  position: fixed;
  bottom: 0;
  width: 100%;

  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;

  background-color: var(--text);
  color: var(--bg);
`;

const NavbarItem = styled(Link)`
  width: 100%;
  display: inline-block;
  text-align: center;
  vertical-align: auto;
  padding: 10px;

  background-color: var(--text);
  color: var(--bg);

  &.active {
    background-color: var(--bg);
    color: var(--text);
  }
`;

const InventoryScrollButton = styled.button`
  width: 100%;
  display: inline-block;
  text-align: center;
  vertical-align: auto;
  padding: 10px;
  cursor: pointer;

  border: 3px solid var(--bg);

  background-color: var(--bg);
  color: var(--text);
`;

const ScrollButton = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolling(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (position: number) => {
    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
  };

  const handleButtonClick = () => {
    if (isScrolling) {
      scrollTo(0); // Scroll to top
    } else {
      scrollTo(document.documentElement.scrollHeight); // Scroll to bottom
    }
  };

  return (
    <>
      {isScrolling ? (
        <InventoryScrollButton onClick={handleButtonClick}>
          <IconContainer icon={faArrowUp} />
        </InventoryScrollButton>
      ) : (
        <InventoryScrollButton onClick={handleButtonClick}>
          <IconContainer icon={faArrowDown} />
        </InventoryScrollButton>
      )}
    </>
  );
};

type pageType =
  | "HOME"
  | "INVENTORY"
  | "INVENTORY_TABLE"
  | "ANALYTICS"
  | "PRO"
  | "EDIT"
  | "AUTH";

interface NavbarProps {
  page: pageType;
}

const Navbar = ({ page }: NavbarProps) => {
  const user = useContext(AuthContext);

  if (user)
    return (
      <NavbarContainer>
        <NavbarItem href="/home" className={`${page === "HOME" && "active"}`}>
          <IconContainer icon={faHouse} />
        </NavbarItem>

        {page === "INVENTORY_TABLE" ? (
          <ScrollButton />
        ) : (
          <NavbarItem
            href="/inventory"
            className={`${page === "INVENTORY" && "active"}`}
          >
            <IconContainer icon={faDatabase} />
          </NavbarItem>
        )}

        <NavbarItem
          href="/analytics"
          className={`${page === "ANALYTICS" && "active"}`}
        >
          <IconContainer icon={faChartLine} />
        </NavbarItem>
        <NavbarItem href="/pro" className={`${page === "PRO" && "active"}`}>
          <IconContainer icon={faQuestionCircle} />
        </NavbarItem>
        <NavbarItem href="/edit" className={`${page === "EDIT" && "active"}`}>
          <IconContainer icon={faUser} />
        </NavbarItem>
      </NavbarContainer>
    );

  return (
    <NavbarContainer>
      <NavbarItem href="/"></NavbarItem>
      <NavbarItem href="/" style={{ width: "200%" }}>
        <Bold>iSort</Bold>
      </NavbarItem>
      <NavbarItem href="/login" className={`${page === "AUTH" && "active"}`}>
        <IconContainer icon={faRightToBracket} />
      </NavbarItem>
    </NavbarContainer>
  );
};

export default Navbar;
