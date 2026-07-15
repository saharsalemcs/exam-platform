import CountdownTimer from "./CountdownTimer";
import QuestionMap from "./QuestionMap";

function ExamSidebar({ session }) {
  return (
    <aside className="flex flex-col gap-md">
      <CountdownTimer timeLeft={session.timeLeft} />
      <QuestionMap session={session} />
    </aside>
  );
}

export default ExamSidebar;
