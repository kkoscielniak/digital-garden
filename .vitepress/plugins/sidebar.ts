import {
  SidebarItem,
  generateSidebar as generateVpSidebar,
} from "vitepress-sidebar";

const getSidebarPartial = ({
  path,
  collapsed,
  capitalizeFirst = true,
}: {
  path: string;
  collapsed?: boolean;
  capitalizeFirst?: boolean;
}): SidebarItem[] => {
  const sidebarPartial = generateVpSidebar({
    collapsed,
    capitalizeFirst,
    rootGroupText: path.charAt(0).toUpperCase() + path.slice(1),
    scanStartPath: path,
    resolvePath: `/${path}/`,
    useTitleFromFrontmatter: true,
    includeRootIndexFile: true,
    sortByFileName: [`${path}.md`],
  });

  return sidebarPartial[`/${path}/`];
};

export const sidebar = [
  { text: "whoami", link: "/" },
  ...getSidebarPartial({
    path: "about",
    collapsed: true,
  }),
  ...getSidebarPartial({
    path: "experiments",
    capitalizeFirst: false,
  }),
  ...getSidebarPartial({
    path: "knowledge",
    collapsed: true,
  }),
  ...getSidebarPartial({
    path: "reading",
    collapsed: true,
  }),
  ...getSidebarPartial({
    path: "tools",
    collapsed: true,
  }),
];

console.log(sidebar);
