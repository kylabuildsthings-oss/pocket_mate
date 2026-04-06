"use client";

import {
  Table,
  TableCaption,
  TableContainer,
  type TableContainerProps,
} from "@chakra-ui/react";

export type PMTableProps = TableContainerProps & {
  caption?: string;
};

export function PMTable({ caption, children, ...props }: PMTableProps) {
  return (
    <TableContainer
      borderWidth="1px"
      borderColor="pm.border"
      borderRadius="xl"
      bg="pm.surface"
      overflowX="auto"
      {...props}
    >
      {caption ? <TableCaption color="pm.muted">{caption}</TableCaption> : null}
      <Table variant="simple" size="sm" sx={{ "th, td": { borderColor: "pm.border" } }}>
        {children}
      </Table>
    </TableContainer>
  );
}
