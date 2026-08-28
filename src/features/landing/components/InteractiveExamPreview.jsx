import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  ArrowRight,
  Award,
  Zap,
} from "lucide-react";

export default function InteractiveExamPreview() {
  const demoQuestions = [
    {
      id: 1,
      question:
        "Which data structure is primarily utilized by database engines to implement B-Tree indexing for logarithmic search and range queries?",
      options: [
        { id: 0, text: "Unsorted Linked List" },
        { id: 1, text: "Self-balancing Multi-way Search Tree (B/B+ Tree)" },
        { id: 2, text: "Static Hash Table with linear probing only" },
        { id: 3, text: "FIFO Queue" },
      ],
      correctIndex: 1,
      explanation:
        "B-Trees maintain sorted data with logarithmic search, insertion, and deletion complexity while minimizing disk I/O operations.",
    },
    {
      id: 2,
      question:
        "True or False: EduTest allows instructors to create exams with custom passing scores and automatic grading calculation.",
      options: [
        { id: 0, text: "True — Automated grading with immediate diagnostic insights" },
        { id: 1, text: "False — Only manual spreadsheet grading is supported" },
      ],
      correctIndex: 0,
      explanation:
        "EduTest provides full automated evaluation for multiple choice, True/False, and question weighting.",
    },
  ];

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQ = demoQuestions[currentQuestionIdx];

  const handleSelectOption = (optionId) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIdx]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < demoQuestions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setIsSubmitted(false);
  };

  // Calculate score
  const correctCount = demoQuestions.reduce((acc, q, idx) => {
    return selectedAnswers[idx] === q.correctIndex ? acc + 1 : acc;
  }, 0);
  const scorePercent = Math.round((correctCount / demoQuestions.length) * 100);

  return (
    <section id="live-demo" className="relative py-20 sm:py-28 border-t border-border/70">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-4">
            <Sparkles size={13} />
            Experience It Now
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text">
            Test Drive the Student Exam Engine
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-muted leading-relaxed">
            Try this 2-question interactive live assessment right now. Experience how smooth, fast,
            and responsive EduTest feels in real time.
          </p>
        </div>

        {/* Interactive Demo Box */}
        <div className="mt-12 rounded-3xl border border-border bg-surface p-6 sm:p-9 shadow-2xl relative overflow-hidden">
          {/* Top Bar inside Demo Box */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5 mb-6">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 rounded-full bg-success animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-text">
                Interactive Assessment Simulation
              </span>
              <span className="rounded-md bg-surface-2 px-2 py-0.5 text-xs font-mono text-primary border border-primary/20">
                Demo Mode
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-surface-2 px-3 py-1 text-xs font-mono text-text-muted border border-border">
                <Clock size={14} className="text-primary" />
                <span>00:04:59</span>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-text-muted hover:text-text cursor-pointer transition-colors"
                title="Reset test"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {!isSubmitted ? (
            /* Active Question State */
            <div className="space-y-6">
              {/* Question Progress Header */}
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span className="font-semibold text-text">
                  Question {currentQuestionIdx + 1} of {demoQuestions.length}
                </span>
                <span className="font-mono text-primary font-medium">5.0 Points</span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full rounded-full bg-surface-2 overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIdx + 1) / demoQuestions.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question Text */}
              <h3 className="text-base sm:text-lg font-medium text-text leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedAnswers[currentQuestionIdx] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full flex items-center justify-between rounded-xl border p-4 text-left text-xs sm:text-sm transition-all cursor-pointer ${
                        isSelected
                          ? "border-primary bg-primary/10 text-text shadow-sm"
                          : "border-border bg-surface-2/60 text-text-muted hover:border-border/80 hover:text-text hover:bg-surface-2"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                            isSelected
                              ? "bg-primary text-bg"
                              : "bg-surface text-text-muted border border-border"
                          }`}
                        >
                          {String.fromCharCode(65 + opt.id)}
                        </span>
                        <span className="leading-snug">{opt.text}</span>
                      </div>
                      {isSelected && <CheckCircle2 size={18} className="text-primary shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>

              {/* Bottom Action bar */}
              <div className="flex items-center justify-between border-t border-border pt-5">
                <button
                  onClick={() => setCurrentQuestionIdx((p) => Math.max(0, p - 1))}
                  disabled={currentQuestionIdx === 0}
                  className="rounded-xl border border-border bg-surface-2 px-4 py-2 text-xs font-medium text-text-muted hover:text-text disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQuestionIdx] === undefined}
                  className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-xs sm:text-sm font-semibold text-bg hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all active:scale-[0.98]"
                >
                  <span>
                    {currentQuestionIdx === demoQuestions.length - 1 ? "Submit Exam" : "Next Question"}
                  </span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ) : (
            /* Result Submission Feedback */
            <div className="text-center py-6 animate-fade-scale">
              <div
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 text-primary mb-4"
                style={{ boxShadow: "0 0 24px rgba(212, 175, 88, 0.2)" }}
              >
                <Award size={36} />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-text">
                Assessment Completed!
              </h3>
              <p className="mt-2 text-sm text-text-muted">
                EduTest automatically evaluated your answers in <span className="text-success font-mono">0.08 seconds</span>.
              </p>

              {/* Score Display Card */}
              <div className="mt-6 mx-auto max-w-sm rounded-2xl border border-border bg-surface-2 p-5 text-center">
                <div className="text-xs text-text-faint uppercase tracking-wider font-semibold">
                  Your Final Score
                </div>
                <div className="mt-1 font-mono text-4xl font-bold text-primary">
                  {scorePercent}%
                </div>
                <div className="mt-1 text-xs text-text-muted">
                  {correctCount} out of {demoQuestions.length} Questions Correct •{" "}
                  <span className={scorePercent >= 50 ? "text-success font-semibold" : "text-danger"}>
                    {scorePercent >= 50 ? "PASSED" : "NEEDS REVIEW"}
                  </span>
                </div>
              </div>

              {/* CTA to Register */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/register"
                  className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-bg hover:bg-primary/90 transition-all cursor-pointer"
                >
                  <span>Create Real Exam on EduTest</span>
                  <ArrowRight size={16} />
                </Link>
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-border bg-surface-2 px-5 py-3 text-sm font-medium text-text hover:bg-surface-2/80 cursor-pointer"
                >
                  Try Demo Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
