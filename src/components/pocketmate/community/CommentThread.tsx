"use client";

import {
  COMMENT_COOLDOWN_MS,
  COMMENT_MAX_LEN,
} from "@/lib/community/moderation";
import { useCommunityStore } from "@/store/community/useCommunityStore";
import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { MdReply, MdThumbDown, MdThumbUp } from "react-icons/md";
import { ReportAbuseModal } from "./ReportAbuseModal";

export function CommentThread({ strategyId }: { strategyId: string }) {
  const comments = useCommunityStore((s) => s.comments);
  const commentVotes = useCommunityStore((s) => s.commentVotes);
  const addComment = useCommunityStore((s) => s.addComment);
  const voteComment = useCommunityStore((s) => s.voteComment);

  const [body, setBody] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const thread = useMemo(
    () => comments.filter((c) => c.strategyId === strategyId),
    [comments, strategyId]
  );

  const tops = thread
    .filter((c) => c.parentId === null)
    .sort((a, b) => a.createdAt - b.createdAt);

  const submit = () => {
    setError(null);
    const r = addComment(strategyId, body, replyTo);
    if (!r.ok) {
      setError(r.reason);
      return;
    }
    setBody("");
    setReplyTo(null);
  };

  return (
    <VStack align="stretch" spacing={4}>
      <Flex align="center" justify="space-between" flexWrap="wrap" gap={2}>
        <Text fontWeight="semibold" color="pm.text">
          Discussion
        </Text>
        <Text fontSize="xs" color="pm.muted">
          {COMMENT_COOLDOWN_MS / 1000}s cooldown · {COMMENT_MAX_LEN} char max ·
          one reply depth
        </Text>
      </Flex>

      {tops.length === 0 ? (
        <Text fontSize="sm" color="pm.muted">
          No comments yet—start the thread.
        </Text>
      ) : (
        <VStack align="stretch" spacing={4}>
          {tops.map((c) => (
            <Box key={c.id}>
              <CommentCard
                c={c}
                onVote={voteComment}
                userVote={commentVotes[c.id]}
                onReply={() => {
                  setReplyTo(c.id);
                }}
              />
              {thread
                .filter((r) => r.parentId === c.id)
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((r) => (
                  <Box
                    key={r.id}
                    pl={6}
                    mt={3}
                    borderLeftWidth="2px"
                    borderColor="pm.border"
                  >
                    <CommentCard
                      c={r}
                      onVote={voteComment}
                      userVote={commentVotes[r.id]}
                      onReply={() => undefined}
                      isReply
                    />
                  </Box>
                ))}
              <Divider borderColor="pm.border" mt={4} />
            </Box>
          ))}
        </VStack>
      )}

      {replyTo ? (
        <Text fontSize="xs" color="pm.primarySoft">
          Replying to thread ·{" "}
          <Button size="xs" variant="link" onClick={() => setReplyTo(null)}>
            cancel
          </Button>
        </Text>
      ) : null}

      {error ? (
        <Text fontSize="sm" color="orange.300">
          {error}
        </Text>
      ) : null}

      <Textarea
        placeholder={replyTo ? "Write a reply…" : "Add a thoughtful comment…"}
        value={body}
        onChange={(e) => setBody(e.target.value.slice(0, COMMENT_MAX_LEN))}
        rows={3}
        bg="pm.surface"
        borderColor="pm.border"
        color="pm.text"
      />
      <Box display="flex" flexWrap="wrap" gap={2}>
        <Button
          colorScheme="purple"
          size="sm"
          onClick={submit}
          isDisabled={!body.trim()}
        >
          {replyTo ? "Post reply" : "Post comment"}
        </Button>
        {replyTo ? (
          <Button size="sm" variant="ghost" onClick={() => setReplyTo(null)}>
            Cancel reply
          </Button>
        ) : null}
      </Box>
    </VStack>
  );
}

function CommentCard({
  c,
  onVote,
  userVote,
  onReply,
  isReply,
}: {
  c: {
    id: string;
    author: string;
    body: string;
    score: number;
    createdAt: number;
  };
  onVote: (id: string, dir: "up" | "down") => void;
  userVote?: "up" | "down";
  onReply: () => void;
  isReply?: boolean;
}) {
  return (
    <Box>
      <Flex justify="space-between" align="start" gap={3}>
        <Box flex="1">
          <Text fontSize="sm" fontWeight="semibold" color="pm.text">
            {c.author}{" "}
            <Text as="span" fontSize="xs" color="pm.muted" fontWeight="normal">
              · {new Date(c.createdAt).toLocaleString()}
            </Text>
          </Text>
          <Text fontSize="sm" color="pm.muted" mt={1} whiteSpace="pre-wrap">
            {c.body}
          </Text>
        </Box>
        <VStack spacing={1}>
          <Flex align="center" gap={1}>
            <IconButton
              aria-label="Upvote"
              icon={<MdThumbUp />}
              size="xs"
              variant={userVote === "up" ? "solid" : "ghost"}
              colorScheme="purple"
              onClick={() => onVote(c.id, "up")}
              isDisabled={userVote === "up"}
            />
            <Text fontSize="xs" color="pm.text" minW="6" textAlign="center">
              {c.score}
            </Text>
            <IconButton
              aria-label="Downvote"
              icon={<MdThumbDown />}
              size="xs"
              variant={userVote === "down" ? "solid" : "ghost"}
              colorScheme="purple"
              onClick={() => onVote(c.id, "down")}
              isDisabled={userVote === "down"}
            />
          </Flex>
          {isReply ? (
            <ReportAbuseModal
              targetType="comment"
              targetId={c.id}
              label="Report"
            />
          ) : (
            <Box display="flex" gap={1} alignItems="center">
              <IconButton
                aria-label="Reply"
                icon={<MdReply />}
                size="xs"
                variant="ghost"
                onClick={onReply}
              />
              <ReportAbuseModal
                targetType="comment"
                targetId={c.id}
                label="Report"
              />
            </Box>
          )}
        </VStack>
      </Flex>
    </Box>
  );
}
