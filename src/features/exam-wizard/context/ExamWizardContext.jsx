import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const ExamWizardContext = createContext();

function ExamWizardProvider({
  children,
  initialQuestions = [],
  initialExam = {},
}) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [examDetails, setExamDetails] = useState(initialExam);
  const [questionType, setQuestionType] = useState("mcq");
  const [editingQuestionId, setEditingQuestionId] = useState(null);

  const isEditMode = Boolean(initialExam?.id);

  // Question Actions
  function handleAddQuestion(questionData) {
    if (editingQuestionId) {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === editingQuestionId ? { ...questionData, id: q.id } : q,
        ),
      );
      setEditingQuestionId(null);
    } else {
      setQuestions((prev) => [
        ...prev,
        { ...questionData, id: crypto.randomUUID() },
      ]);
    }
  }

  function handleDelete(id) {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    toast.success("Question deleted successfully!");
  }

  // Exam Actions
  function handleExamDetails(details) {
    setExamDetails(details);
  }

  function clearExamData() {
    setQuestions([]);
    setExamDetails({});
  }

  function handleEdit(id) {
    const questionToEdit = questions.find((q) => q.id === id);
    if (questionToEdit) {
      setQuestionType(questionToEdit.type);
      setEditingQuestionId(id);
      setTimeout(() => {
        const element = document.getElementById("main-content");
        if (element) {
          element.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 10);
    }
  }

  return (
    <ExamWizardContext.Provider
      value={{
        questions,
        handleAddQuestion,
        clearExamData,
        examDetails,
        handleDelete,
        handleExamDetails,
        questionType,
        setQuestionType,
        handleEdit,
        isEditMode,
        editingQuestionId,
        setEditingQuestionId,
      }}
    >
      {children}
    </ExamWizardContext.Provider>
  );
}

export default ExamWizardProvider;
