
import { useState, useCallback, memo, useMemo } from "react";
import api, { availableCourses } from "@/lib/api";
import StudentCard from "./StudentCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  enrollmentDate: string;
  gpa: number;
  avatarUrl: string;
  status: string;
}

// Optimized loading skeleton with fewer elements
const LoadingSkeleton = () => (
  <div className="space-y-4">
    <div className="flex justify-between">
      <Skeleton className="h-16 w-16 rounded-full" />
      <Skeleton className="h-6 w-16" />
    </div>
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-full" />
  </div>
);

// Memoized student card to prevent unnecessary re-renders
const MemoizedStudentCard = memo(StudentCard);

const StudentList = () => {
  const [selectedCourse, setSelectedCourse] = useState("All Courses");

  // Memoized fetch function to prevent unnecessary re-renders
  const fetchStudents = useCallback(async () => {
    console.log("Fetching students for course:", selectedCourse);
    const response = await api.get("/students", {
      params: { course: selectedCourse !== "All Courses" ? selectedCourse : undefined },
    });
    return response.data;
  }, [selectedCourse]);

  const { data: students = [], isLoading } = useQuery({
    queryKey: ["students", selectedCourse],
    queryFn: fetchStudents,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Memoize the list rendering to prevent unnecessary re-renders
  const studentList = useMemo(() => {
    if (students.length === 0) {
      return (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold">No students found</h3>
          <p className="text-muted-foreground">
            No students match your current filter
          </p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {students.map((student: Student) => (
          <MemoizedStudentCard key={student.id} {...student} />
        ))}
      </div>
    );
  }, [students]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Students</h2>
          <p className="text-muted-foreground">
            Browse and manage student records
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              {availableCourses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(2).fill(null).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      ) : studentList}
    </div>
  );
};

export default memo(StudentList);
