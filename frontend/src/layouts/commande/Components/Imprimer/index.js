import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import signature from "assets/images/signature.png"

function PrintCommande() {
  const { commandId } = useParams(); // Récupérer l'ID de la commande depuis l'URL
  const [commande, setCommande] = useState(null); // État pour stocker les détails de la commande
  const [loading, setLoading] = useState(true); // État pour le chargement
  const [error, setError] = useState(null); // État pour les erreurs

  // Récupérer les détails de la commande depuis l'API
  useEffect(() => {
    const fetchCommande = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/commandes/${commandId}`);
        if (!response.ok) {
          throw new Error("Commande non trouvée");
        }
        const data = await response.json();
        setCommande(data); // Mettre à jour l'état avec les détails de la commande
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération de la commande :", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCommande();
  }, [commandId]);

  // Gérer l'impression de la page
  const handlePrint = () => {
    const printableContent = document.getElementById("printable-content").innerHTML;
    const originalContent = document.body.innerHTML;

    // Remplacer le contenu de la page par le contenu à imprimer
    document.body.innerHTML = printableContent;

    // Lancer l'impression
    window.print();

    // Restaurer le contenu original de la page
    document.body.innerHTML = originalContent;

    // Recharger la page pour restaurer les fonctionnalités JavaScript
    window.location.reload();
  };

  // Afficher un message de chargement
  if (loading) {
    return (
      <SoftBox py={3}>
        <SoftTypography variant="h6">Chargement en cours...</SoftTypography>
      </SoftBox>
    );
  }

  // Afficher un message d'erreur
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
        {/* Contenu à imprimer */}
        <div id="printable-content">
          {/* En-tête de la page */}
          <SoftTypography variant="h4" fontWeight="bold" gutterBottom>
            Détails de la commande #{commande.command_id}
          </SoftTypography>

          {/* Informations générales de la commande */}
          <SoftBox mb={4}>
            <SoftTypography variant="h6" fontWeight="bold">
              Statut : {commande.statut}
            </SoftTypography>
            <SoftTypography variant="h6" fontWeight="bold">
              Date : {new Date(commande.date).toLocaleDateString()}
            </SoftTypography>
          </SoftBox>

          {/* Liste des équipements de la commande */}
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
                {commande.equipements.map((equipement, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>{equipement.nom_Equipement}</td>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>{equipement.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SoftBox>

          {/* Signature numérique */}
          <SoftBox mt={4} style={{ textAlign: "right" }}>
            <SoftTypography variant="h6" fontWeight="bold" gutterBottom>
              Signature numérique :
            </SoftTypography>
            <img
              src={signature} // Remplacez par le chemin de votre image de signature
              alt="Signature numérique"
              style={{ width: "100px", height: "auto",marginRight:"3%" }}
            />

          </SoftBox>
        </div>

        {/* Bouton pour imprimer la page */}
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