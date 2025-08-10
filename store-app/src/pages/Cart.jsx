import {
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import requests from "../api/apiClient";
import Loading from "../components/Loading";
import { currencyTRY } from "../utils/format";
import { useCartContext } from "../context/CartContext";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export default function CartPage() {
  const { cart, setCart } = useCartContext();
  const [status, setStatus] = useState({ loading: false, id: "" });

  const subTotal = cart?.cartItems.reduce(
    (toplam, item) => toplam + item.product.price * item.product.quantity,
    0
  );
  const tax = subTotal * 0.2;
  const total = subTotal + tax;

  if (!cart || cart.cartItems.length === 0)
    return <Typography component="h4">Sepetinizde ürün yok.</Typography>;

  function handleAddItem(productId, id) {
    setStatus({ loading: true, id: id });
    requests.cart
      .addItem(productId)
      .then((cart) => setCart(cart))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, id: "" }));
  }

  function handleDeleteItem(productId, id, quantity = 1) {
    setStatus({ loading: true, id: id });
    requests.cart
      .deleteItem(productId, quantity)
      .then((cart) => setCart(cart))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, id: "" }));
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 100 }}></TableCell>
            <TableCell>Ürün</TableCell>
            <TableCell sx={{ width: 120 }}>Fiyat</TableCell>
            <TableCell sx={{ width: 170 }}>Adet</TableCell>
            <TableCell sx={{ width: 120 }}>Toplam</TableCell>
            <TableCell sx={{ width: 50 }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.cartItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <img
                  src={`http://localhost:5000/images/${item.product.image}`}
                  alt=""
                  style={{ width: "100%" }}
                />
              </TableCell>
              <TableCell>{item.product.title}</TableCell>
              <TableCell>{currencyTRY.format(item.product.price)}</TableCell>
              <TableCell>
                <Button
                  color="error"
                  onClick={() =>
                    handleDeleteItem(
                      item.product.productId,
                      "remove" + item.product.productId
                    )
                  }
                >
                  {status.loading &&
                  status.id === "remove" + item.product.productId ? (
                    <CircularProgress size="20px" />
                  ) : (
                    <RemoveCircleOutlineIcon />
                  )}
                </Button>
                {item.product.quantity}

                <Button
                  color="success"
                  onClick={() =>
                    handleAddItem(
                      item.product.productId,
                      "add" + item.product.productId
                    )
                  }
                >
                  {status.loading &&
                  status.id === "add" + item.product.productId ? (
                    <CircularProgress size="20px" />
                  ) : (
                    <AddCircleOutlineIcon />
                  )}
                </Button>
              </TableCell>
              <TableCell>
                {currencyTRY.format(item.product.price * item.product.quantity)}
              </TableCell>
              <TableCell>
                <IconButton color="error">
                  {status.loading &&
                  status.id === "remove_all" + item.product.productId ? (
                    <CircularProgress size="20px" />
                  ) : (
                    <Delete
                      onClick={() =>
                        handleDeleteItem(
                          item.product.productId,
                          "remove_all" + item.product.productId,
                          item.product.quantity
                        )
                      }
                    />
                  )}
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell align="right" colSpan={5}>
              Ara Toplam
            </TableCell>
            <TableCell>{currencyTRY.format(subTotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" colSpan={5}>
              Vergi
            </TableCell>
            <TableCell>{currencyTRY.format(tax)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" colSpan={5}>
              Toplam Tutar
            </TableCell>
            <TableCell>{currencyTRY.format(total)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
