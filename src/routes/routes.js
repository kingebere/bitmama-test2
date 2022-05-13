import * as React from "react";
import {Routes, Route} from "react-router-dom";
import Spinner from "../components/spinner/spinner";

// Utilizing the React suspense lazy loading functionality

const Dashboard = React.lazy(() => import("../pages/Dashboard/Dashboard"));

const Home = React.lazy(() => import("../pages/Home/Home"));

const routes = () => (
  <React.Suspense fallback={<Spinner />}>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </React.Suspense>
);
export default routes;
