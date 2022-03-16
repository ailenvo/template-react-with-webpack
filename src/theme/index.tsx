// material
import { CssBaseline } from "@mui/material";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
//
import { theme } from "./theme";
import componentsOverride from "./overrides";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeConfig({ children }: Props) {
  theme.components = componentsOverride(theme);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
