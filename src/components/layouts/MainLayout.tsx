import { Outlet, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { USER_TOKEN_KEY } from "../../services/local/auth-tokens";
import { ROUTE_PATH } from "../../common/constants/app.constant";

const MainLayoutRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  height: "100%",
  overflow: "hidden",
  width: "100%",
}));

const MainLayoutWrapper = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
});

const MainLayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
});

const MainLayoutContent = styled("div")({
  flex: "1 1 auto",
  height: "100%",
  overflow: "auto",
});

const MainLayout = () => {
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(USER_TOKEN_KEY);

    if (token) navigate(ROUTE_PATH.FUNCTION);
  }, [navigate]);

  return (
    <MainLayoutRoot>
      <MainLayoutWrapper>
        <MainLayoutContainer>
          <MainLayoutContent>
            <Outlet />
          </MainLayoutContent>
        </MainLayoutContainer>
      </MainLayoutWrapper>
    </MainLayoutRoot>
  );
};

export default MainLayout;
