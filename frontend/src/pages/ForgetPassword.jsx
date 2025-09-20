import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3005/forget-password", {
        email,
      });
      setMessage(res.data.message || "Password reset link sent to your email.");
    } catch (err) {
      console.error(err);
      setError("Error sending reset link. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        height: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: " linear-gradient(135deg, #006241 0%, #008080 100%)",
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
          <ShoppingCartIcon sx={{ fontSize: 50, color: "#006241" }} />
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#006241", mt: 1,  mb:2}}
          >
            My Shopping List
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Enter your email to reset your password
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {message && (
            <Typography color="success.main" sx={{ mt: 1 }}>
              {message}
            </Typography>
          )}

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.2,
               background: "linear-gradient(135deg, #006241)",
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "none",
              "&:hover": {
                background: "linear-gradient(135deg, #008080, #006241)",
              },
            }}
          >
            Send Reset Link
          </Button>
        </Box>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, color: "text.secondary" }}
        >
          Remember your password?{" "}
          <Button
            component={Link}
            to="/login"
            variant="text"
            sx={{ color: "#006241", fontWeight: "bold", ":hover": { color: "#008080" } }}
          >
            Login
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
}
