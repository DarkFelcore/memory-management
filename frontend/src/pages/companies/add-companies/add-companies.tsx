import "./add-companies.scss";
import { useState } from "react";
import { ICreateCompany } from "../../../types/global.types";
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

const AddCompanies = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState<ICreateCompany>({
    name: "",
    size: "",
  });

  const handleSaveClick = () => {
    if (company.name === "" || company.size === "") {
      alert("Please fill all the fields");
      return;
    }
    http
      .post("/Company/Create", company)
      .then((res) => navigate("/companies"))
      .catch((err) => console.log(err));
  };
  const handleBackClick = () => {
    navigate("/companies");
  };

  return (
    <div className="content">
      <div className="add-company">
        <h2>Add new company</h2>
        <TextField
          fullWidth
          autoComplete="off"
          label="Company Name"
          variant="outlined"
          name="name"
          value={company.name}
          onChange={(e) => setCompany({ ...company, name: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel>Company Size</InputLabel>
          <Select
            value={company.size}
            label="Company Size"
            onChange={(e) => setCompany({ ...company, size: e.target.value })}
          >
            <MenuItem value="small">Small</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="large">Large</MenuItem>
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

export default AddCompanies;
