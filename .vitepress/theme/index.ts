// https://vitepress.dev/guide/custom-theme
import Theme from "vitepress/theme";
import Title from "./LayoutWithTitle.vue";
import "./style.css";
import { Layout } from "./lay2";

export default {
  extends: Theme,
  Layout: Layout,
  // enhanceApp({ app, router, siteData }) {},
  // TODO: Moze z tego skorzystac jakos?
};
