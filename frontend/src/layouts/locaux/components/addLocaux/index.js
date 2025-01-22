import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftDropDown from "components/SoftDropDown";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function AjoutLocal() {
  return (
    <SoftBox mb={3}>
      <Card>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <SoftTypography variant="h6" fontWeight="bold">
            Ajouter un nouveau local
          </SoftTypography>
        </SoftBox>
        <SoftBox flexWrap="wrap" display="flex" justifyContent="space-between" ml={3} mr={3}>
          <SoftBox flex={1} mr={3}>
            <SoftInput icon={{ direction: "left" }} type="name" placeholder="Nom du local" />
          </SoftBox>
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
          flexWrap="wrap"
          mb={3}
          display="flex"
          justifyContent="space-around"
          alignItems="stretch"
        >
          
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

export default AjoutLocal;
