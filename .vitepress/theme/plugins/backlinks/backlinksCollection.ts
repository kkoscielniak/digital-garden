export interface Backlink {
  title: string;
  path: string;
}

export const collection: Map<string, Backlink[]> = new Map();

import type { PageData } from "vitepress";

// NOTE: collection here is lazy collected during the dev runtime.
// it won't generate the backlink references information until you visit the
// page.
export const getBacklinksCollection = async (pageData: PageData) => {
  const relativePath = pageData.relativePath.replace(".md", "");
  // console.log(relativePath);
  // console.log(collection);

  if (!collection.has(relativePath)) {
    return [];
  }
  return collection.get(relativePath);
};
