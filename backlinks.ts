import glob from "fast-glob";
import MarkdownIt from "markdown-it";
import { backlinksMarkdownIt as mdBacklinks } from "./.vitepress/theme/plugins/backlinks/backlinksMarkdownIt.js";
import { collection } from "./.vitepress/theme/plugins/backlinks/backlinksCollection.js";

const md = new MarkdownIt();

const files = glob.md.use(mdBacklinks, { vault: "/" });

// const x = md.parse("Hello [[world]]!", {});
// console.log(x);
console.log(collection);
