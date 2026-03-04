'use client';
import CourseForm from '@/components/CourseForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Course = {
  grade: number;
  credits: number;
};

export default function GPACalculatorPage() {
  const router = useRouter();
  const [courseGrade, setCourseGrade] = useState<number>(4.0);
  const [courseCredits, setCourseCredits] = useState<number>(3);
  const [courses, setCourses] = useState<Course[]>([]);
  const [gpa, setGpa] = useState<number | null>(null);

  const handleGoHome = () => {
    router.push('/home');
  };

  const handleAddCourse = () => {
    if (courseGrade !== null && courseCredits !== null) {
      setCourses([...courses, { grade: courseGrade, credits: courseCredits }]);
      // Reset form
      setCourseGrade(4.0);
      setCourseCredits(3);
    }
  };

  const handleCalculateGPA = () => {
    if (courses.length === 0) {
      alert('Please add at least one course');
      return;
    }

    const totalGradeCredits = courses.reduce(
      (sum, course) => sum + course.grade * course.credits,
      0,
    );
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    const calculatedGPA = totalGradeCredits / totalCredits;

    setGpa(calculatedGPA);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <main className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">GPA Calculator</h1>
            <h3 className="mt-2 text-xl text-gray-600">Calculate your GPA on a 4.0 scale</h3>
          </div>
          <button
            onClick={handleGoHome}
            className="rounded-md bg-blue-900 px-6 py-2 font-semibold text-white transition-all hover:bg-blue-800 active:scale-95"
          >
            Home
          </button>
        </div>

        <div className="">
          <p>
            Grade: {courseGrade} | Credits: {courseCredits}
          </p>
          {/* Pass both values and setters as props */}
          <CourseForm
            grade={courseGrade}
            credits={courseCredits}
            setGrade={setCourseGrade}
            setCredits={setCourseCredits}
          />
        </div>
        <div>
          <button
            onClick={handleAddCourse}
            className="mt-4 rounded bg-green-800 px-4 py-2 text-white"
          >
            + Add Course
          </button>
        </div>

        {/* Display added courses */}
        {courses.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Added Courses</h3>
            <table className="mt-4 w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Grade</th>
                  <th className="border border-gray-300 p-2">Credits</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{course.grade.toFixed(2)}</td>
                    <td className="border border-gray-300 p-2">{course.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={handleCalculateGPA}
              className="mt-4 rounded bg-green-800 px-4 py-2 text-white"
            >
              Calculate GPA
            </button>
          </div>
        )}

        {/* Display GPA result */}
        {gpa !== null && (
          <div className="mt-6 rounded border border-green-400 bg-green-100 p-4">
            <h2 className="text-2xl font-bold">Your GPA: {gpa.toFixed(2)}</h2>
          </div>
        )}
      </main>
    </div>
  );
}
