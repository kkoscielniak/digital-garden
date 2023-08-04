// https://vitepress.dev/guide/custom-theme
import Theme from "vitepress/theme";
import "./style.css";
import { Layout } from "./Layout";

export default {
  extends: Theme,
  Layout,
  enhanceApp({ app, router, siteData }) {},
};
