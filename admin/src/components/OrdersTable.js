import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  Modal,
  Chip,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import {
  LocalPizza as PizzaIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Visibility as EyeIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { CSVLink } from "react-csv";
import axios from "axios";
import { getOrders, updateOrderStatus } from "../api/orders";

// Modal for displaying order details
const OrderDetailsModal = ({ open, onClose, data }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "white",
          p: 3,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Order Details
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography>
          <strong>Pizza Name:</strong> {data.pizza_name}
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <strong>Toppings:</strong>
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
          {data.toppings && data.toppings.length > 0 ? (
            data.toppings.map((topping, index) => (
              <Chip
                key={index}
                label={topping.name}
                sx={{
                  backgroundColor: topping.color || "gray",
                  color: "white",
                }}
              />
            ))
          ) : (
            <Typography>No Toppings</Typography>
          )}
        </Box>
        <Typography sx={{ mt: 2 }}>
          <strong>Quantity:</strong> {data.quantity}
        </Typography>
      </Box>
    </Modal>
  );
};

const OrdersTable = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetching data from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setTableData(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

 const handleStatusChange = async (value, row) => {
   if (!row || !tableData || !row.id) {
     console.error("Invalid row data or table data not found.");
     return;
   }

   const updatedData = tableData.map((item) =>
     item.id === row.id ? { ...item, status: value } : item
   );
   setTableData(updatedData);

   // Send updated status to the backend
   try {
     await updateOrderStatus(row.id, value);
   } catch (error) {
     console.error("Error updating status:", error);
   }
 };


  const getStatusColor = (status) => {
    switch (status) {
      case "Preparing":
        return "orange";
      case "Ready":
        return "green";
      case "Delivered":
        return "#4caf50";
      default:
        return "gray";
    }
  };

  const openModal = (row) => {
    setSelectedOrder(row.original);
    setModalOpen(true);
  };

  const columns = [
    {
      accessorKey: "pizza_name",
      header: "Pizza Name",
      size: 100,
      Cell: ({ row }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PizzaIcon sx={{ color: "#D2691E" }} />
          <Typography>{row.original.pizza_name}</Typography>
        </Box>
      ),
    },
    {
      accessorKey: "toppings",
      header: "Toppings",
      size: 100,
      Cell: ({ row }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
          onClick={() => openModal(row)}
        >
          <EyeIcon sx={{ color: "orange" }} />
          <Typography sx={{ color: "orange" }}>
            {row.original.toppings?.map((topping) => topping.name).join(", ") ||
              "No Toppings"}
          </Typography>
        </Box>
      ),
    },
    { accessorKey: "quantity", header: "Quantity", size: 70 },
    { accessorKey: "customer_phone", header: "Customer No", size: 130 },
    { accessorKey: "order_date", header: "Created at", size: 150 },
    {
      accessorKey: "status",
      header: "Status",
      size: 100,
      Cell: ({ row }) => (
        <Select
          value={row.original.status}
          onChange={(e) => handleStatusChange(e.target.value, row.original)}
          size="small"
          sx={{
            backgroundColor: getStatusColor(row.original.status),
            color: "white",
            borderRadius: 1,
            "& .MuiSelect-icon": {
              color: "white",
            },
          }}
        >
          <MenuItem value="Preparing" sx={{ color: "orange" }}>
            Preparing
          </MenuItem>
          <MenuItem value="Ready" sx={{ color: "green" }}>
            Ready
          </MenuItem>
          <MenuItem value="Delivered" sx={{ color: "#4caf50" }}>
            Delivered
          </MenuItem>
        </Select>
      ),
    },
  ];

  const csvHeaders = columns.map((col) => ({
    label: col.header,
    key: col.accessorKey,
  }));
  const csvData = tableData?.map((row) => ({
    pizza_name: row.pizza_name,
    toppings:
      row.toppings?.map((topping) => topping.name).join(", ") || "No Toppings",
    quantity: row.quantity,
    customerNo: row.customer_phone,
    createdAt: row.order_date,
    status: row.status,
  }));

  return (
    <Box sx={{ padding: 4 }}>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        enableGlobalFilter
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
            <Typography variant="h6" sx={{ mb: 2 }}>
              Orders
            </Typography>
            <Box>
              <IconButton onClick={() => window.location.reload()} size="small">
                <RefreshIcon />
              </IconButton>
              <CSVLink
                data={csvData}
                headers={csvHeaders}
                filename="orders.csv"
              >
                <IconButton size="small">
                  <DownloadIcon />
                </IconButton>
              </CSVLink>
            </Box>
          </Box>
        )}
      />
      {selectedOrder && (
        <OrderDetailsModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          data={selectedOrder}
        />
      )}
    </Box>
  );
};

export default OrdersTable;
