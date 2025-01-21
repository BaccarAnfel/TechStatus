import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import OrderDetailsModal from "layouts/dashboard/components/commandDetailChart";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null); // Stocke l'ID de la commande sélectionnée
  const [openModal, setOpenModal] = useState(false);

  // Fetch orders from the database
  useEffect(() => {
    fetch("http://localhost:5000/api/commandes")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const handleOpenModal = (command_id) => {
    setSelectedOrderId(command_id); // Définir l'ID de la commande sélectionnée
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrderId(null); // Réinitialiser l'ID de la commande sélectionnée
  };

  // Limiter l'affichage aux 5 premières commandes
  const displayedOrders = orders.slice(0, 5);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Liste des Commandes
        </Typography>
        <Grid container spacing={2}>
          {displayedOrders.map((order) => (
            <Grid item xs={12} key={order.command_id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Commande #{order.command_id}</Typography>
                  <Typography>Date: {order.date}</Typography>
                  <Typography>Statut: {order.statut}</Typography>
                  <Button onClick={() => handleOpenModal(order.command_id)}>Voir Détails</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <OrderDetailsModal open={openModal} onClose={handleCloseModal} command_id={selectedOrderId} />
      </CardContent>
    </Card>
  );
};

export default OrderList;