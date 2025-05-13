
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";

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

const AdminDashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Admin emails - in a real app, this would be stored in a database
  const adminEmails = ["admin@example.com"];
  const isAdmin = currentUser && adminEmails.includes(currentUser.email || "");

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }

    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await api.get("/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [isAdmin, navigate]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      // In a real app, this would update the student status in the database
      // For now, we'll just update the local state
      setStudents(students.map(student => 
        student.id === id ? {...student, status: newStatus} : student
      ));
    } catch (error) {
      console.error("Error updating student status:", error);
    }
  };

  const handleDeleteStudent = async (id: string) => {
    try {
      // In a real app, this would delete the student from the database
      // For now, we'll just update the local state
      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage students, courses, and system settings
        </p>
      </div>

      <Tabs defaultValue="students">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="students" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Student Management</h2>
            <Button onClick={() => navigate("/add-student")}>Add New Student</Button>
          </div>

          {loading ? (
            <div className="text-center py-10">Loading students...</div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Email</th>
                    <th className="text-left p-3">Course</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-t">
                      <td className="p-3">{student.name}</td>
                      <td className="p-3">{student.email}</td>
                      <td className="p-3">{student.course}</td>
                      <td className="p-3">
                        <select 
                          value={student.status}
                          onChange={(e) => handleStatusChange(student.id, e.target.value)}
                          className="p-1 border rounded"
                        >
                          <option value="Active">Active</option>
                          <option value="On Leave">On Leave</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </td>
                      <td className="p-3 flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/students/${student.id}`)}
                        >
                          View
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="courses" className="space-y-4">
          <h2 className="text-xl font-semibold">Course Management</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Computer Science</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Active Students: {students.filter(s => s.course === "Computer Science" && s.status === "Active").length}</p>
                <p>Credit Hours: 120</p>
                <div className="flex justify-end mt-4">
                  <Button variant="outline">Manage Course</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Business Administration</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Active Students: {students.filter(s => s.course === "Business Administration" && s.status === "Active").length}</p>
                <p>Credit Hours: 110</p>
                <div className="flex justify-end mt-4">
                  <Button variant="outline">Manage Course</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Psychology</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Active Students: {students.filter(s => s.course === "Psychology" && s.status === "Active").length}</p>
                <p>Credit Hours: 115</p>
                <div className="flex justify-end mt-4">
                  <Button variant="outline">Manage Course</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Engineering</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Active Students: {students.filter(s => s.course === "Engineering" && s.status === "Active").length}</p>
                <p>Credit Hours: 130</p>
                <div className="flex justify-end mt-4">
                  <Button variant="outline">Manage Course</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <h2 className="text-xl font-semibold">System Settings</h2>
          <Card>
            <CardHeader>
              <CardTitle>Admin Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Current Admins</h4>
                <ul className="list-disc pl-5">
                  <li>admin@example.com</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Add New Admin</h4>
                <div className="flex gap-2">
                  <input type="email" placeholder="Email" className="px-3 py-2 border rounded flex-1" />
                  <Button>Add</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Database Backup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Last backup: May 10, 2025 at 03:24 AM</p>
              <Button>Create Backup</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
