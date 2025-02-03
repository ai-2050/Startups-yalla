"use server";
import { writeClient } from "@/sanity/lib/write_client";
import { StartupType } from "./validation";
import { auth } from "../../auth";
import { jsonFromServerActionResponse } from "./utils";
import slugify from "slugify";

// export
export const createPitch = async (
  prevState: any,
  startupValues: StartupType,
  pitch: string
) => {
  const session = await auth();
  if (!session) {
    return jsonFromServerActionResponse({
      error: "dosn/'t have permission to create a startup",
      state: "ERROR",
    });
  }
  const { title, description, category, link } = startupValues;
  const slug = slugify(title as string, { strict: true, lower: true });
  const startup = {
    author: {
      _type: "reference",
      _ref: session?.id,
    },
    slug: {
      _type: slug,
      current: slug,
    },
    title: title,
    description: description,
    image: link,
    category: category,
    pitch,
  };
  try {
    const result = await writeClient.create({
      _type: "startup",
      ...startup,
    });
    return jsonFromServerActionResponse({
      ...result,
      state: "SUCCESS",
      error: "",
    });
  } catch (error) {
    console.log(error);
    return jsonFromServerActionResponse({
      rawInput: startupValues,
      state: "ERROR",
      error: "Error when creating a startup",
    });
  }
};
