import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
// serviceWorkerRegistration.register({
//   onUpdate: (sw) => {
//     if (sw.waiting) {
//       sw.waiting.postMessage({ type: "SKIP_WAITING" });

//       window.location.reload();
//       console.log("Update happened.");
//     }
//   },
// });
