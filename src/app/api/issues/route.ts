import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { issueSchema } from "../../validationScheme";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validation = issueSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(validation.error.errors, { status: 400 });
        }

        // Save issue to the database using Prisma
        const newIssue = await prisma.issue.create({
            data: {
                title: body.title,
                description: body.description,
            },
        });

        return NextResponse.json({ message: "Issue created successfully", data: newIssue }, { status: 201 });
    } catch (error) {
        console.error("Error creating issue:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
