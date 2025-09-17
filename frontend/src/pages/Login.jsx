import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login - My Shopping List";
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3005/login", form);
      console.log(res.data);
      navigate("/home", {
        state: { message: "Registration successful! Please log in." },
      });
    } catch (error) {
      console.error(error);
      alert("Error login user");
    }
  };

  return (
    <Box
      sx={{
        height: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
          backgroundColor: "#fff",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <ShoppingCartIcon sx={{ fontSize: 50, color: "#009F6B" }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#50C878",
              mt: 1,
            }}
          >
            My Shopping List
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Welcome back! Please login
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
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
            Login
          </Button>
          {/* <Typography align="center" sx={{ mt: 2 }}>
            <Button
              component={Link}
              to="/forgot-password"
              variant="text"
              sx={{ color: "primary.main", fontWeight: "bold" }}
            >
              Forgot Password?
            </Button>
          </Typography> */}
        </Box>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, color: "text.secondary" }}
        >
          Don’t have an account?{" "}
          <Button
            component={Link}
            to="/register"
            variant="text"
            sx={{ color: "success.main", fontWeight: "bold" }}
          >
            Register
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
}
