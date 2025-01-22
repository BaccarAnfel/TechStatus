import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftDropDown from "components/SoftDropDown";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function AjoutSalle() {
  const types = ["Bureau d'enseignant", "Salle d'enseignement"];
  const departments = [
    "Département Informatique",
    "Département de mastères",
    "Locaux communs 3",
    "Locaux commun 4",
  ];
  return (
    <SoftBox mb={3}>
      <Card>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <SoftTypography variant="h6" fontWeight="bold">
            Ajouter une nouvelle salle
          </SoftTypography>
        </SoftBox>
        <SoftBox flexWrap="wrap" display="flex" justifyContent="space-between" ml={3} mr={3}>
          <SoftBox flex={1} mr={3}>
            <SoftInput icon={{ direction: "left" }} type="name" placeholder="Nom" />
          </SoftBox>
          <SoftBox flex={1} ml={3} mb={3}>
            <SoftDropDown placeholder={"Département"} optionsList={departments} />
          </SoftBox>
        </SoftBox>
        <SoftBox
          flexWrap="wrap"
          mb={3}
          display="flex"
          justifyContent="space-around"
          alignItems="stretch"
        >
          <SoftBox flex={1} mr={3} ml={3}>
            <SoftButton
              variant="gradient"
              color="secondary"
              sx={{
                width: "100%",
              }}
            >
              Confirmer
            </SoftButton>
          </SoftBox>
        </SoftBox>
        <SoftBox
          sx={{
            "& .MuiTableRow-root:not(:last-child)": {
              "& td": {
                borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              },
            },
          }}
        ></SoftBox>
      </Card>
    </SoftBox>
  );
}

export default AjoutSalle;
