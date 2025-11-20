import { z } from "zod";
import { TaskPriority, TaskStatus } from "../../types/globalTypes";

export const createTaskZodSchema = z.object({
    title: z.string().min(1, {
        error: "Title must be 1 characters long"
    }),
    description: z.string().min(1, {
        error: "Description must be 1 characters long"
    }),
    assignedMember: z.number(),
    priority: z.enum(TaskPriority),
    status: z.enum(TaskStatus),
    projectId: z.string()
});
