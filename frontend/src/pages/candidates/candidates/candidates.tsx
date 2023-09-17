import "./candidates.scss";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import http from "../../../helpers/http.helper";
import { ICandidate } from "../../../types/global.types";
import CandidatesGrid from "../../../components/candidates/candidates.grid";

const Candidates = (): ReactElement => {
  const [candidates, setCandidates] = useState<ICandidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    http
      .get<ICandidate[]>("/Candidate/Read")
      .then((res) => {
        setCandidates(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  }, []);

  return (
    <div className="content candidates">
      <div className="heading">
        <h2>Candidates</h2>
        <Button variant="outlined" onClick={() => navigate("/candidates/add")}>
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : candidates.length === 0 ? (
        <h1>No candidates to preview</h1>
      ) : (
        <CandidatesGrid data={candidates} />
      )}
    </div>
  );
};

export default Candidates;
