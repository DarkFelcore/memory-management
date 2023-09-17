import { ReactElement, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, LightMode, DarkMode } from "@mui/icons-material";
import { ToggleButton } from "@mui/material";
import { ThemeContext } from "../../context/theme.context";
import "./navbar.scss";

type LinkType = {
  href: string;
  label: string;
};

const links: LinkType[] = [
  { href: "/", label: "Home" },
  { href: "/companies", label: "Companies" },
  { href: "/jobs", label: "Jobs" },
  { href: "/candidates", label: "Candidates" },
];

export const Navbar = (): ReactElement => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpenMenu = () => {
    setOpen((prevState) => !open);
  };

  const menuStyles = open ? "menu open" : "menu";

  return (
    <div className="navbar">
      <div className="brand">
        <span>Resume Management</span>
      </div>
      <div className={menuStyles}>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link onClick={toggleOpenMenu} to={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="hamburger">
        <Menu onClick={toggleOpenMenu} />
      </div>
      <div className="toggle">
        <ToggleButton
          value={"check"}
          selected={darkMode}
          onChange={toggleDarkMode}
        >
          {darkMode ? <LightMode /> : <DarkMode />}
        </ToggleButton>
      </div>
    </div>
  );
};
