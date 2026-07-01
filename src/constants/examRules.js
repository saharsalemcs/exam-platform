import { ShieldAlert, Clock, Wifi, FileCheck } from "lucide-react";

export const EXAM_RULES = [
  {
    category: "Academic Integrity",
    icon: ShieldAlert,
    color: "var(--color-danger)",
    items: [
      "Switching tabs or windows during the exam will be recorded and may result in disqualification.",
      "Do not open any other applications, browser tabs, or communicate with others during the exam.",
      "Any form of cheating will be reported to your instructor.",
    ],
  },
  {
    category: "Time & Submission",
    icon: Clock,
    color: "var(--color-warning)",
    items: [
      "The exam has a fixed time limit. Once started, the timer cannot be paused.",
      "If your time runs out, the exam will be submitted automatically.",
      "Once submitted, you cannot retake this exam.",
    ],
  },
  {
    category: "Technical Requirements",
    icon: Wifi,
    color: "var(--color-accent)",
    items: [
      "Ensure you have a stable internet connection before starting.",
      "Your answers are saved automatically as you progress.",
      "Refreshing the page will not lose your progress, but losing connection might.",
    ],
  },
  {
    category: "Before You Submit",
    icon: FileCheck,
    color: "var(--color-success)",
    items: [
      "Review all your answers using the question navigator before submitting.",
      "You can bookmark questions to revisit them later.",
      "Make sure every question is answered — unanswered questions are marked incorrect.",
    ],
  },
];
