import React, { useState, useEffect, useCallback, memo } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SportsScoreIcon from "@mui/icons-material/SportsScore";

const Header: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          style={{ display: "flex", justifyContent: "center", gap: "20px" }}
        >
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            sx={{ ml: -5 }}
          >
            <SportsScoreIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Ant Race
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
