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
    image_url: "", // Ajout du champ image_url
  });

  const [locaux, setLocaux] = useState([]);
  const [salles, setSalles] = useState([]);
  const [loadingLocaux, setLoadingLocaux] = useState(true);
  const [loadingSalles, setLoadingSalles] = useState(false);
  const [equipements, setEquipements] = useState([]);

  useEffect(() => {
    const fetchEquipements = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/equipementsByName");
        if (!response.ok) throw new Error("Erreur lors de la récupération des équipements");
        const data = await response.json();
        setEquipements(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des équipements:", error);
      }
    };
    fetchEquipements();
  }, []);

  useEffect(() => {
    const fetchLocaux = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/locaux");
        if (!response.ok) throw new Error("Erreur lors de la récupération des locaux");
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

  const fetchSallesByLocal = async (local_id) => {
    setLoadingSalles(true);
    try {
      const response = await fetch(`http://localhost:5000/api/salles/${local_id}`);
      if (!response.ok) throw new Error("Erreur lors de la récupération des salles");
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

    if (name === "local_id") {
      setSalles([]);
      setEquipement((prevState) => ({ ...prevState, salle_id: "" }));
      fetchSallesByLocal(value);
    }

    if (name === "status" && ["Non Exploitable", "En Maintenance", "Disponible"].includes(value)) {
      setEquipement((prevState) => ({ ...prevState, local_id: "", salle_id: "" }));
      setSalles([]);
    }
  };

  const handleEquipementChange = (event, newValue) => {
    setEquipement((prevState) => ({
      ...prevState,
      nom_equipement: newValue || "",
    }));
  };

  const handleSubmit = async () => {
    if (!equipement.nom_equipement || !equipement.status) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (equipement.status === "En Utilisation" && (!equipement.local_id || !equipement.salle_id)) {
      alert("Veuillez sélectionner un local et une salle.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/addEquipement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(equipement),
      });

      if (response.ok) {
        alert("Équipement ajouté avec succès !");
        setEquipement({ nom_equipement: "", status: "", local_id: "", salle_id: "", image_url: "" });
        if (onCancel) onCancel();
        if (onEquipementAdded) onEquipementAdded();
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête:", error);
      alert("Erreur lors de l'envoi de la requête");
    }
  };

  const handleCancel = () => {
    setEquipement({ nom_equipement: "", status: "", local_id: "", salle_id: "", image_url: "" });
    if (onCancel) onCancel();
  };

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
              options={equipements}
              value={equipement.nom_equipement}
              getOptionLabel={(option) => option.nom || option}
              renderOption={(props, option) => (
                <li {...props} key={option.id || option}>{option.nom || option}</li>
              )}
              onChange={handleEquipementChange}
              onInputChange={(event, newValue) => setEquipement((prevState) => ({ ...prevState, nom_equipement: newValue || "" }))}
              renderInput={(params) => <TextField {...params} placeholder="Nom de l'équipement" fullWidth />}
            />
          </SoftBox>

          <SoftBox flex={1} mr={3}>
            <SoftInput
              name="image_url"
              placeholder="URL de l'image"
              value={equipement.image_url}
              onChange={handleChange}
              fullWidth
            />
          </SoftBox>

          <SoftBox flex={1} mr={3}>
            <Select name="status" value={equipement.status} onChange={handleChange} displayEmpty fullWidth>
              <MenuItem value="" disabled>Sélectionner un statut</MenuItem>
              <MenuItem value="En Maintenance">En Maintenance</MenuItem>
              <MenuItem value="En Utilisation">En Utilisation</MenuItem>
              <MenuItem value="Disponible">Disponible</MenuItem>
              <MenuItem value="Non Exploitable">Non Exploitable</MenuItem>
            </Select>
          </SoftBox>

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
          <SoftButton variant="gradient" color="error" onClick={handleCancel}>Annuler</SoftButton>
          <SoftButton variant="gradient" color="secondary" onClick={handleSubmit}>Confirmer</SoftButton>
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
