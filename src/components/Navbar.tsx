import React from "react";

import {
  Container,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
} from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className="nav-container">
      <Navbar color="light" light expand="md">
        <Container style={{ display: "flex", justifyContent: "space-between" }}>
          <NavbarBrand>
            {!isAuthenticated ? (
              "Home"
            ) : (
              <span className="user-info">
                <img
                  src={user.picture}
                  alt="Profile"
                  className="nav-user-profile d-inline-block rounded-circle mr-3"
                  width="50"
                />
                <h6 className="d-inline-block">{user.name}</h6>
              </span>
            )}
          </NavbarBrand>
          <Nav style={{ display: "flex", alignItems: "center" }}>
            {!isAuthenticated && (
              <NavItem>
                <Button
                  id="qsLoginBtn"
                  color="primary"
                  className="btn-margin"
                  onClick={() => loginWithRedirect()}
                >
                  Log in
                </Button>
              </NavItem>
            )}
            {isAuthenticated && (
              <NavItem>
                <Button
                  id="qsLoginBtn"
                  color="primary"
                  className="btn-margin"
                  onClick={() => logout()}
                >
                  Log out
                </Button>
              </NavItem>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
