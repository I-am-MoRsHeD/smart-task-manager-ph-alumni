import { z } from "zod";

export const createTaskZodSchema = z.object({
    title: z.string().min(1, {
        error: "Title must be 1 characters long"
    }),
    description: z.string().min(1, {
        error: "Description must be 1 characters long"
    }),

    assignedMember: z.number(),

    projectId: z.string()
});
