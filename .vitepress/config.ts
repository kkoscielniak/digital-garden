import { defineConfig } from "vitepress";
import mdWikilinks from "markdown-it-wikilinks";
import checkbox from "markdown-it-checkbox";

export default defineConfig({
  base: "/",
  title: "🥦 kościelniak.pro",
  description: "Things I know",
  ignoreDeadLinks: true,
  themeConfig: {
    nav: [{ text: "Home", link: "/" }],

    sidebar: [
      {
        text: "ToC",
        items: [],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/kkoscielniak" }],
  },
  markdown: {
    config: (md) => {
      const wikilinks = mdWikilinks({
        makeAllLinksAbsolute: true,
      });

      md.use(wikilinks).use(checkbox);
    },
  },
});
