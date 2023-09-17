import './candidates.grid.scss';
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ICandidate } from "../../types/global.types";
import { baseUrl } from "../../constants/endpoints";
import { PictureAsPdf } from "@mui/icons-material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "firstName", headerName: "First Name", width: 100 },
  { field: "lastName", headerName: "Last Name", width: 100 },
  { field: "email", headerName: "E-mail", width: 200 },
  { field: "phone", headerName: "Phone", width: 150 },
  { field: "coverLetter", headerName: "Cover Letter", width: 500 },
  {
    field: "resumeUrl",
    headerName: "Download",
    width: 150,
    renderCell: (params) => (
      <a
        download
        href={`${baseUrl}/Candidate/download/${params.row.resumeUrl}`}
      >
        {<PictureAsPdf />}
      </a>
    ),
  },
];

interface CandidatesGridProps {
  data: ICandidate[];
}

const CandidatesGrid = ({ data }: CandidatesGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="candidates-grid">
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default CandidatesGrid;
