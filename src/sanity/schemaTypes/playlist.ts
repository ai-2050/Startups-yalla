// import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const playlistType = defineType({
  name: "playlist",
  title: "Playlist",
  type: "document",
  // icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "select",
      type: "array",
      of: [{ type: "reference", to: [{ type: "startup" }] }],
    }),
  ],
});
