import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function EditEquipement() {
  const { equipement_id } = useParams();
  const navigate = useNavigate();
  const [equipement, setEquipement] = useState({
    nom_Equipement: "",
    status_equipement: "",
    salle_id: "",
    nom_Salle: "",
    local_id: "",
  });
  const [salles, setSalles] = useState([]);
  const [locaux, setLocaux] = useState([]);
  const [loading, setLoading] = useState(true);
  const [equipementsList, setEquipementsList] = useState([]); // État pour stocker la liste des équipements

  // Récupérer la liste des équipements
  useEffect(() => {
    const fetchEquipementsList = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/equipementsByName");
        const data = await response.json();
        setEquipementsList(data); // Mettre à jour l'état avec la liste des équipements
      } catch (error) {
        console.error("Erreur lors de la récupération de la liste des équipements :", error);
      }
    };

    fetchEquipementsList();
  }, []);

  // Fetch equipment data
  useEffect(() => {
    const fetchEquipementData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/equipements/${equipement_id}`);
        const data = await response.json();
        setEquipement({
          nom_Equipement: data.nom_Equipement,
          status_equipement: data.status_equipement,
          salle_id: data.salle_id || "",
          nom_Salle: data.nom_Salle || "Aucune salle associée",
          local_id: data.local_id || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false);
      }
    };

    fetchEquipementData();
  }, [equipement_id]);

  // Fetch all locaux
  useEffect(() => {
    const fetchLocaux = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/locaux");
        const data = await response.json();
        setLocaux(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des locaux :", error);
      }
    };

    fetchLocaux();
  }, []);

  // Fetch salles based on selected local_id
  useEffect(() => {
    const fetchSalles = async () => {
      if (equipement.local_id) {
        try {
          const response = await fetch(`http://localhost:5000/api/locaux/${equipement.local_id}/salles`);
          const data = await response.json();
          setSalles(data);
        } catch (error) {
          console.error("Erreur lors de la récupération des salles :", error);
        }
      } else {
        setSalles([]); // Reset salles if no local_id is selected
      }
    };

    fetchSalles();
  }, [equipement.local_id]);

  // Reset local_id and salle_id if status changes
  useEffect(() => {
    if (
      equipement.status_equipement === "Non Exploitable" ||
      equipement.status_equipement === "En Maintenance" ||
      equipement.status_equipement === "Disponible"
    ) {
      setEquipement((prevState) => ({
        ...prevState,
        local_id: "",
        salle_id: "",
      }));
    }
  }, [equipement.status_equipement]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEquipement((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a payload without local_id
    const payload = {
      nom_Equipement: equipement.nom_Equipement,
      status_equipement: equipement.status_equipement,
      salle_id: equipement.salle_id,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/equipements/${equipement_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Équipement mis à jour avec succès !");
        navigate("/equipements");
      } else {
        console.error("Erreur lors de la mise à jour de l'équipement");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'équipement :", error);
    }
  };

  if (loading) {
    return (
      <SoftBox py={3}>
        <SoftTypography variant="h6">Chargement...</SoftTypography>
      </SoftBox>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mb={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6" fontWeight="bold">
              Modifier équipement
            </SoftTypography>
          </SoftBox>
          <SoftBox flexWrap="wrap" display="flex" justifyContent="space-between" ml={3} mr={3}>
            <SoftBox flex={1} mr={3}>
              <SoftTypography variant="h6" mb={1}>
                Nom de équipement
              </SoftTypography>
              <Select
                name="nom_Equipement"
                value={equipement.nom_Equipement || ""}
                onChange={handleInputChange}
                displayEmpty
                fullWidth
              >
                <MenuItem value="" disabled>
                  Sélectionner un équipement
                </MenuItem>
                {equipementsList.map((equipement) => (
                  <MenuItem key={equipement} value={equipement}>
                    {equipement}
                  </MenuItem>
                ))}
              </Select>
            </SoftBox>
            <SoftBox flex={1} mr={3}>
              <SoftTypography variant="h6" mb={1}>
                Statut
              </SoftTypography>
              <Select
                name="status_equipement"
                value={equipement.status_equipement}
                onChange={handleInputChange}
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
            {equipement.status_equipement === "En Utilisation" && (
              <SoftBox flex={1} mr={3}>
                <SoftTypography variant="h6" mb={1}>
                  Local
                </SoftTypography>
                <Select
                  name="local_id"
                  value={equipement.local_id || ""}
                  onChange={handleInputChange}
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Sélectionner un local
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
            {equipement.status_equipement === "En Utilisation" && equipement.local_id && (
              <SoftBox flex={1} mr={3}>
                <SoftTypography variant="h6" mb={1}>
                  Salle
                </SoftTypography>
                <Select
                  name="salle_id"
                  value={equipement.salle_id || ""}
                  onChange={handleInputChange}
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Sélectionner une salle
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
            <SoftButton
              variant="gradient"
              color="error"
              sx={{ width: "47%" }}
              onClick={() => navigate("/equipements")}
            >
              Annuler
            </SoftButton>
            <SoftButton
              variant="gradient"
              color="secondary"
              sx={{ width: "47%" }}
              onClick={handleSubmit}
            >
              Enregistrer
            </SoftButton>
          </SoftBox>
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
}

export default EditEquipement;