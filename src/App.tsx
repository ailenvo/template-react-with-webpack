import "react-perfect-scrollbar/dist/css/styles.css";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import reduxStore from "../src/redux/store";
import "./App.css";
import moment from "moment";
import "moment/locale/vi";
import Main from "./pages/Main";

const App = () => {
  moment.locale("vi", {
    week: {
      dow: 1,
    },
  });

  return (
    <Provider store={reduxStore.store}>
      <PersistGate loading={null} persistor={reduxStore.persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;
