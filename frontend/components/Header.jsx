import { Button, Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        padding: "16px",
        backgroundColor: "grey.100",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", 
        position: "fixed", 
        top: 0,
        left: 0,
        zIndex: 1000, 
      }}
    >
      <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
        Contact0
      </Typography>

      <Button variant="outlined" color="primary" sx={{ fontWeight: "bold" }} onClick={() => navigate('/create-contact')}>
        Create Contact
      </Button>
    </Box>
  );
};

export default Header;
