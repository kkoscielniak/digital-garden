import { defineComponent, h, reactive, watch } from "vue";
import { useRoute } from "vitepress";
import DefaultTheme from "vitepress/theme";
import BacklinkReferences from "./plugins/backlinks/components/Backlinks.vue";
import Title from "./components/Title.vue";

export const Layout = defineComponent({
  name: "Layout",

  setup() {
    const route = useRoute();
    const state = reactive({ key: route.path });
    watch(
      () => route.path,
      (path) => (state.key = path),
    );

    return () =>
      h(DefaultTheme.Layout, null, {
        "doc-before": () => h(Title, { key: `${state.key}` }),
        "aside-outline-after": () =>
          h(BacklinkReferences, { key: `${state.key}` }),
      });
  },
});
