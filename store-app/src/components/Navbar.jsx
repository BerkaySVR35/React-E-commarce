import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import { Link, NavLink } from "react-router";
import Badge from "@mui/material/Badge";

export default function Navbar() {
  const links = [
    { title: "Home", to: "/" },
    { title: "Products", to: "/products" },
    { title: "Error", to: "/errors" },
  ];

  const authLinks = [
    { title: "Login", to: "/login" },
    { title: "Register", to: "/register" },
  ];
  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.dark" }}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <IconButton color="inherit">
            <StoreIcon />
          </IconButton>
          {links.map((link) => (
            <Button
              key={link.to}
              color="inherit"
              component={NavLink}
              to={link.to}
            >
              {link.title}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            component={Link}
            to="/cart"
            size="large"
            edge="start"
          >
            <Badge badgeContent="2" color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {authLinks.map((link) => (
            <Button
              key={link.to}
              color="inherit"
              component={NavLink}
              to={link.to}
            >
              {link.title}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
