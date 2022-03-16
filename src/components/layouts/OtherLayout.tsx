import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import OtherNavbar from "../OtherNavbar";

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
  paddingTop: 64,
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

const OtherLayout = () => {
  //   let navigate = useNavigate();

  //   useEffect(() => {
  //     const token = localStorage.getItem(USER_TOKEN_KEY);

  //     if (token) navigate(ROUTE_PATH.DASHBOARD);
  //   }, [navigate]);

  return (
    <MainLayoutRoot>
      <OtherNavbar />
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

export default OtherLayout;
