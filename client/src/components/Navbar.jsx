import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  //handle logout
  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/auth/logout");
      localStorage.removeItem("authToken");
      toast.success("Logged out successfully ");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#0d47a1 !important',
    marginRight: '1rem',
    fontFamily: 'Arial, sans-serif',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
  };

  const activeLinkStyle = {
    color: '#1565c0',
  };

  return (
    <Box
      width={"100%"}
      bgcolor="#ffffff" /* Updated background color to white */
      p="1rem 6%"
      textAlign="center"
      boxShadow="0px 2px 2px rgba(0, 0, 0, 0.1)"
      mb={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography variant="h1" fontWeight="medium">
        <Link to={'/'} style={{ textDecoration: 'none', color: '#0d47a1' }}>A Wise Man</Link>
      </Typography>
      <Box>
        <NavLink to="/" style={{ ...linkStyle, ...activeLinkStyle }}>
          Home
        </NavLink>
        {loggedIn ? (
          <>
            <Link to="/login" onClick={handleLogout} style={linkStyle}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <NavLink to="/register" style={linkStyle} activeStyle={activeLinkStyle}>
              Register
            </NavLink>
            <NavLink to="/login" style={linkStyle} activeStyle={activeLinkStyle}>
              Login
            </NavLink>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
