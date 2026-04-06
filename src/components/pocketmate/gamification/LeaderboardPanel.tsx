"use client";

import { PMCard } from "@/components/pocketmate/PMCard";
import { rankRows } from "@/data/gamification/mockLeaderboard";
import { useGamificationStore } from "@/store/gamification/useGamificationStore";
import { useLearnStore } from "@/store/learn/useLearnStore";
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export function LeaderboardPanel() {
  const learnXp = useLearnStore((s) => s.xp);
  const activityXp = useGamificationStore((s) => s.activityXp);
  const streakDays = useGamificationStore((s) => s.streakDays);
  const paperTrades = useGamificationStore((s) => s.paperTradesCount);
  const backtests = useGamificationStore((s) => s.backtestsRun);

  const ranked = rankRows({
    displayName: "You (this device)",
    university: "Local profile",
    inputs: {
      learnXp,
      activityXp,
      streakDays,
      paperTrades,
      backtests,
    },
  });

  return (
    <PMCard>
      <Text fontWeight="semibold" color="pm.text" mb={2}>
        Demo leaderboard
      </Text>
      <Text fontSize="sm" color="pm.muted" mb={4}>
        Mock cohort plus your local score: XP + activity + streak bonus +
        strategy index from Build / Trade placeholders. Server-backed leagues
        land in a later gate.
      </Text>
      <TableContainer>
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th color="pm.muted" borderColor="pm.border">
                #
              </Th>
              <Th color="pm.muted" borderColor="pm.border">
                Student
              </Th>
              <Th color="pm.muted" borderColor="pm.border">
                University
              </Th>
              <Th isNumeric color="pm.muted" borderColor="pm.border">
                Score
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {ranked.map((row) => (
              <Tr
                key={row.id}
                bg={row.isPlayer ? "pm.surfaceHover" : undefined}
                borderColor="pm.border"
              >
                <Td borderColor="pm.border" color="pm.text">
                  {row.rank}
                </Td>
                <Td borderColor="pm.border" color="pm.text">
                  <Box display="flex" alignItems="center" gap={2}>
                    {row.displayName}
                    {row.isPlayer ? (
                      <Text as="span" fontSize="xs" color="pm.primarySoft">
                        You
                      </Text>
                    ) : null}
                  </Box>
                </Td>
                <Td borderColor="pm.border" color="pm.muted" fontSize="sm">
                  {row.university}
                </Td>
                <Td
                  isNumeric
                  borderColor="pm.border"
                  color="pm.text"
                  fontWeight="medium"
                >
                  {row.score}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </PMCard>
  );
}
