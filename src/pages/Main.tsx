import { useRoutes } from "react-router";
import GlobalStyles from "../components/GlobalStyles";
import routes from "../routes";
import ThemeConfig from "../theme";

const Main = () => {
  const content = useRoutes(routes);

  return (
    <ThemeConfig>
      <GlobalStyles />
      {content}
    </ThemeConfig>
  );
};

export default Main;
