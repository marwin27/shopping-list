import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Registration - My Shopping List";
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3005/register", form); 
      console.log(res.data);
      navigate("/", {
        state: { message: "Registration successful! Please log in." },
      });
    } catch (error) {
      console.error(error);
      alert("Error registering user");
    }
  };
  return (
    <Box
      maxWidth="xs"
      sx={{
        height: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <ShoppingCartIcon sx={{ fontSize: 50, color: "success.main" }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "success.main",
              mt: 1,
            }}
          >
            My Shopping List
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Create an account
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            type="name"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.2,
              background: "linear-gradient(135deg, #10B981, #059669)",
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "none",
              "&:hover": {
                background: "linear-gradient(135deg, #059669, #047857)",
              },
            }}
          >
            Register
          </Button>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, color: "text.secondary" }}
          >
            Already have an account?{" "}
            <Button
              component={Link}
              to="/"
              variant="text"
              sx={{ color: "success.main", fontWeight: "bold" }}
            >
              Login
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
