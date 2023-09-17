import "./add-job.scss";
import { useEffect, useState } from "react";
import { ICompany, ICreateJob } from "../../../types/global.types";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import http from "../../../helpers/http.helper";

const levelsArray: string[] = [
  "Intern",
  "Junior",
  "Medior",
  "Senior",
  "TeamLead",
  "Cto",
  "Architect",
];

const AddJobs = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [job, setJob] = useState<ICreateJob>({
    companyId: "",
    level: "",
    title: "",
  });

  useEffect(() => {
    http
      .get<ICompany[]>("/Company/Read")
      .then((res) => {
        setCompanies(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const handleSaveClick = () => {
    if (job.companyId === "" || job.level === "" || job.title === "") {
      alert("Please fill all the fields");
      return;
    }
    http
      .post("/Job/Create", job)
      .then((res) => navigate("/jobs"))
      .catch((err) => console.log(err));
  };
  const handleBackClick = () => {
    navigate("/jobs");
  };

  return (
    <div className="content">
      <div className="add-job">
        <h2>Add new job</h2>
        <TextField
          fullWidth
          autoComplete="off"
          label="Job Title"
          variant="outlined"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />

        <FormControl fullWidth>
          <InputLabel>Job Level</InputLabel>
          <Select
            value={job.level}
            label="Job Level"
            onChange={(e) => setJob({ ...job, level: e.target.value })}
          >
            {levelsArray.map((level) => (
              <MenuItem value={level} key={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Company</InputLabel>
          <Select
            value={job.companyId}
            label="Company"
            onChange={(e) => setJob({ ...job, companyId: e.target.value })}
          >
            {companies.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="btns">
          <Button variant="outlined" color="primary" onClick={handleSaveClick}>
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleBackClick}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddJobs;
