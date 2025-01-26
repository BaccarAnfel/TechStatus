import Card from "@mui/material/Card";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function AddEquipement({ onCancel, onEquipementAdded }) {
  const [equipement, setEquipement] = useState({
    nom_equipement: "",
    status: "",
    local_id: "",
    salle_id: "",
  });

  const [locaux, setLocaux] = useState([]);
  const [salles, setSalles] = useState([]);
  const [loadingLocaux, setLoadingLocaux] = useState(true);
  const [loadingSalles, setLoadingSalles] = useState(false);

  // Liste statique des équipements prédéfinis
  const equipementsPredefinis = [
    "Vidéo projecteur",
    "Imprimante",
    "Ordinateur portable",
    "Tableau blanc",
    "Écran interactif",
  ];

  // Récupérer la liste des locaux depuis l'API
  useEffect(() => {
    const fetchLocaux = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/locaux");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des locaux");
        }
        const data = await response.json();
        setLocaux(data);
        setLoadingLocaux(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des locaux:", error);
        setLoadingLocaux(false);
      }
    };

    fetchLocaux();
  }, []);

  // Récupérer la liste des salles en fonction du local sélectionné
  const fetchSallesByLocal = async (local_id) => {
    setLoadingSalles(true);
    try {
      const response = await fetch(`http://localhost:5000/api/salles/${local_id}`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des salles");
      }
      const data = await response.json();
      setSalles(data);
      setLoadingSalles(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des salles:", error);
      setLoadingSalles(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipement((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Si le local est sélectionné, récupérer les salles correspondantes
    if (name === "local_id") {
      setSalles([]); // Réinitialiser la liste des salles
      setEquipement((prevState) => ({
        ...prevState,
        salle_id: "", // Réinitialiser salle_id
      }));
      fetchSallesByLocal(value);
    }

    // Si le statut change, réinitialiser local_id et salle_id si nécessaire
    if (name === "status" && (value === "Non Exploitable" || value === "En Maintenance" || value === "Disponible")) {
      setEquipement((prevState) => ({
        ...prevState,
        local_id: "", // Réinitialiser local_id
        salle_id: "", // Réinitialiser salle_id
      }));
      setSalles([]); // Réinitialiser la liste des salles
    }
  };

  const handleEquipementChange = (event, newValue) => {
    setEquipement((prevState) => ({
      ...prevState,
      nom_equipement: newValue || "", // Mettre à jour le nom de l'équipement
    }));
  };

  const handleSubmit = async () => {
    // Vérifier que tous les champs sont remplis
    if (!equipement.nom_equipement || !equipement.status) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    // Si le statut est "En Utilisation", vérifier que local_id et salle_id sont remplis
    if (
      equipement.status === "En Utilisation" &&
      (!equipement.local_id || !equipement.salle_id)
    ) {
      alert("Veuillez sélectionner un local et une salle.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/addEquipement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(equipement),
      });

      if (response.ok) {
        console.log("Équipement ajouté avec succès !");
        alert("Équipement ajouté avec succès !");
        setEquipement({
          nom_equipement: "",
          status: "",
          local_id: "",
          salle_id: "",
        });
        if (onCancel) onCancel();
        if (onEquipementAdded) onEquipementAdded();
      } else {
        console.error("Erreur lors de l'ajout de l'équipement");
        alert("Erreur lors de l'ajout de l'équipement");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête:", error);
      alert("Erreur lors de l'envoi de la requête");
    }
  };

  const handleCancel = () => {
    setEquipement({
      nom_equipement: "",
      status: "",
      local_id: "",
      salle_id: "",
    });
    if (onCancel) onCancel();
  };

  // Déterminer si les sélecteurs de local et de salle doivent être affichés
  const showLocalAndSalle = equipement.status === "En Utilisation";

  return (
    <SoftBox mb={3}>
      <Card>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <SoftTypography variant="h6" fontWeight="bold">
            Ajouter un nouvel équipement
          </SoftTypography>
        </SoftBox>
        <SoftBox flexWrap="wrap" display="flex" justifyContent="space-between" ml={3}>
          <SoftBox flex={1} mr={3}>
            <Autocomplete
              freeSolo
              options={equipementsPredefinis}
              value={equipement.nom_equipement}
              onChange={handleEquipementChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Nom de l'équipement"
                  fullWidth
                />
              )}
            />
          </SoftBox>
          <SoftBox flex={1} mr={3}>
            <Select
              name="status"
              value={equipement.status}
              onChange={handleChange}
              displayEmpty
              fullWidth
            >
              <MenuItem value="" disabled>
                Sélectionner un statut
              </MenuItem>
              <MenuItem value="En Maintenance">En Maintenance</MenuItem>
              <MenuItem value="En Utilisation">En Utilisation</MenuItem>
              <MenuItem value="Disponible">Disponible</MenuItem>
              <MenuItem value="Non Exploitable">Non Exploitable</MenuItem>
            </Select>
          </SoftBox>
          {/* Afficher le sélecteur du local uniquement si le statut est "En Utilisation" */}
          {showLocalAndSalle && (
            <SoftBox flex={1} mr={3}>
              <Select
                name="local_id"
                value={equipement.local_id || ""}
                onChange={handleChange}
                displayEmpty
                fullWidth
                disabled={loadingLocaux}
              >
                <MenuItem value="" disabled>
                  {loadingLocaux ? "Chargement des locaux..." : "Sélectionner un local"}
                </MenuItem>
                {locaux.map((local) => (
                  <MenuItem key={local.local_id} value={local.local_id}>
                    {local.nom_Local}
                  </MenuItem>
                ))}
              </Select>
            </SoftBox>
          )}
          {/* Afficher le sélecteur de la salle uniquement si un local est sélectionné et le statut est "En Utilisation" */}
          {showLocalAndSalle && equipement.local_id && (
            <SoftBox flex={1} mr={3}>
              <Select
                name="salle_id"
                value={equipement.salle_id}
                onChange={handleChange}
                displayEmpty
                fullWidth
                disabled={loadingSalles}
              >
                <MenuItem value="" disabled>
                  {loadingSalles ? "Chargement des salles..." : "Sélectionner une salle"}
                </MenuItem>
                {salles.map((salle) => (
                  <MenuItem key={salle.salle_id} value={salle.salle_id}>
                    {salle.nom_Salle}
                  </MenuItem>
                ))}
              </Select>
            </SoftBox>
          )}
        </SoftBox>
        <SoftBox display="flex" justifyContent="center" mt={3} mb={3} gap={3}>
          <SoftButton variant="gradient" color="error" sx={{ width: "47%" }} onClick={handleCancel}>
            Annuler
          </SoftButton>
          <SoftButton
            variant="gradient"
            color="secondary"
            sx={{ width: "47%" }}
            onClick={handleSubmit}
          >
            Confirmer
          </SoftButton>
        </SoftBox>
      </Card>
    </SoftBox>
  );
}

AddEquipement.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onEquipementAdded: PropTypes.func.isRequired,
};

export default AddEquipement;