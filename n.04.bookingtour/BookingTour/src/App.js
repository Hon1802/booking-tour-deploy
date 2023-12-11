
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"

import PageNotFound from "./pages/404"
import Layout from './components/layout/Layout';
import routes from "./routes"
function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <PageNotFound />,
      children: routes
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
