import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Hidden, Typography } from "@mui/material";
import Logo from "../Logo";

// ----------------------------------------------------------------------

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <HeaderStyle>
      <RouterLink to="/">
        <Logo />
      </RouterLink>

      <Hidden smDown>
        <Typography
          variant="body2"
          sx={{
            mt: { md: -2 },
          }}
        >
          {children}
        </Typography>
      </Hidden>
    </HeaderStyle>
  );
}
