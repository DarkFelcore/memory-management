import { ReactElement, useEffect, useState } from "react";
import "./companies.scss";
import http from "../../../helpers/http.helper";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { ICompany } from "../../../types/global.types";
import CompaniesGrid from "../../../components/companies/companies.grid";

const Companies = (): ReactElement => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    http
      .get<ICompany[]>("/Company/Read")
      .then((res) => {
        setCompanies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  }, []);

  return (
    <div className="content companies">
      <div className="heading">
        <h2>Companies</h2>
        <Button variant="outlined" onClick={() => navigate("/companies/add")}>
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : companies.length === 0 ? (
        <h1>No companies to preview</h1>
      ) : (
        <CompaniesGrid data={companies} />
      )}
    </div>
  );
};

export default Companies;
