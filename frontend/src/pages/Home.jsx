import React, { useEffect } from "react";

import Nav from "../components/Nav";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    document.title = "Home - My Shopping List";
  }, []);

  return (
    <>
      <Nav />
      <Container
        maxWidth="xs "
        sx={{
          p: 10,
        }}
      >
        <Button
          type="submit"
          variant="contained"
          onClick={handleOpen}
          sx={{
       
            background: "linear-gradient(135deg, #006241)",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              background: "linear-gradient(135deg, #008080, #006241)",
            },
          }}
        >
          Add Shopping List
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </Container>
    </>
  );
}
