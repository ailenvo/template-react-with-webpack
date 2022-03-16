import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const Components = {
  ModalContainer: {
    useStyles: makeStyles((theme: Theme) => ({
      dialogWrapper: {
        padding: theme.spacing(3),
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        minHeight: 500,
        // height: "calc(100% - 64px)",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        margin: 0,
      },
      dialogTitle: {
        paddingRight: "0px",
        paddingTop: "0px",
        paddingBottom: "0px",
      },
      sm: {
        minWidth: 300,
      },
      md: {
        minWidth: 600,
      },
      lg: {
        minWidth: 900,
      },
      xl: {
        minWidth: 1140,
      },
      autoMinHeight: { minHeight: "auto" },
      autoMinWidth: { minWidth: "auto" },
    })),
  },
  Table: {
    useStyles: makeStyles(() => ({
      wrapperFilterIcon: {
        marginLeft: 6,
        height: 20,
        width: 20,
        cursor: "pointer",
      },
      icon: {
        color: "#808080",
        fontSize: 20,
      },
      boxEmpty: {
        height: 100,
        display: "flex",
        alignItems: "center",
      },
      textEmpty: {
        color: "#999",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
      },
    })),
  },
  OtherNavbar: {
    useStyles: makeStyles(() => ({
      topBar: {
        height: 64,
        backgroundColor: "#fff",
        boxShadow: "0 1px 4px 0 rgb(74 74 78 / 12%);",
      },
      link: {
        color: "#999",
      },
      breadcrumbs: {
        display: "inline-block",
        marginLeft: 20,
      },
    })),
  },
  Navbar: {
    useStyles: makeStyles((theme: Theme) => ({
      midBar: {
        height: 48,
        minHeight: 48,
        backgroundColor: "#fff",
        boxShadow: "0 1px 4px 0 rgb(74 74 78 / 12%);",
        padding: "0px 60px",
      },
      navlinks: {
        display: "flex",
        background: "white",
      },
      logo: {
        flexGrow: "1",
        cursor: "pointer",
      },
      link: {
        textDecoration: "none",
        color: "#637381",
        fontSize: "14px",
        fontWeight: "700",
        padding: "12px 16px",
        borderBottom: "2px solid white",
      },
      linkActive: {
        color: "rgb(52,213,209)",
        borderBottom: "2px solid rgb(52,213,209)",
      },
    })),
  },
  DashboardNavbar: {
    useStyles: makeStyles((theme: Theme) => ({
      breadcrumbs: {
        display: "inline-block",
        fontSize: "0.875rem",
      },
      breadcrumbDot: {
        width: "4px",
        height: "4px",
        borderRadius: "50%",
        backgroundColor: "rgb(145, 158, 171)",
      },
      breadcrumbHighlight: {
        fontWeight: "bold",
      },
    })),
  },
};

export default Components;
