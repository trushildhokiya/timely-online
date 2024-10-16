import Sidebar from "@/components/sidebar";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  course: z.string(),
  instructor: z.string().min(1),
  date: z.date(),
});

// Define the Course type
type Course = {
  _id: string;
  name: string;
  level: string;
  description: string;
  image: string;
  createdAt: string;
};

const Courses = () => {
  const [data, setData] = useState<Course[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const {toast} = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course: '',
      instructor: "",
      date: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    values.course = selectedCourseId
    axios.post('/admin/lecture', values)
    .then((res) => {
      if (res.data) {
        form.reset()
        toast({
          title: "New Lecture Added",
          description: "New Lecture added successfully",
          action: <ToastAction altText="okay">Okay</ToastAction>,
        })
      }
    })
    .catch((err) => {
        toast({
            variant: "destructive",
            title: "Something went wrong.",
            description: err.response.data.message,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
    })
  }

  useEffect(() => {
    axios.get('/admin/course')
      .then((res) => {
        setData(res.data.courses);
        setInstructors(res.data.instructors);
        console.log(res.data.instructors)
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Memoize the column definitions
  const columns = useMemo<MRT_ColumnDef<Course>[]>(() => [
    {
      accessorKey: "image",
      header: "Image",
      size: 150,
      Cell: ({ cell }) => (
        <img src={cell.getValue<string>()} alt="Course" className="rounded-xl w-24 h-24" />
      ),
    },
    {
      accessorKey: "name",
      header: "Course Name",
      size: 150,
    },
    {
      accessorKey: "level",
      header: "Level",
      size: 100,
    },
    {
      accessorKey: "description",
      header: "Description",
      size: 250,
    },
    {
      header: "Actions",
      id: 'actions',
      size: 150,
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="bg-gray-700" 
                onClick={() => setSelectedCourseId(row.original._id)}
              >
                Add Lecture
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Lecture</DialogTitle>
                <DialogDescription>
                  Fill out Lecture details and click the submit button
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="course"
                      render={({ field }) => (
                        <FormItem className='hidden'>
                          <FormLabel className='text-grey-800'>ID</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="ID" 
                              autoComplete='off' 
                              {...field} 
                              value={selectedCourseId}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="instructor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instructor</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an instructor" />
                              </SelectTrigger>
                              <SelectContent>
                                {
                                  instructors.map((instructor) => (
                                    <SelectItem key={instructor.email} value={instructor.email}>
                                      {instructor.name}
                                    </SelectItem>
                                  ))
                                }
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>
                            Please select an instructor from the list.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Lecture Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="">Save changes</Button>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>

        </div>
      ),
    },
  ], [instructors, selectedCourseId]);


  const table = useMaterialReactTable({
    columns,
    data,
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-scroll">
        <h1 className="text-2xl font-roboto text-gray-700 font-bold my-10">Courses</h1>
        <div className="">
          <MaterialReactTable table={table} />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Courses;