import './jobs.grid.scss';
import moment from "moment";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IJob } from "../../types/global.types";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "title", headerName: "Title", width: 200 },
  { field: "level", headerName: "Level", width: 150 },
  { field: "companyName", headerName: "Company Name", width: 150 },
  {
    field: "createdAt",
    headerName: "Created Time",
    width: 200,
    renderCell: (params) => moment(params.row.createdAt).fromNow(),
  },
];

interface JobsGridProps {
  data: IJob[];
}

const JobsGrid = ({ data }: JobsGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="jobs-grid">
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default JobsGrid;
