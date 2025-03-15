import { Status, Issue } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const statusMap: Record<
  Status,
  { label: string; color: "red" | "green" | "violet" }
> = {
  OPEN: { label: " Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "CLOSED", color: "green" },
};

const issueStatusBadge = ({ status }: { status: Status }) => {

  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default issueStatusBadge;
