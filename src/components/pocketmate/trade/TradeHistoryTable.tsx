"use client";

import { PMTable } from "@/components/pocketmate/PMTable";
import { PMBadge } from "@/components/pocketmate/PMBadge";
import { useTradeStore } from "@/store/trade/useTradeStore";
import { Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

export function TradeHistoryTable() {
  const history = useTradeStore((s) => s.history);

  return (
    <>
      <Text fontWeight="semibold" color="pm.text" mb={3}>
        Activity & receipts
      </Text>
      <PMTable>
        <Thead>
          <Tr>
            <Th color="pm.muted">When</Th>
            <Th color="pm.muted">Surface</Th>
            <Th color="pm.muted">Mode / context</Th>
            <Th color="pm.muted">In → Out</Th>
            <Th color="pm.muted">Receipt</Th>
          </Tr>
        </Thead>
        <Tbody>
          {history.length === 0 ? (
            <Tr>
              <Td colSpan={5} color="pm.muted" py={8}>
                No simulated activity yet. Run a swap, stake, or liquidity
                action to generate receipts.
              </Td>
            </Tr>
          ) : (
            history.map((h) => (
              <Tr key={h.id}>
                <Td color="pm.text" fontSize="xs">
                  {new Date(h.createdAt).toLocaleString()}
                </Td>
                <Td>
                  <PMBadge tone="primary">{h.surface}</PMBadge>
                </Td>
                <Td fontSize="xs" color="pm.muted">
                  {h.mode} · {h.dataContext}
                </Td>
                <Td fontSize="sm" color="pm.text">
                  {h.amountIn} {h.tokenIn} → {h.amountOut} {h.tokenOut}
                </Td>
                <Td
                  fontSize="xs"
                  color="pm.muted"
                  fontFamily="mono"
                  maxW="200px"
                  isTruncated
                  title={h.receiptHash}
                >
                  {h.receiptHash}
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </PMTable>
    </>
  );
}
