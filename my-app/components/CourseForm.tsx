export default function CourseForm({ grade, credits, setGrade, setCredits }) {
  type Grade = {
    name: string;
    value: number;
  };

  const grades: Grade[] = [
    { name: 'A', value: 4.0 },
    { name: 'A-', value: 3.67 },
    { name: 'B+', value: 3.33 },
    { name: 'B', value: 3.0 },
    { name: 'B-', value: 2.67 },
    { name: 'C+', value: 2.33 },
    { name: 'C', value: 2.0 },
    { name: 'C-', value: 1.67 },
    { name: 'D+', value: 1.33 },
    { name: 'D', value: 1.0 },
    { name: 'F', value: 0.0 },
    { name: 'Q', value: 0.0 },
  ];

  return (
    <div>
      <select name="grade" value={grade} onChange={(e) => setGrade(Number(e.target.value))}>
        {grades.map((g) => (
          <option key={g.name} value={g.value}>
            {`${g.name} (${g.value.toFixed(2)})`}
          </option>
        ))}
      </select>
      <input
        type="number"
        step="0.5"
        min="0"
        max="10"
        value={credits}
        onChange={(e) => setCredits(Number(e.target.value))}
      />
    </div>
  );
}
