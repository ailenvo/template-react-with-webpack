import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";
import Logo from "./Logo";

export default function MainNavbar() {
  return (
    <AppBar elevation={0}>
      <Toolbar sx={{ height: 64 }}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
}
