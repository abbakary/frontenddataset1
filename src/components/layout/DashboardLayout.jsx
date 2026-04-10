import React from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import RoleBasedNav from "../navigation/RoleBasedNav";

export default function DashboardLayout({ children }) {
  const location = useLocation();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f6f7fb" }}>
      {/* Sidebar Navigation */}
      <RoleBasedNav currentPath={location.pathname} />

      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          marginLeft: "280px",
          backgroundColor: "#f6f7fb",
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
