import "./jobs.scss";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import http from "../../../helpers/http.helper";
import { IJob } from "../../../types/global.types";
import CompaniesGrid from "../../../components/companies/companies.grid";
import JobsGrid from "../../../components/jobs/jobs.grid";

const Jobs = (): ReactElement => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    http
      .get<IJob[]>("/Job/Read")
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  }, []);

  return (
    <div className="content jobs">
      <div className="heading">
        <h2>Jobs</h2>
        <Button variant="outlined" onClick={() => navigate("/jobs/add")}>
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : jobs.length === 0 ? (
        <h1>No jobs to preview</h1>
      ) : (
        <JobsGrid data={jobs} />
      )}
    </div>
  );
};

export default Jobs;
