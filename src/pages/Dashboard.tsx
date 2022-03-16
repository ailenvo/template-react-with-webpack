import { Box, Container, Grid } from "@mui/material";
import { Helmet } from "react-helmet";

const Dashboard = () => (
  <>
    <Helmet>
      <title>Dashboard | Miko Admin</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}></Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
