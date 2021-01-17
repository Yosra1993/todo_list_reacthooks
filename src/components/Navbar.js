import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { NavLink as NavLinkRoute } from "react-router-dom";

const NavbarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand>Todo List</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                to={process.env.PUBLIC_URL + "/"}
                exact
                activeClassName="active"
                tag={NavLinkRoute}
              >
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to={process.env.PUBLIC_URL + "/list-tasks"}
                exact
                activeClassName="active"
                tag={NavLinkRoute}
              >
                Tâches
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href={process.env.PUBLIC_URL + "/"}
                onClick={() => {
                  localStorage.removeItem("login");
                }}
              >
                Déconnexion
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
