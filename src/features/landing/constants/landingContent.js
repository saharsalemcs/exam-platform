import {
  ChartLine,
  CircleCheckBig,
  GraduationCap,
  ListChecks,
  ShieldAlert,
  SquarePen,
  Target,
  Timer,
  Users,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Who it's for", href: "#roles" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
];

export const HERO_FACTS = [
  { label: "Timed sessions", icon: Timer },
  { label: "Automatic scoring", icon: CircleCheckBig },
  { label: "Answer review", icon: ListChecks },
];

export const ROLE_CARDS = [
  {
    key: "student",
    title: "For students",
    icon: GraduationCap,
    description:
      "Everything you need to sit an exam and understand how you did.",
    accent: "primary",
    items: [
      "See only the exams assigned to your grade and department",
      "Take timed exams with answers saved automatically as you go",
      "Track progress with the question map and bookmark questions",
      "Get your score right after submitting, with a pass/fail result",
      "Review every question against the correct answer",
      "Follow your performance over time from your dashboard",
    ],
  },
  {
    key: "teacher",
    title: "For teachers",
    icon: SquarePen,
    description:
      "Build an exam, publish it to the right class, and review the results.",
    accent: "accent",
    items: [
      "Create exams in a guided three-step wizard",
      "Write multiple-choice and true/false questions with per-question marks",
      "Target each exam to a specific grade and department",
      "Set duration, availability window and pass percentage",
      "Move exams between draft, active and closed at any time",
      "Review every submission and per-student statistics",
    ],
  },
];

export const FEATURES = [
  {
    title: "Guided exam builder",
    icon: ListChecks,
    description:
      "Exam details, questions, then review and publish — a three-step wizard that keeps drafts editable until you're ready.",
  },
  {
    title: "Targeted delivery",
    icon: Target,
    description:
      "Each exam is published to one grade and department, so students only ever see the exams meant for them.",
  },
  {
    title: "Timed sessions that survive interruptions",
    icon: Timer,
    description:
      "The countdown and every answer are saved as the student works, so a refresh or dropped connection resumes where they left off.",
  },
  {
    title: "Integrity safeguards",
    icon: ShieldAlert,
    description:
      "Tab switches and window blur are detected, copy and developer shortcuts are blocked, and repeated violations end the attempt.",
  },
  {
    title: "Scoring on the server",
    icon: CircleCheckBig,
    description:
      "Attempts are graded by the database, and correct answers are never sent to the browser while an exam is in progress.",
  },
  {
    title: "Results and analytics",
    icon: ChartLine,
    description:
      "Question-by-question review, full submission history, and dashboards for students and teachers alike.",
  },
];

export const STEPS = [
  {
    number: 1,
    title: "Create your account",
    icon: Users,
    description:
      "Students sign up with email or Google and choose their grade and department. Teacher accounts are provisioned by the institution.",
  },
  {
    number: 2,
    title: "Publish or find an exam",
    icon: SquarePen,
    description:
      "Teachers build an exam in the wizard and set it active. Matching students see it in their available exams straight away.",
  },
  {
    number: 3,
    title: "Take it and review",
    icon: ChartLine,
    description:
      "Students sit the timed session, get scored on submission, then review each answer while teachers follow the results.",
  },
];
