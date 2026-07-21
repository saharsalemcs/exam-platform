import { createContext, useState } from "react";

export const ExamWizardContext = createContext();

function ExamWizardProvider({
  children,
  initialQuestions = [],
  initialExam = {},
}) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [examDetails, setExamDetails] = useState(initialExam);

  // Question Actions
  function handleAddQuestion(questionData) {
    setQuestions((prev) => [
      ...prev,
      { ...questionData, id: crypto.randomUUID() },
    ]);
  }

  function handleDeleteQuestion(id) {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    // toast.success("Question deleted successfully!");
  }

  // Exam Actions
  function handleExamDetails(details) {
    setExamDetails(details);
  }

  function clearExamData() {
    setQuestions([]);
    setExamDetails({});
  }

  return (
    <ExamWizardContext.Provider
      value={{
        questions,
        handleAddQuestion,
        clearExamData,
        examDetails,
        handleDeleteQuestion,
        handleExamDetails,
      }}
    >
      {children}
    </ExamWizardContext.Provider>
  );
}

export default ExamWizardProvider;
