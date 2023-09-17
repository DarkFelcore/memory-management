import { Suspense, lazy, useContext } from "react";
import { ThemeContext } from "./context/theme.context";
import { Navbar } from "./components/navbar/navbar";
import { Route, Routes } from "react-router-dom";
import { CustomLinearProgress } from "./components/custom-linear-progress/custom-linear-progress";

// Imports with lazy loading
const Home = lazy(() => import("./pages/home/home"));
const Companies = lazy(() => import("./pages/companies/companies/companies"));
const AddCompanies = lazy(
  () => import("./pages/companies/add-companies/add-companies")
);
const Jobs = lazy(() => import("./pages/jobs/jobs/jobs"));
const AddJobs = lazy(() => import("./pages/jobs/add-job/add-job"));
const Candidates = lazy(
  () => import("./pages/candidates/candidates/candidates")
);
const AddCandidates = lazy(
  () => import("./pages/candidates/add-candidate/add-candidate")
);

export const App = () => {
  const { darkMode } = useContext(ThemeContext);

  const appStyles = darkMode ? "app dark" : "app";

  return (
    <div className={appStyles}>
      <Navbar />
      <div className="wrapper">
        <Suspense fallback={<CustomLinearProgress />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies">
              <Route index element={<Companies />} />
              <Route path="add" element={<AddCompanies />} />
            </Route>
            <Route path="/jobs">
              <Route index element={<Jobs />} />
              <Route path="add" element={<AddJobs />} />
            </Route>
            <Route path="/candidates">
              <Route index element={<Candidates />} />
              <Route path="add" element={<AddCandidates />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};
