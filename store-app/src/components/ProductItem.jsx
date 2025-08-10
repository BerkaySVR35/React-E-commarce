import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ReportIcon from "@mui/icons-material/Report";
import { currencyTRY } from "../utils/format";

export default function ProductItem({
  product,
  handleAddItem,
  cartItem,
  isAdding,
}) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ lg: 4, md: 5, sm: 6, xs: 12 }}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <img
            src={`http://localhost:5000/images/${product.image}`}
            style={{ width: "100%" }}
          />
        </Paper>
      </Grid>
      <Grid size={{ lg: 8, md: 7, sm: 6, xs: 12 }}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography component="h1" variant="h4" color="secondary.dark">
            {product.title}
          </Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="h4" color="secondary" sx={{ mt: 3 }}>
            {currencyTRY.format(product.price)}
          </Typography>
          <Stack
            direction="row"
            display="flex"
            alignItems="center"
            sx={{ mt: 3 }}
            gap={2}
          >
            <Button
              onClick={() => handleAddItem(product.id)}
              variant="contained"
              color="secondary"
            >
              Sepete Ekle
            </Button>

            <ReportIcon color="secondary" />
            {cartItem?.product.quantity > 0 && (
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center" }}
              >
                Sepetinizde {cartItem.product.quantity} adet bulunmaktadır.
              </Typography>
            )}
            {isAdding && <CircularProgress size="20px" />}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
