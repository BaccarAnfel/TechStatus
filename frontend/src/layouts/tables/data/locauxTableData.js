/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Data for table des locaux
const locauxTableData = {
  columns: [
    { name: "Id de local", align: "left"},
    { name: "Nom de local", align: "left" }, // Column for local name
    { name: "Action", align: "center" }, // Column for action
  ],

  rows: [
    {
      nom: "Local A", // Name of the local
      action: (
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </SoftTypography>
      ),
    },
    {
      nom: "Local B", // Name of the local
      action: (
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </SoftTypography>
      ),
    },
    {
      nom: "Local C", // Name of the local
      action: (
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </SoftTypography>
      ),
    },
    // Add more rows as needed
  ],
};

export default locauxTableData;
