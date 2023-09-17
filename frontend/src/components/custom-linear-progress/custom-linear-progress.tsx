import { Box, LinearProgress } from "@mui/material";
import { ReactElement } from "react";

export const CustomLinearProgress = (): ReactElement => {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
};
