import Sidebar from "@/components/sidebar"
import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

type Instructor = {
  name: string;
  email: string;
  createdAt: string;
  role: string;
};

const Instructors = () => {

  const [data, setData] = useState<Instructor[]>([])

  useEffect(() => {
    axios.get('/admin/instructor')
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])


  // Memoize the column definitions
  const columns = useMemo<MRT_ColumnDef<Instructor>[]>(
    () => [
      {
        accessorKey: "name", // Field for instructor name
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "email", // Field for email
        header: "Email",
        size: 200,
      },
      {
        accessorKey: "createdAt", // Field for creation date
        header: "Created At",
        size: 150,
        Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString(), // Format date
      },
      {
        accessorKey: "role", // Field for role
        header: "Role",
        size: 100,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });


  return (
    <div className="flex">
      <Sidebar />
      {/* Content area */}
      <div className="flex-1 p-6 overflow-y-scroll">
        <h1 className="text-2xl font-roboto font-bold text-gray-700 my-10">Instructors</h1>

        <div className="">
          <MaterialReactTable table={table} />
        </div>
      </div>
    </div>
  )
}

export default Instructors