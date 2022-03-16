import { createTheme } from "@mui/material/styles";
import { ThemeOptions as ThemeOptionsOld } from "@mui/material/styles/createTheme";
import shape from "./shape";
import palette from "./palette";
import typography from "./typography";
import shadows, { customShadows } from "./shadows";

// Custom theme: Colors
const themeColors = {
  palette,
  shape,
  typography,
  shadows,
  customShadows,
} as const;

// Override style Mui
const themeOptions: ThemeOptionsOld = {
  ...themeColors,
};

// Update for Typescript
type CustomTheme = {
  [Key in keyof typeof themeColors]: typeof themeColors[Key];
};
declare module "@mui/material/styles/createTheme" {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

// Create theme
export const theme = createTheme({ ...themeColors, ...themeOptions });
