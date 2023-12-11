
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"

import {PageNotFound} from "./pages/404/index.js"
import {Layout} from './components/layout/Layout.js';
import routes from "./routes/index.js"
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
