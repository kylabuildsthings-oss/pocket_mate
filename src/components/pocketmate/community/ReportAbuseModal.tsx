"use client";

import { PMModal } from "@/components/pocketmate/PMModal";
import {
  Button,
  FormControl,
  FormLabel,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  targetType: "strategy" | "comment";
  targetId: string;
  label?: string;
};

export function ReportAbuseModal({ targetType, targetId, label }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [reason, setReason] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async () => {
    const t = reason.trim();
    if (t.length < 8) {
      toast({
        title: "Add a bit more detail",
        status: "warning",
        duration: 2500,
      });
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/pocketmate/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetType,
          targetId,
          reason: t.slice(0, 2000),
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error((j as { error?: string }).error || "Report failed");
      }
      toast({
        title: "Report received",
        description: "Thanks—throttled server log only in MVP.",
        status: "success",
        duration: 3200,
      });
      setReason("");
      onClose();
    } catch (e) {
      toast({
        title: "Could not send report",
        description: e instanceof Error ? e.message : "Error",
        status: "error",
        duration: 4000,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Button size="sm" variant="ghost" color="pm.muted" onClick={onOpen}>
        {label ?? "Report"}
      </Button>
      <PMModal
        isOpen={isOpen}
        onClose={onClose}
        title="Report abuse or spam"
        footer={
          <>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => void submit()}
              isLoading={sending}
            >
              Submit report
            </Button>
          </>
        }
      >
        <Text fontSize="sm" color="pm.muted" mb={3}>
          Target: <strong>{targetType}</strong> · <code>{targetId}</code>
        </Text>
        <FormControl>
          <FormLabel color="pm.muted" fontSize="sm">
            What’s wrong? (8–2000 chars)
          </FormLabel>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value.slice(0, 2000))}
            rows={5}
            bg="pm.surface"
            borderColor="pm.border"
            color="pm.text"
          />
        </FormControl>
      </PMModal>
    </>
  );
}
