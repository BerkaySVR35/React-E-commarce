import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

export default function Loading({ message = "Yükleniyor..." }) {
  return (
    <Backdrop open={true} invisible={false}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="primary" />
        <Typography
          variant="h4"
          sx={{ justifyContent: "center", position: "fixed", top: "60%" }}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
}
