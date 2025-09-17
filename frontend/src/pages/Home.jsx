import React, { useState } from "react";
import Nav from "../components/Nav";
import {
  Typography,
  Box,
  Button,
  Modal,
  Container,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ itemName: "", quantity: "" });
  const [items, setItems] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.itemName || !form.quantity) return;

    setItems([...items, { ...form, id: Date.now() }]);
    setForm({ itemName: "", quantity: "" });
    handleClose();
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <>
      <Nav />
      <Container maxWidth={false} sx={{ p: 5 }}>
        <Button
          onClick={handleOpen}
          variant="contained"
          color="primary"
          sx={{ mb: 3 }}
        >
          Add Item
        </Button>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            🛒 Shopping List
          </Typography>
          {items.length === 0 ? (
            <Typography color="text.secondary">No items yet</Typography>
          ) : (
            <List>
              {items.map((item) => (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => handleDelete(item.id)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={`${item.itemName}`}
                    secondary={`Quantity: ${item.quantity}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-form-title"
        >
          <Box sx={style}>
            <Typography
              id="modal-form-title"
              variant="h6"
              component="h2"
              sx={{ mb: 2, fontWeight: "bold" }}
            >
              Add Shopping Item
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Item Name"
                name="itemName"
                value={form.itemName}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Quantity"
                name="quantity"
                type="number"
                value={form.quantity}
                onChange={handleChange}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button
                  onClick={handleClose}
                  sx={{ mr: 1 }}
                  variant="outlined"
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Add
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Container>
    </>
  );
}
