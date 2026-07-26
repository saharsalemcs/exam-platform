export const instructorStudentsColumns = [
  {
    key: "name",
    label: "Name",
    render: (s) => <span className="font-medium text-text">{s.full_name}</span>,
  },
  {
    key: "email",
    label: "Email",
    render: (s) => <span className="text-text-muted">{s.email}</span>,
  },
  {
    key: "grade",
    label: "Grade",
    render: (s) => <span className="text-text">{s.grade ?? "—"}</span>,
  },
  {
    key: "department",
    label: "Department",
    render: (s) => <span className="text-text">{s.department ?? "—"}</span>,
  },
  {
    key: "exams",
    label: "Exams",
    render: (s) => <span className="text-text">{s.exams_count}</span>,
  },
  {
    key: "avgScore",
    label: "Avg Score",
    render: (s) => <span className="text-text">{s.avg_score}%</span>,
  },
  {
    key: "highest",
    label: "Highest",
    render: (s) => <span className="text-text">{s.highest_score}%</span>,
  },
  {
    key: "passRate",
    label: "Pass Rate",
    render: (s) => <span className="text-text">{s.pass_rate}%</span>,
  },
];
