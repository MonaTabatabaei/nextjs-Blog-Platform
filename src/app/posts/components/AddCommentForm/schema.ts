import z from "zod";

export const commentSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  body: z.string().min(10, "Comment must be at least 10 characters long."),
});

export type CommentFormValues = z.infer<typeof commentSchema>;
