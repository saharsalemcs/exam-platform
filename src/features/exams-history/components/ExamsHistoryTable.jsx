import ExamTableRow from "./ExamTableRow";

const COLUMNS = [
  "Exam Title",
  "Instructor",
  "Difficulty",
  "Score",
  "Status",
  "Time",
  "Submitted At",
  "Actions",
];
function TableHeaderCell({ label }) {
  return (
    <th
      className="px-lg py-md text-xs font-bold tracking-wider whitespace-nowrap uppercase"
      style={{ color: "var(--color-primary)" }}
    >
      {label}
    </th>
  );
}

function ExamsHistoryTable({ exams }) {
  return (
    <div
      className="overflow-x-auto rounded-md"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
      <table className="w-full min-w-[900px] border-collapse text-left">
        <thead>
          <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
            {COLUMNS.map((label) => (
              <TableHeaderCell key={label} label={label} />
            ))}
          </tr>
        </thead>

        <tbody>
          {exams.map((attempt) => (
            <ExamTableRow key={attempt.id} attempt={attempt} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExamsHistoryTable;
