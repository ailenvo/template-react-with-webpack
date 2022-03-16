import { motion } from "framer-motion";
import { Box, Button, Container, styled, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { MotionContainer, varBounceIn } from "../components/animate";
import Page from "../components/Page";

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
}));

const NotFound = () => (
  <RootStyle title="404 Page Not Found | Miko Admin">
    <Container>
      <MotionContainer initial="initial" open>
        <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
          <motion.div variants={varBounceIn}>
            <Typography variant="h3" paragraph>
              Sorry, page not found!
            </Typography>
          </motion.div>
          <Typography sx={{ color: "text.secondary" }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
          </Typography>

          <motion.div variants={varBounceIn}>
            <Box
              component="img"
              src="/static/illustrations/illustration_404.svg"
              sx={{ height: 260, mx: "auto", my: { xs: 2, sm: 5 } }}
            />
          </motion.div>

          <Button
            to="/"
            size="large"
            variant="contained"
            component={RouterLink}
          >
            Go to Home
          </Button>
        </Box>
      </MotionContainer>
    </Container>
  </RootStyle>
);

export default NotFound;
