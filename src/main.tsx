import ReactDOM from "react-dom/client";
import "./style/index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
