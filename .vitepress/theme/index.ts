// https://vitepress.dev/guide/custom-theme
import Theme from "vitepress/theme";
import Title from "./LayoutWithTitle.vue";
import "./style.css";

export default {
  Layout: Title,
  extends: Theme,
  enhanceApp({ app, router, siteData }) {},
};
