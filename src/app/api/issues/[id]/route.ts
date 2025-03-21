import { issueSchema } from "@/app/validationScheme"
import {  NextRequest, NextResponse } from "next/server"
import prisma from "../../../../../prisma/client";



export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  // Validate the request body
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // Check if the issue exists
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id)},
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  // Update the issue
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue);
}
