import Sidebar from "@/components/instructorSidebar";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';

const InstructorDashboard = () => {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    axios.get('/instructor/getSchedule')
      .then((res) => {
        console.log(res.data); // Log the response data
        setLectures(res.data); // Set the lectures data
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Memoize the column definitions
  const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
    {
      accessorKey: 'courseName',
      header: 'Course Name',
      size: 250,
    },
    {
      accessorKey: 'date',
      header: 'Date',
      size: 150,
      Cell: ({ cell }) => {
        return new Date(cell.getValue()).toLocaleDateString();
      }
    },
  ], []);

  const table = useMaterialReactTable({
    columns,
    data: lectures,
  });

  return (
    <div className="flex">
      <Sidebar />
      {/* Content area */}
      <div className="flex-1 p-6 overflow-y-scroll">
        <h1 className="text-2xl font-roboto text-gray-700 font-bold">Instructor Dashboard</h1>
        <div className="mt-4">
          <MaterialReactTable table={table} />
        </div>
      </div>
    </div>
  );
}

export default InstructorDashboard;
