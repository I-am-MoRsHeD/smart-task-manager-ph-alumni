import { z } from "zod";

export const createProjectZodSchema = z.object({
    name: z.string().min(1, "Project name is required"),

    linkedTeam: z.string().min(1, "LinkedTeam is required")
});
