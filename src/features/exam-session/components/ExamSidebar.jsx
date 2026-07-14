import CountdownTimer from "./CountdownTimer";

function ExamSidebar({ session }) {
  return (
    <aside className="flex flex-col gap-md">
      <CountdownTimer timeLeft={session.timeLeft} />
    </aside>
  );
}

export default ExamSidebar;
