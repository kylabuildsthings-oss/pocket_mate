"use client";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  type ModalProps,
} from "@chakra-ui/react";

export type PMModalProps = ModalProps & {
  title: string;
  footer?: React.ReactNode;
};

export function PMModal({ title, children, footer, ...props }: PMModalProps) {
  return (
    <Modal isCentered scrollBehavior="inside" {...props}>
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(6px)" />
      <ModalContent
        bg="pm.surface"
        borderWidth="1px"
        borderColor="pm.border"
        mx={4}
      >
        <ModalHeader
          fontFamily="var(--font-pm-heading), system-ui, sans-serif"
          color="pm.text"
          borderBottomWidth="1px"
          borderColor="pm.border"
        >
          {title}
        </ModalHeader>
        <ModalCloseButton color="pm.muted" />
        <ModalBody py={4}>{children}</ModalBody>
        {footer ? (
          <ModalFooter borderTopWidth="1px" borderColor="pm.border">
            {footer}
          </ModalFooter>
        ) : null}
      </ModalContent>
    </Modal>
  );
}
