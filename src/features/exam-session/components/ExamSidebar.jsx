import QuestionMap from "./QuestionMap";

function ExamSidebar({ session }) {
  return (
    <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
      <QuestionMap session={session} />
    </aside>
  );
}

export default ExamSidebar;
