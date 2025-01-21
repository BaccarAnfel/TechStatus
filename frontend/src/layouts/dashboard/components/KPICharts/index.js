import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const KPICards = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalEquipments, setTotalEquipments] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);

  // Fetch total orders
  useEffect(() => {
    fetch("http://localhost:5000/api/total-orders")
      .then((response) => response.json())
      .then((data) => setTotalOrders(data.total))
      .catch((error) => console.error("Error fetching total orders:", error));
  }, []);

  // Fetch total equipment
  useEffect(() => {
    fetch("http://localhost:5000/api/total-equipments")
      .then((response) => response.json())
      .then((data) => setTotalEquipments(data.total))
      .catch((error) => console.error("Error fetching total equipment:", error));
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Commandes</Typography>
            <Typography variant="h4">{totalOrders}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Équipements</Typography>
            <Typography variant="h4">{totalEquipments}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default KPICards;