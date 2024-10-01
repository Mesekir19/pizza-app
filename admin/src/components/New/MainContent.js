import React from "react";
import { Box, Typography, Toolbar } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import OrdersTable from "../OrdersTable";
import RoleTable from "../RoleTable";
import AddMenuForm from "../AddMenu";
import UserTable from "../User";
const MainContent = ({ sidebarOpen }) => {
  const drawerWidth = 240;
  const collapsedDrawerWidth = 60;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        pt: 10,
        width: sidebarOpen
          ? `calc(100% - ${drawerWidth}px)`
          : `calc(100% - ${collapsedDrawerWidth}px)`,
        transition: "margin 0.3s ease",
        backgroundColor: "#f8f8f8",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: 2,
          borderRadius: 2,
          boxShadow: 2,
          height: "87vh",
        }}
      >
        <Routes>
          <Route path="/orders" element={<OrdersTable />} />
          <Route path="/add-menu" element={<AddMenuForm />} />
          <Route path="/role" element={<RoleTable />} />
          <Route path="/user" element={<UserTable />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default MainContent;
