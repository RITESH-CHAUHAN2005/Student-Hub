
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Create a new instance of axios
const api = axios.create({
  baseURL: '/api',
});

// Create a mock adapter instance
const mock = new MockAdapter(api, { delayResponse: 1000 });

// Mock student data
const mockStudents = [
  {
    id: '1',
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    course: 'Computer Science',
    enrollmentDate: '2023-09-01',
    gpa: 3.8,
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Michael Smith',
    email: 'michael.smith@example.com',
    course: 'Business Administration',
    enrollmentDate: '2023-09-01',
    gpa: 3.5,
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Sarah Thompson',
    email: 'sarah.thompson@example.com',
    course: 'Psychology',
    enrollmentDate: '2023-08-15',
    gpa: 3.9,
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    status: 'Active',
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    course: 'Engineering',
    enrollmentDate: '2023-08-15',
    gpa: 3.7,
    avatarUrl: 'https://i.pravatar.cc/150?img=4',
    status: 'Active',
  },
  {
    id: '5',
    name: 'Jessica Brown',
    email: 'jessica.brown@example.com',
    course: 'Computer Science',
    enrollmentDate: '2023-08-01',
    gpa: 3.6,
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    status: 'On Leave',
  },
  {
    id: '6',
    name: 'Daniel Taylor',
    email: 'daniel.taylor@example.com',
    course: 'Business Administration',
    enrollmentDate: '2023-08-01',
    gpa: 3.3,
    avatarUrl: 'https://i.pravatar.cc/150?img=6',
    status: 'Active',
  },
  {
    id: '7',
    name: 'Amanda Garcia',
    email: 'amanda.garcia@example.com',
    course: 'Psychology',
    enrollmentDate: '2023-07-15',
    gpa: 3.9,
    avatarUrl: 'https://i.pravatar.cc/150?img=7',
    status: 'Active',
  },
  {
    id: '8',
    name: 'Robert Martinez',
    email: 'robert.martinez@example.com',
    course: 'Engineering',
    enrollmentDate: '2023-07-15',
    gpa: 3.2,
    avatarUrl: 'https://i.pravatar.cc/150?img=8',
    status: 'Inactive',
  }
];

// Available courses for filtering
export const availableCourses = [
  'All Courses',
  'Computer Science',
  'Business Administration',
  'Psychology',
  'Engineering',
];

// Mock GET endpoint for students
mock.onGet('/students').reply((config) => {
  const { course } = config.params || {};
  
  if (course && course !== 'All Courses') {
    return [200, mockStudents.filter(student => student.course === course)];
  }
  
  return [200, mockStudents];
});

// Mock POST endpoint for adding a student
mock.onPost('/students').reply((config) => {
  const newStudent = JSON.parse(config.data);
  
  // Add a new student with an id
  const studentWithId = {
    ...newStudent,
    id: (mockStudents.length + 1).toString(),
    avatarUrl: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    status: 'Active',
  };
  
  // Add to our mock data (would persist only for the current session)
  mockStudents.push(studentWithId);
  
  return [201, studentWithId];
});

// Mock GET endpoint for a specific student
mock.onGet(/\/students\/\d+/).reply((config) => {
  const id = config.url?.split('/').pop();
  const student = mockStudents.find(s => s.id === id);
  
  if (student) {
    return [200, student];
  }
  
  return [404, { message: 'Student not found' }];
});

// Export the API instance
export default api;
