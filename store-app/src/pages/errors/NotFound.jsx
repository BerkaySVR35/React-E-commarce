import { Alert, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4">Not Found Error</Typography>
      <Alert severity="error">Opps. Aradığınız sayfa bulunamadı.</Alert>
      <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
        Anasayfa
      </Button>
    </Paper>
  );
}
