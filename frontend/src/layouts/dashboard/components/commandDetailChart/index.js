import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Box, Typography, CircularProgress } from "@mui/material";

const OrderDetailsModal = ({ open, onClose, command_id }) => {
  const [order, setOrder] = useState(null);
  const [equipements, setEquipements] = useState([]); // État pour stocker les équipements groupés
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch order details and associated equipment from the database when the modal is opened
  useEffect(() => {
    if (open && command_id) {
      setLoading(true);
      setError(null);

      // Fetch order details
      fetch(`http://localhost:5000/api/commandes/${command_id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch order details");
          }
          return response.json();
        })
        .then((data) => {
          setOrder(data); // Set the order details
        })
        .catch((error) => {
          console.error("Error fetching order details:", error);
          setError(error.message);
        });

      // Fetch grouped equipment for the command
      fetch(`http://localhost:5000/api/equipementsCommand/${command_id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch equipment details");
          }
          return response.json();
        })
        .then((data) => {
          setEquipements(data); // Set the grouped equipment
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching equipment details:", error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [open, command_id]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">Erreur : {error}</Typography>
        ) : order ? (
          <>
            <Typography variant="h6">Détails de la Commande #{order.command_id}</Typography>
            <Typography>Date: {order.date}</Typography>
            <Typography>Statut: {order.status_cmd}</Typography>
            <Typography>Équipements:</Typography>
            <ul>
              {equipements.map((equipement, index) => (
                <li key={index}>
                  {equipement.nom_Equipement} - Quantité: {equipement.quantity}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <Typography>Aucune donnée disponible</Typography>
        )}
      </Box>
    </Modal>
  );
};

// Define prop-types for the component
OrderDetailsModal.propTypes = {
  open: PropTypes.bool.isRequired, // `open` must be a boolean and is required
  onClose: PropTypes.func.isRequired, // `onClose` must be a function and is required
  command_id: PropTypes.number, // `command_id` is optional and must be a number
};

export default OrderDetailsModal;