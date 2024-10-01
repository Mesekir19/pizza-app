import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  IconButton,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import {
  Delete,
  Add,
  CloudDownload,
  Refresh,
  Download as DownloadIcon,
} from "@mui/icons-material";
import { CSVLink } from "react-csv";
import axios from "axios";
import { getRoles } from "../api/roles";

const UserTable = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const restaurantId = localStorage.getItem("restaurantId");
  const [roles, setRoles] = useState([]);
  
useEffect(() => {
  const fetchRoles = async () => {
    try {
      const rolesData = await getRoles();

      // Filter roles to get only active roles
      const activeRoles = rolesData.filter((role) => role.status === "active");
setRoles(activeRoles)
      console.log(activeRoles); // Logs the active roles
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      // Do something after the fetch if needed
    }
  };

  fetchRoles();
}, []);


  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_HOST}/users/userByrestId/${restaurantId}`
        ); // replace with your endpoint
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Submit new user data
  const handleSubmit = async () => {
    if (newUser.password !== newUser.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError(""); // Clear error if passwords match

    // Add sendrestorantid from localStorage and status="active"
    const userWithAdditionalFields = {
      ...newUser,
      restaurantId: restaurantId || "", // Set from localStorage
      status: "active", // Default status
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_HOST}/auth/register`,
        userWithAdditionalFields
      ); // replace with your endpoint
      setUsers((prevUsers) => [...prevUsers, response.data]); // Update state with the new user
      setOpen(false); // Close the modal
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };


  // Handle status change dynamically
  const handleStatusChange = async (index, userId, currentStatus) => {
    try {
    const status = currentStatus? "inactive" : "active";
      await axios.put(
        `${process.env.REACT_APP_SERVER_HOST}/users/status/${userId}`,
        {
          status: status,
        }
      ); // replace with your endpoint
      const updatedUsers = [...users];
      updatedUsers[index].status = !currentStatus;
      setUsers(updatedUsers); // Update state
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const csvHeaders = [
    { label: "Name", key: "name" },
    { label: "Phone", key: "phone" },
    { label: "Email", key: "email" },
  ];

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "phone",
        header: "Phone No",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: row.original.status
                  ? "rgba(0, 255, 0, 0.1)"
                  : "rgba(255, 0, 0, 0.1)",
                padding: "0px 8px",
                borderRadius: "50px",
                color: row.original.status ? "green" : "red",
              }}
            >
              <Typography>
                {row.original.status ? "Active" : "Inactive"}
              </Typography>
              <Switch
                checked={row.original.status}
                onChange={() =>
                  handleStatusChange(
                    row.index,
                    row.original.id,
                    row.original.status
                  )
                }
                color={row.original.status ? "success" : "error"}
                sx={{
                  "& .MuiSwitch-track": {
                    backgroundColor: row.original.status ? "green" : "red",
                    opacity: 0.5,
                  },
                }}
              />
            </Box>
            <IconButton color="error">
              <Delete />
            </IconButton>
          </Box>
        ),
      },
    ],
    [users]
  );

  return (
    <Box sx={{ padding: 4 }}>
      <MaterialReactTable
        columns={columns}
        data={users}
        enableRowActions={false}
        renderTopToolbarCustomActions={() => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              backgroundColor: "white",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              sx={{ backgroundColor: "#ff8100" }}
              size="small"
              onClick={() => setOpen(true)} // Open modal on click
            >
              Add User
            </Button>
            <Box>
              <IconButton size="small">
                <Refresh />
              </IconButton>
              <CSVLink data={users} headers={csvHeaders} filename="users.csv">
                <IconButton size="small">
                  <DownloadIcon />
                </IconButton>
              </CSVLink>
            </Box>
          </Box>
        )}
        muiTableHeadCellProps={{
          sx: {
            backgroundColor: "#f6f6f6",
          },
        }}
      />

      {/* Add User Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="phone"
            label="Phone Number"
            type="text"
            fullWidth
            variant="outlined"
            name="phone"
            value={newUser.phone}
            onChange={handleInputChange}
          />
          <TextField
            select
            label="Select Role"
            fullWidth
            margin="dense"
            variant="outlined"
            name="role"
            value={newUser.role}
            onChange={handleInputChange}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.role_name}>
                {role.role_name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="confirm-password"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
            name="confirmPassword"
            value={newUser.confirmPassword}
            onChange={handleInputChange}
            error={!!passwordError}
            helperText={passwordError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserTable;
