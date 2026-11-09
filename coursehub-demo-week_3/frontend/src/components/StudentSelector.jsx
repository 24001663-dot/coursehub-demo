
function StudentSelector({ studentId, onStudentChange }) {
  const students = [
    "22000001",
    "22000002",
    "22000003",
    "22000004",
  ];

  return (
    <section className="student-selector">
      <label htmlFor="student">Chọn sinh viên:</label>

      <select
        id="student"
        value={studentId}
        onChange={(event) => onStudentChange(event.target.value)}
      >
        {students.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
    </section>
  );
}

export default StudentSelector;
