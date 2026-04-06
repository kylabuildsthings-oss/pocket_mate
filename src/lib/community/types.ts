export type CommunityStrategyPost = {
  id: string;
  title: string;
  summary: string;
  author: string;
  university: string;
  /** Must match `STRATEGY_TEMPLATES` id for copy-to-build */
  templateId: string;
  simulatedSharpe: number;
  simulatedReturnPct: number;
  tag: string;
  updatedAt: string;
};

export type CommunityComment = {
  id: string;
  strategyId: string;
  parentId: string | null;
  author: string;
  body: string;
  score: number;
  createdAt: number;
};

export type ReportPayload = {
  targetType: "strategy" | "comment";
  targetId: string;
  reason: string;
};
