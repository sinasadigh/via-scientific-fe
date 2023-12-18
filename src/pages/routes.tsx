import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Table from "../components/table";
import { createGene } from "../components/createGene";


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
        element: createGene(),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
