import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

const Screens = {
  DataCenter: {
    useStyles: makeStyles((theme: Theme) => ({})),
  },
  ReportPermission: {
    useStyles: makeStyles((theme: any) => ({
      paper: {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "rgba(241, 243, 244, 1)",
        height: "100%",
        boxShadow: theme.customShadows.z12,
      },
    })),
  },
};

export default Screens;
