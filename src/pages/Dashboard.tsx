
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { BarChart, ChevronRight, Users, Award, BookOpen, Clock } from "lucide-react";

interface Student {
  id: string;
  name: string;
  course: string;
  status: string;
}

interface CourseCounts {
  [key: string]: number;
}

interface StatusCounts {
  active: number;
  onLeave: number;
  inactive: number;
}

const Dashboard = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [courseCounts, setCourseCounts] = useState<CourseCounts>({});
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    active: 0,
    onLeave: 0,
    inactive: 0,
  });
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  
  // Admin emails - in a real app, this would be stored in a database
  const adminEmails = ["admin@example.com"];
  const isAdmin = currentUser && adminEmails.includes(currentUser.email || "");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/students");
        const students: Student[] = response.data;

        // Count total students
        setStudentCount(students.length);

        // Count by course
        const courseData: CourseCounts = {};
        students.forEach((student) => {
          courseData[student.course] = (courseData[student.course] || 0) + 1;
        });
        setCourseCounts(courseData);

        // Count by status
        const statusData: StatusCounts = {
          active: 0,
          onLeave: 0,
          inactive: 0,
        };
        students.forEach((student) => {
          if (student.status === "Active") statusData.active++;
          else if (student.status === "On Leave") statusData.onLeave++;
          else if (student.status === "Inactive") statusData.inactive++;
        });
        setStatusCounts(statusData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Simplified Hero Section */}
      <div className="relative rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="relative p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
                  Welcome to Student Hub
                </h1>
                <p className="text-lg mt-2 text-muted-foreground max-w-2xl">
                  The comprehensive student management platform that simplifies administration 
                  and helps you focus on what matters most — student success.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                <div className="flex items-start space-x-4 p-4 bg-white/80 dark:bg-gray-900/80 rounded-lg border border-gray-200/50 dark:border-gray-800/50">
                  <Users className="h-8 w-8 text-blue-500" />
                  <div>
                    <h3 className="font-medium">Student Management</h3>
                    <p className="text-sm text-muted-foreground">Track and manage all student records in one place</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white/80 dark:bg-gray-900/80 rounded-lg border border-gray-200/50 dark:border-gray-800/50">
                  <BarChart className="h-8 w-8 text-purple-500" />
                  <div>
                    <h3 className="font-medium">Performance Tracking</h3>
                    <p className="text-sm text-muted-foreground">Analyze performance with advanced analytics</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white/80 dark:bg-gray-900/80 rounded-lg border border-gray-200/50 dark:border-gray-800/50">
                  <BookOpen className="h-8 w-8 text-green-500" />
                  <div>
                    <h3 className="font-medium">Course Management</h3>
                    <p className="text-sm text-muted-foreground">Organize and assign courses efficiently</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white/80 dark:bg-gray-900/80 rounded-lg border border-gray-200/50 dark:border-gray-800/50">
                  <Clock className="h-8 w-8 text-amber-500" />
                  <div>
                    <h3 className="font-medium">Attendance Tracking</h3>
                    <p className="text-sm text-muted-foreground">Monitor student attendance in real-time</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link to="/students">
                    Browse Students
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                {currentUser && (
                  <Button variant="outline" asChild>
                    <Link to="/add-student">
                      Add New Student
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
                {isAdmin && (
                  <Button variant="secondary" asChild>
                    <Link to="/admin">
                      Admin Dashboard
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            
            <div className="hidden md:block relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20"></div>
              <div className="absolute inset-2 bg-white/20 dark:bg-gray-800/20 rounded-full border border-white/30 dark:border-gray-700/30 p-4">
                <svg 
                  className="h-full w-full text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Stats Section */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">System Overview</h2>
        <p className="text-muted-foreground mb-6">
          Real-time insights into your student management system
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="skeleton h-7 w-20" />
            ) : (
              <div className="text-3xl font-bold">{studentCount}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="skeleton h-7 w-20" />
            ) : (
              <div className="text-3xl font-bold">{statusCounts.active}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              On Leave
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="skeleton h-7 w-20" />
            ) : (
              <div className="text-3xl font-bold">{statusCounts.onLeave}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Inactive
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="skeleton h-7 w-20" />
            ) : (
              <div className="text-3xl font-bold">{statusCounts.inactive}</div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Enrollment by Course</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {Array(4)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className="skeleton h-4 w-full" />
                  ))}
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(courseCounts).map(([course, count]) => (
                  <div key={course} className="flex items-center gap-4">
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{course}</span>
                        <span className="text-sm text-muted-foreground">
                          {count} students
                        </span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{
                            width: `${(count / studentCount) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link
              to="/students"
              className="block p-4 border rounded-lg hover:bg-muted/50 transition-all"
            >
              <div className="font-medium flex items-center">
                <Users className="h-4 w-4 mr-2 text-blue-500" />
                View All Students
                <ChevronRight className="ml-auto h-4 w-4" />
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Browse and manage the complete student directory
              </div>
            </Link>
            <Link
              to="/add-student"
              className="block p-4 border rounded-lg hover:bg-muted/50 transition-all"
            >
              <div className="font-medium flex items-center">
                <Award className="h-4 w-4 mr-2 text-green-500" />
                Add New Student
                <ChevronRight className="ml-auto h-4 w-4" />
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Register a new student to the system
              </div>
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="block p-4 border rounded-lg hover:bg-muted/50 transition-all"
              >
                <div className="font-medium flex items-center">
                  <BarChart className="h-4 w-4 mr-2 text-purple-500" />
                  Admin Dashboard
                  <ChevronRight className="ml-auto h-4 w-4" />
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Access advanced system controls and settings
                </div>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
