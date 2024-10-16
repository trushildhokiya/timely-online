import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/sidebar";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster"
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

// Define the validation schema using Zod
const formSchema = z.object({
  name: z.string().min(3).max(100, "Name must be between 3 and 100 characters"),
  level: z.string().min(1, "Please specify the course level"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters")
    .max(500),
  image: z.string().url("Image must be a valid URL"),
});

const AddCourses = () => {

  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      level: "",
      description: "",
      image: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios.post('/admin/course', values)
    .then((res) => {
      if (res.data.created) {
        form.reset()
        toast({
          title: "New Course Added",
          description: "New course added successfully",
          action: <ToastAction altText="okay">Okay</ToastAction>,
        })
      }
    })
    .catch((err) => {
      console.log(err);
      
        toast({
            variant: "destructive",
            title: "Something went wrong.",
            description: err.response.data.message,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
    })

  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      {/* Content area */}
      <div className="flex-1 p-6 overflow-y-scroll ">
        <div className="container p-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-700 tracking-wide font-roboto font-semibold text-3xl">
                Add a New Course
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* Course Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Course Name" autoComplete="off" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Course Level */}
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Level</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Course Level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="advance">Advance</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Course Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Course description..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Course Image */}
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Image (URL)</FormLabel>
                        <FormControl>
                          <Input placeholder="Image URL" autoComplete="off" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button type="submit">Add Course</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AddCourses;
