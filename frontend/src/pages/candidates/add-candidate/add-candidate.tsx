import "./add-candidate.scss";
import { useEffect, useState } from "react";
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
import { ICreateCandidate, IJob } from "../../../types/global.types";

const AddCandidate = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [candidate, setCandidate] = useState<ICreateCandidate>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
    jobId: "",
  });

  useEffect(() => {
    http
      .get<IJob[]>("/Job/Read")
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const handleSaveClick = () => {
    if (
      candidate.firstName === "" ||
      candidate.lastName === "" ||
      candidate.email === "" ||
      candidate.phone === "" ||
      candidate.coverLetter === "" ||
      candidate.jobId === "" ||
      !pdfFile
    ) {
      alert("Please fill all the fields");
      return;
    }
    const formData = new FormData();
    formData.append("firstName", candidate.firstName);
    formData.append("lastName", candidate.lastName);
    formData.append("email", candidate.email);
    formData.append("phone", candidate.phone);
    formData.append("coverLetter", candidate.coverLetter);
    formData.append("jobId", candidate.jobId);
    formData.append("pdfFile", pdfFile);
    http
      .post("/Candidate/Create", formData)
      .then((res) => navigate("/candidates"))
      .catch((err) => console.log(err));
  };
  const handleBackClick = () => {
    navigate("/candidates");
  };

  return (
    <div className="content">
      <div className="add-candidate">
        <h2>Add new candidate</h2>
        <FormControl fullWidth>
          <InputLabel>Job</InputLabel>
          <Select
            value={candidate.jobId}
            label="Job"
            onChange={(e) =>
              setCandidate({ ...candidate, jobId: e.target.value })
            }
          >
            {jobs.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          autoComplete="off"
          label="First Name"
          variant="outlined"
          value={candidate.firstName}
          onChange={(e) =>
            setCandidate({ ...candidate, firstName: e.target.value })
          }
        />

        <TextField
          fullWidth
          autoComplete="off"
          label="Last Name"
          variant="outlined"
          value={candidate.lastName}
          onChange={(e) =>
            setCandidate({ ...candidate, lastName: e.target.value })
          }
        />

        <TextField
          fullWidth
          autoComplete="off"
          label="Email Address"
          variant="outlined"
          value={candidate.email}
          onChange={(e) =>
            setCandidate({ ...candidate, email: e.target.value })
          }
        />

        <TextField
          fullWidth
          autoComplete="off"
          label="Phone Number"
          variant="outlined"
          value={candidate.phone}
          onChange={(e) =>
            setCandidate({ ...candidate, phone: e.target.value })
          }
        />

        <TextField
          fullWidth
          multiline
          autoComplete="off"
          label="Cover Letter"
          variant="outlined"
          value={candidate.coverLetter}
          onChange={(e) =>
            setCandidate({ ...candidate, coverLetter: e.target.value })
          }
        />

        <input
          type="file"
          onChange={(e) =>
            setPdfFile(e.target.files ? e.target.files[0] : null)
          }
        />

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

export default AddCandidate;
