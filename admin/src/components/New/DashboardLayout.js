import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./Sidebar";
import AppBarHeader from "./AppBarHeader";
import MainContent from "./MainContent";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarHeader
        sidebarOpen={sidebarOpen}
        handleSidebarToggle={handleSidebarToggle}
      />
      <Sidebar
        sidebarOpen={sidebarOpen}
        handleSidebarToggle={handleSidebarToggle}
      />
      <MainContent sidebarOpen={sidebarOpen} />
    </Box>
  );
};

export default DashboardLayout;
