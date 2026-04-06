import { templateById } from "@/data/build/strategyTemplates";
import type { CommunityStrategyPost } from "@/lib/community/types";
import { useBuildStore } from "@/store/build/useBuildStore";

export function copyFeedStrategyToLibrary(
  post: CommunityStrategyPost
): { ok: true; strategyId: string } | { ok: false; reason: string } {
  if (!templateById(post.templateId)) {
    return { ok: false, reason: "Template is not available in Build yet." };
  }
  const saved = useBuildStore.getState().saveStrategy({
    name: `Fork: ${post.title}`,
    templateId: post.templateId,
    notes: `Forked from community · ${post.author} (${post.university})\n${post.summary}`,
    risk: "med",
    timeframe: "1h",
  });
  return { ok: true, strategyId: saved.id };
}
