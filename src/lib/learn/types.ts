export type GlossaryCategory =
  | "basics"
  | "assets"
  | "protocols"
  | "risk"
  | "pocketmate";

export type GlossaryTerm = {
  id: string;
  term: string;
  short: string;
  definition: string;
  category: GlossaryCategory;
};

export type LessonBlock =
  | { type: "p"; segments: LessonSegment[] }
  | { type: "list"; items: string[] };

export type LessonSegment =
  | { kind: "text"; value: string }
  | { kind: "term"; termId: string; label: string };

export type Lesson = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  estMinutes: number;
  order: number;
  blocks: LessonBlock[];
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: string[];
  /** Zero-based index of correct choice */
  correctIndex: number;
};

export type LessonQuiz = {
  lessonId: string;
  passPct: number;
  xpReward: number;
  questions: QuizQuestion[];
};
