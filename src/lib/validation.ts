import z from "zod";

export const startupSchema = z.object({
  title: z.string().min(1, "Title is required!!"),
  description: z.string(),
  category: z.string(),
  link: z
    .string()
    .url("Invalid URL format")
    .refine(
      async (url) => {
        try {
          const res = await fetch(url, { method: "Head" });
          const contentType = res.headers.get("content-type");
          return contentType?.startsWith("image/");
        } catch (error) {
          return false;
        }
      },
      { message: "URL must refer to image files (jpeg, jpg, png, svg," }
    ),
});

export type StartupType = z.infer<typeof startupSchema>;
