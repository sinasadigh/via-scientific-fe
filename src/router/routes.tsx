import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Table from "../pages/showTable";
import CreateGene from "../pages/createGene";

const routes: RouteObject[] = [
  {
    path: "/",
    element: App(),
    children: [
      {
        index: true,
        element: <Table />,
      },
      {
        path: "/create-gene",
        element: <CreateGene />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
