import { type SchemaTypeDefinition } from "sanity";

// import { blockContentType } from "./blockContentType";
// import { categoryType } from "./categoryType";
import { startupType } from "./startupType";
import { authorType } from "./authorType";
import { playlistType } from "./playlist";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [startupType, authorType, playlistType],
};
