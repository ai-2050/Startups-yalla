"use client";

import { useState, useActionState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { startupSchema } from "@/lib/validation";
import { z } from "zod";
import { createPitch } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const router = useRouter();
  const handleSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };
      await startupSchema.parseAsync(formValues);
      const result = await createPitch(prevState, formValues, pitch);
      if (result.state === "SUCCESS") {
        toast({
          title: "success",
          description: "Your startup pitch has been created",
        });
        router.push(`/startup/${result._id}`);
      }
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        return { ...prevState, state: "Error", error: "Validation failed" };
      } else {
        return {
          ...prevState,
          state: "Error",
          error: "An unexpected error has occured",
        };
      }
    }
  };

  const [state, action, isPending] = useActionState(handleSubmit, {
    errors: "",
    success: "",
  });
  return (
    <form className="startup-form" action={action}>
      <div>
        <label className="startup-form_label" htmlFor="title">
          Title
        </label>
        <Input
          placeholder="title"
          id="title"
          name="title"
          required
          className="startup-form_input"
        />
        {errors.title && <p className="startup-form_error">{errors?.title}</p>}
      </div>

      <div>
        <label className="startup-form_label" htmlFor="description">
          Description
        </label>
        <Textarea
          placeholder="Startup Description"
          id="description"
          name="description"
          required
          className="startup-form_textarea"
        />
        {errors.description && (
          <p className="startup-form_error">{errors?.description}</p>
        )}
      </div>
      <div>
        <label className="startup-form_label" htmlFor="category">
          Category
        </label>
        <Input
          placeholder="Category (Tech - Health - Education)"
          id="category"
          name="category"
          required
          className="startup-form_input"
        />
        {errors.category && (
          <p className="startup-form_error">{errors?.category}</p>
        )}
      </div>
      <div>
        <label className="startup-form_label" htmlFor="link">
          Image URL
        </label>
        <Input
          placeholder="Enter Image URL"
          id="link"
          name="link"
          required
          className="startup-form_input"
        />
        {errors.link && <p className="startup-form_error">{errors?.link}</p>}
      </div>
      <div>
        <label className="startup-form_label" htmlFor="pitch">
          Enter pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height="300px"
          style={{ borderRadius: 20, overflow: "hidden", marginTop: "10px" }}
          textareaProps={{
            placeholder: "Briefly add your idea and what problems it solves.",
          }}
          previewOptions={{ disallowedElements: ["style"] }}
        />
        {errors.pitch && <p className="startup-form_error">{errors?.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting...." : "Submit your pitch"}
        <Send className="size-4 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;
