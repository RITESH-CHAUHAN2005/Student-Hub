
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface StudentCardProps {
  id: string;
  name: string;
  email: string;
  course: string;
  enrollmentDate: string;
  gpa: number;
  avatarUrl: string;
  status: string;
}

const StudentCard: React.FC<StudentCardProps> = ({
  id,
  name,
  email,
  course,
  enrollmentDate,
  gpa,
  avatarUrl,
  status,
}) => {
  const statusVariant = status === "Active" 
    ? "default" 
    : status === "On Leave" 
      ? "outline" 
      : "destructive";

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <Avatar className="h-16 w-16 border-2 border-muted">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Badge variant={statusVariant}>{status}</Badge>
        </div>
        <CardTitle className="mt-4 text-xl">{name}</CardTitle>
        <CardDescription className="truncate">{email}</CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Course:</dt>
            <dd className="font-medium">{course}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Enrolled:</dt>
            <dd className="font-medium">
              {new Date(enrollmentDate).toLocaleDateString()}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">GPA:</dt>
            <dd className="font-medium">{gpa}</dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter>
        <Link to={`/students/${id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default StudentCard;
