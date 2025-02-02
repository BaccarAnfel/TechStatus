import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import signature from "assets/images/signature.png";

function PrintCommande() {
  const { commandId } = useParams();
  const [commande, setCommande] = useState(null);
  const [groupedEquipements, setGroupedEquipements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommande = async () => {
      try {
        // Récupérer les détails de la commande
        const commandeResponse = await fetch(`http://localhost:5000/api/commandes/${commandId}`);
        if (!commandeResponse.ok) {
          throw new Error("Commande non trouvée");
        }
        const commandeData = await commandeResponse.json();
        setCommande(commandeData);

        // Récupérer les équipements groupés
        const equipementsResponse = await fetch(`http://localhost:5000/api/equipementsCommand/${commandId}`);
        if (!equipementsResponse.ok) {
          throw new Error("Erreur lors de la récupération des équipements");
        }
        const equipementsData = await equipementsResponse.json();
        setGroupedEquipements(equipementsData);

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCommande();
  }, [commandId]);

  const handlePrint = () => {
    const printableContent = document.getElementById("printable-content").innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printableContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  if (loading) {
    return (
      <SoftBox py={3}>
        <SoftTypography variant="h6">Chargement en cours...</SoftTypography>
      </SoftBox>
    );
  }

  if (error) {
    return (
      <SoftBox py={3}>
        <SoftTypography variant="h6" color="error">
          Erreur : {error}
        </SoftTypography>
      </SoftBox>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox p={3}>
        <div id="printable-content">
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <SoftBox>
              <SoftTypography variant="h4" fontWeight="bold" gutterBottom>
                Détails de la commande #{commande.command_id}
              </SoftTypography>
              <SoftTypography variant="h6" fontWeight="bold" textAlign="left">
                Date : {new Date(commande.date).toLocaleDateString()}
              </SoftTypography>
            </SoftBox>
            <img
              src={signature}
              alt="Signature numérique"
              style={{ width: "100px", height: "auto", marginRight: "3%" }}
            />
          </SoftBox>

          <SoftBox mb={4}>
            <SoftTypography variant="h5" fontWeight="bold" gutterBottom>
              Équipements commandés
            </SoftTypography>
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #000" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #000", padding: "8px", textAlign: "left", backgroundColor: "#f2f2f2" }}>Équipement</th>
                  <th style={{ border: "1px solid #000", padding: "8px", textAlign: "left", backgroundColor: "#f2f2f2" }}>Quantité</th>
                </tr>
              </thead>
              <tbody>
                {groupedEquipements.map((equipement, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>{equipement.nom_Equipement}</td>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>{equipement.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SoftBox>

          <SoftBox mt={4} style={{ textAlign: "right" }}>
            <SoftTypography variant="h6" fontWeight="bold" gutterBottom>
              Signature numérique :
            </SoftTypography>
          </SoftBox>
        </div>

        <SoftBox mt={4}>
          <SoftButton variant="gradient" color="primary" onClick={handlePrint}>
            Imprimer
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default PrintCommande;