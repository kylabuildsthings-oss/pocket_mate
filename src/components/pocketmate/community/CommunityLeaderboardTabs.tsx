"use client";

import {
  MOCK_LEADERBOARD_ROWS,
  rankRows,
} from "@/data/gamification/mockLeaderboard";
import {
  universityLeaderboard,
  studentLeaderboard,
} from "@/lib/community/universityBoard";
import { useGamificationStore } from "@/store/gamification/useGamificationStore";
import { useLearnStore } from "@/store/learn/useLearnStore";
import { PMTable } from "@/components/pocketmate/PMTable";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { PMTabs } from "../PMTabs";

export function CommunityLeaderboardTabs() {
  const learnXp = useLearnStore((s) => s.xp);
  const activityXp = useGamificationStore((s) => s.activityXp);
  const streakDays = useGamificationStore((s) => s.streakDays);
  const paperTrades = useGamificationStore((s) => s.paperTradesCount);
  const backtests = useGamificationStore((s) => s.backtestsRun);

  const player = {
    displayName: "You (this device)",
    university: "Local profile",
    inputs: { learnXp, activityXp, streakDays, paperTrades, backtests },
  };

  const rankedStudents = rankRows(player);
  const uniRows = universityLeaderboard(MOCK_LEADERBOARD_ROWS);
  const cohortOnly = studentLeaderboard(MOCK_LEADERBOARD_ROWS);

  return (
    <PMTabs>
      <TabList>
        <Tab>Students</Tab>
        <Tab>Universities</Tab>
        <Tab>Cohort (mock)</Tab>
      </TabList>
      <TabPanels>
        <TabPanel px={0} pt={4}>
          <Text fontSize="sm" color="pm.muted" mb={3}>
            Your local score merged into a mock cohort—same model as Profile.
          </Text>
          <PMTable>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th color="pm.muted">#</Th>
                  <Th color="pm.muted">Student</Th>
                  <Th color="pm.muted">University</Th>
                  <Th isNumeric color="pm.muted">
                    Score
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {rankedStudents.map((row) => (
                  <Tr
                    key={row.id}
                    bg={row.isPlayer ? "pm.surfaceHover" : undefined}
                  >
                    <Td color="pm.text">{row.rank}</Td>
                    <Td color="pm.text">
                      {row.displayName}
                      {row.isPlayer ? (
                        <Text
                          as="span"
                          fontSize="xs"
                          color="pm.primarySoft"
                          ml={2}
                        >
                          You
                        </Text>
                      ) : null}
                    </Td>
                    <Td color="pm.muted" fontSize="sm">
                      {row.university}
                    </Td>
                    <Td isNumeric color="pm.text">
                      {row.score}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </PMTable>
        </TabPanel>
        <TabPanel px={0} pt={4}>
          <Text fontSize="sm" color="pm.muted" mb={3}>
            Average league score per institution across the mock cohort (not
            including your device).
          </Text>
          <PMTable>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th color="pm.muted">#</Th>
                  <Th color="pm.muted">University</Th>
                  <Th color="pm.muted">Top member</Th>
                  <Th isNumeric color="pm.muted">
                    Avg score
                  </Th>
                  <Th isNumeric color="pm.muted">
                    Members
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {uniRows.map((row, idx) => (
                  <Tr key={row.university}>
                    <Td color="pm.text">{idx + 1}</Td>
                    <Td color="pm.text" fontWeight="medium">
                      {row.university}
                    </Td>
                    <Td color="pm.muted" fontSize="sm">
                      {row.topMember}
                    </Td>
                    <Td isNumeric color="pm.text">
                      {row.score}
                    </Td>
                    <Td isNumeric color="pm.muted">
                      {row.memberCount}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </PMTable>
        </TabPanel>
        <TabPanel px={0} pt={4}>
          <Text fontSize="sm" color="pm.muted" mb={3}>
            Mock students only (no local merge)—useful for stable screenshots.
          </Text>
          <PMTable>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th color="pm.muted">#</Th>
                  <Th color="pm.muted">Student</Th>
                  <Th color="pm.muted">University</Th>
                  <Th isNumeric color="pm.muted">
                    Score
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {cohortOnly.map((row) => (
                  <Tr key={row.id}>
                    <Td color="pm.text">{row.rank}</Td>
                    <Td color="pm.text">{row.displayName}</Td>
                    <Td color="pm.muted" fontSize="sm">
                      {row.university}
                    </Td>
                    <Td isNumeric color="pm.text">
                      {row.score}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </PMTable>
        </TabPanel>
      </TabPanels>
    </PMTabs>
  );
}
