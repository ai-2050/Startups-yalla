import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("startup").title("Startups"),
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("playlist").title("Playlists"),
      // S.divider(),
      // ...S.documentTypeListItems().filter(
      //   (item) => item.getId() && !['post', 'category', 'author'].includes(item.getId()!),
      // ),
    ]);
