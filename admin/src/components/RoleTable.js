import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Switch,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import {
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import { CSVLink } from "react-csv";
import {
  getRoles,
  createRole,
  updateRoleStatus,
  getRoleById,
} from "../api/roles";

const RoleTable = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState({
    updateOrderStatus: false,
    seeOrders: false,
    addUsers: false,
    seeCustomers: false,
    createRoles: false,
  });

  const csvHeaders = [
    { label: "Role Name", key: "role_name" },
    { label: "Created At", key: "createdAt" },
    { label: "Status", key: "status" },
  ];

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await getRoles();
        setRoles(rolesData);
        console.log(rolesData);
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleDelete = (roleName) => {
    setRoles(roles.filter((role) => role.role_name !== roleName));
  };

  const handleStatusChange = async (index) => {
    const updatedRoles = [...roles];
    const role = updatedRoles[index];

    // Toggle the status between active and inactive
    const newStatus = role.status === "active" ? "inactive" : "active";
    role.status = newStatus;

    try {
      // Update the status in the backend
      await updateRoleStatus(role.id, newStatus);
      setRoles(updatedRoles); // Update the state with the new status
    } catch (error) {
      console.error("Error updating role status:", error);
    }
  };

  const handleOpen = async (index = null) => {
    setOpen(true);

    if (index !== null) {
      const roleToEdit = roles[index];
      setEditIndex(index);

      try {
        const fetchedRole = await getRoleById(roleToEdit.id);
        setRoleName(fetchedRole.role_name);
        setPermissions({
          updateOrderStatus:
            fetchedRole.permissions.includes("updateOrderStatus"),
          seeOrders: fetchedRole.permissions.includes("seeOrders"),
          addUsers: fetchedRole.permissions.includes("addUsers"),
          seeCustomers: fetchedRole.permissions.includes("seeCustomers"),
          createRoles: fetchedRole.permissions.includes("createRoles"),
        });
      } catch (error) {
        console.error("Error fetching role details:", error);
      }
    } else {
      setEditIndex(null);
      setRoleName("");
      setPermissions({
        updateOrderStatus: false,
        seeOrders: false,
        addUsers: false,
        seeCustomers: false,
        createRoles: false,
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePermissionChange = (e) => {
    setPermissions({
      ...permissions,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = async () => {
    const permissionsArray = Object.keys(permissions).filter(
      (key) => permissions[key]
    );

    const newRoleData = {
      roleName,
      status: true,
      permissions: permissionsArray,
    };

    if (editIndex !== null) {
      const updatedRole = await updateRoleStatus(
        roles[editIndex].id,
        newRoleData.status
      );
      const updatedRoles = [...roles];
      updatedRoles[editIndex] = {
        ...updatedRole,
        roleName,
        permissions: permissionsArray,
      };
      setRoles(updatedRoles);
    } else {
      const newRole = await createRole({
        roleName: roleName,
        status: "active",
        permissions: permissionsArray,
      });
      setRoles([...roles, newRole]);
    }

    setOpen(false);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      {/* Modal for adding/editing a role */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editIndex !== null ? "Edit Role" : "Add Role"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
          <Typography sx={{ mt: 2 }}>Permissions</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={permissions.updateOrderStatus}
                  onChange={handlePermissionChange}
                  name="updateOrderStatus"
                />
              }
              label="Update Order Status"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={permissions.seeOrders}
                  onChange={handlePermissionChange}
                  name="seeOrders"
                />
              }
              label="See Orders"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={permissions.addUsers}
                  onChange={handlePermissionChange}
                  name="addUsers"
                />
              }
              label="Add Users"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={permissions.seeCustomers}
                  onChange={handlePermissionChange}
                  name="seeCustomers"
                />
              }
              label="See Customers"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={permissions.createRoles}
                  onChange={handlePermissionChange}
                  name="createRoles"
                />
              }
              label="Create Roles"
            />
          </FormGroup>
          <Button
            variant="contained"
            color="warning"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            {editIndex !== null ? "Update" : "Add"}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Role Table */}
      <MaterialReactTable
        columns={[
          {
            accessorKey: "role_name",
            header: "Role Name",
            Cell: ({ cell }) => <Typography>{cell.getValue()}</Typography>,
          },
          {
            accessorKey: "create_at",
            header: "Created at",
            Cell: ({ cell }) => <Typography>{cell.getValue()}</Typography>,
          },
          {
            header: "Actions",
            Cell: ({ row }) => (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor:
                      row.original.status === "active"
                        ? "rgba(0, 255, 0, 0.1)"
                        : "rgba(255, 0, 0, 0.1)",
                    padding: "0px 8px",
                    borderRadius: "50px",
                    color: row.original.status === "active" ? "green" : "red",
                  }}
                >
                  <Typography>
                    {row.original.status === "active" ? "Active" : "Inactive"}
                  </Typography>
                  <Switch
                    checked={row.original.status === "active"}
                    onChange={() => handleStatusChange(row.index)}
                    color={
                      row.original.status === "active" ? "success" : "error"
                    }
                  />
                </Box>
                <IconButton
                  size="small"
                  color="default"
                  onClick={() => handleOpen(row.index)}
                >
                  <ViewIcon />
                </IconButton>
                <IconButton
                  size="small"
                  color="default"
                  onClick={() => handleDelete(row.original.roleName)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ),
          },
        ]}
        data={roles}
        enableTopToolbar={true}
        renderTopToolbarCustomActions={() => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Button
              variant="contained"
              sx={{ backgroundColor: "#ff8100" }}
              size="small"
              onClick={() => handleOpen()}
            >
              Add Role
            </Button>
            <Box>
              <IconButton size="small">
                <RefreshIcon />
              </IconButton>
              <CSVLink data={roles} headers={csvHeaders} filename="roles.csv">
                <IconButton size="small">
                  <DownloadIcon />
                </IconButton>
              </CSVLink>
            </Box>
          </Box>
        )}
      />
    </Box>
  );
};

export default RoleTable;
