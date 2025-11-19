import z from "zod";


const memberZodSchema = z.object({
    member_no: z.number().int().min(1),
    name: z.string().min(1, "Name is required"),
    role: z.string().min(1, "Role is required"),
    capacity: z.number().min(1, "Capacity is required").max(5, "Capacity cannot be more than 5"),
});


export const createTeamZodSchema = z.object({
    name: z
        .string({ error: "Name must be string" })
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." }),
    members: z.array(memberZodSchema)
});
