
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";

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

const StudentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await api.get(`/students/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student details:", error);
        setError("Failed to load student details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudent();
    }
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (error) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-destructive mb-2">{error}</h2>
        <Button onClick={handleBack}>Go Back</Button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "On Leave":
        return "outline";
      case "Inactive":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Student Profile</h1>
        <Button variant="outline" onClick={handleBack}>
          Back to Students
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Skeleton className="h-32 w-32 rounded-full mx-auto" />
                <Skeleton className="h-8 w-3/4 mx-auto mt-4" />
                <Skeleton className="h-4 w-2/3 mx-auto mt-2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  {Array(6)
                    .fill(null)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-5 w-full" />
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : student ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-32 w-32 mx-auto border-2 border-muted">
                  <AvatarImage src={student.avatarUrl} alt={student.name} />
                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4 text-2xl">{student.name}</CardTitle>
                <CardDescription className="text-lg">
                  <Badge variant={getStatusColor(student.status)}>
                    {student.status}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">{student.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Student ID</span>
                  <span className="font-medium">{student.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Course</span>
                  <span className="font-medium">{student.course}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Student Information</CardTitle>
                <CardDescription>Comprehensive student details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Academic Details</h3>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <dt className="text-sm text-muted-foreground">Program</dt>
                      <dd>{student.course}</dd>
                    </div>
                    <div className="space-y-1">
                      <dt className="text-sm text-muted-foreground">
                        Enrollment Date
                      </dt>
                      <dd>
                        {new Date(student.enrollmentDate).toLocaleDateString()}
                      </dd>
                    </div>
                    <div className="space-y-1">
                      <dt className="text-sm text-muted-foreground">GPA</dt>
                      <dd>{student.gpa.toFixed(2)}</dd>
                    </div>
                    <div className="space-y-1">
                      <dt className="text-sm text-muted-foreground">Status</dt>
                      <dd>{student.status}</dd>
                    </div>
                  </dl>
                </div>

                {currentUser && (
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-semibold mb-2">Actions</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline">Edit Information</Button>
                      <Button variant="outline">Update Status</Button>
                      <Button variant="outline">View Grades</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold mb-2">Student not found</h2>
          <p className="text-muted-foreground mb-4">
            The student you are looking for doesn't exist or has been removed.
          </p>
          <Button onClick={handleBack}>Go Back</Button>
        </div>
      )}
    </div>
  );
};

export default StudentDetail;
