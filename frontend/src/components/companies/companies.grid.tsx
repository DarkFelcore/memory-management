import './companies.grid.scss';
import moment from "moment";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ICompany, IJob } from "../../types/global.types";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "size", headerName: "Size", width: 150 },
  {
    field: "createdAt",
    headerName: "Created Time",
    width: 200,
    renderCell: (params) => moment(params.row.createdAt).format("YYYY-MM-DD"),
  },
];

interface CompaniesGridProps {
  data: ICompany[] | IJob[];
}

const CompaniesGrid = ({ data }: CompaniesGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="companies-grid">
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default CompaniesGrid;
