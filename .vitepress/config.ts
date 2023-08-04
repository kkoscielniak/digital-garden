import { defineConfig } from "vitepress";
import mdWikilinks from "markdown-it-wikilinks";
import mdCheckbox from "markdown-it-checkbox";
import mdInclude from "markdown-it-include";
import { sidebar } from "./plugins/sidebar";

export default defineConfig({
  base: "/",
  title: "🥦 kościelniak.pro",
  description: "Things I know",
  ignoreDeadLinks: true,
  srcExclude: ["private"],
  themeConfig: {
    docFooter: {
      next: false,
      prev: false,
    },
    externalLinkIcon: true,
    nav: [{ text: "/uses", link: "/uses" }],
    sidebar,
    socialLinks: [
      { icon: "instagram", link: "https://instagram.com/pankoscielniak" },
      { icon: "github", link: "https://github.com/kkoscielniak" },
    ],
    search: {
      provider: "local",
    },
    sidebarMenuLabel: "Roam freely",
  },
  markdown: {
    config: (md) => {
      const wikilinks = mdWikilinks({
        makeAllLinksAbsolute: true,
        postProcessLabel: (label) => label.split("/").pop(),
      });

      md.use(wikilinks).use(mdCheckbox).use(mdInclude, "partials");
    },
  },
  head: [
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥦</text></svg>",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥦</text></svg>",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥦</text></svg>",
      },
    ],
    [
      "link",
      {
        rel: "shortcut icon",
        href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥦</text></svg>",
      },
    ],
    ["meta", { name: "msapplication-TileColor", content: "#3a0839" }],
  ],
});
