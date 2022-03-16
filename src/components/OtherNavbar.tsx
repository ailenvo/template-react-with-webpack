import { Link as RouterLink } from "react-router-dom";
import { AppBar, Box, Breadcrumbs, Toolbar } from "@mui/material";
import Logo from "./Logo";
import Themes from "../assets/themes/_index";
import { Helmet } from "react-helmet";

export default function OtherNavbar() {
  const classes = Themes.Styles.Components.OtherNavbar.useStyles();

  return (
    <>
      <Helmet>
        <title>Admin</title>
      </Helmet>
      <AppBar elevation={0} sx={{ backgroundColor: "white" }}>
        <Toolbar className={classes.topBar}>
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
            }}
          >
            <RouterLink to="/">
              <Logo />
            </RouterLink>
            <Breadcrumbs
              className={classes.breadcrumbs}
              aria-label="breadcrumb"
            >
              <RouterLink className={classes.link} color="inherit" to="/">
                MUI
              </RouterLink>
            </Breadcrumbs>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
