import { useContext } from "react";
import { ExamWizardContext } from "../context/ExamWizardContext";

export function useExamWizardContext() {
  const context = useContext(ExamWizardContext);

  if (context === undefined) {
    throw new Error(
      "useExamWizardContext must be used within an ExamWizardProvider",
    );
  }

  return context;
}
