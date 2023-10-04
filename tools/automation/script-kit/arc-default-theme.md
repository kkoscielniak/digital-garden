---
title: "Arc: Default Theme"
---

Pick an [[tools/apps/arc|Arc Browser's]] Space and set its theme for all the other Arc Spaces. Tested with Arc v1.10.1.

::: danger
This script modifies Arc Browser's `StorableSidebar.json` file. Use at your peril.
:::

🖥️ [Open arc-default-theme](https://scriptkit.com/api/new?name=arc-default-theme&url=https://gist.githubusercontent.com/kkoscielniak/a4281a1f594ef8b10ef4449ddc322bba/raw/947ccae0221db4927ad56bf121ccd4cd551fe91c/arc-default-theme.ts") in [[tools/automation/script-kit/script-kit|ScriptKit]].

```ts
import "@johnlindquist/kit";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

const { rimraf } = await npm("rimraf");
const psList = await npm("ps-list");

const ARC_LIBRARY_PATH = join(
  homedir(),
  "Library",
  "Application Support",
  "Arc",
);

async function listSidebarCacheFiles(): Promise<string[]> {
  const arcFileNames = await readdir(ARC_LIBRARY_PATH);

  return arcFileNames.filter(
    (file) =>
      file.startsWith("StorableSidebar") && file !== "StorableSidebar.json",
  ) as string[];
}

async function removeSidebarCacheFiles(): Promise<void> {
  const sidebarCacheFileNames = await listSidebarCacheFiles();

  for (const fileName of sidebarCacheFileNames) {
    try {
      await rimraf(join(ARC_LIBRARY_PATH, fileName));
    } catch (err) {
      console.error(err);
    }
  }
}

async function findArcProcess(): Promise<{
  name: string;
  pid: number;
}> {
  const processes = await psList();

  const arcProcess = processes.find((process) => process.name === "Arc");

  return arcProcess;
}

async function killArcProcess(): Promise<void> {
  const arcProcess = await findArcProcess();

  if (arcProcess) {
    process.kill(arcProcess.pid);
  }
}

async function readStorableSidebarJson(): Promise<StorableSidebarJson> {
  const storableSidebarJson = await readFile(
    join(ARC_LIBRARY_PATH, "StorableSidebar.json"),
    "utf-8",
  );

  return JSON.parse(storableSidebarJson) as StorableSidebarJson;
}

async function getSourceSpaceTheme(
  json: StorableSidebarJson,
  sourceSpaceName: string,
): Promise<WindowTheme> {
  const sourceSpace: SpaceModel = json.sidebarSyncState.spaceModels.find(
    (spaceModel) =>
      typeof spaceModel !== "string" &&
      spaceModel.value?.title === sourceSpaceName,
  ) as SpaceModel;

  return sourceSpace.value?.customInfo.windowTheme;
}

async function getTargetSpaces(
  json: StorableSidebarJson,
  originalSpaceName: string,
): Promise<SpaceData[]> {
  const itemsContainer = json.sidebar.containers.find((container) =>
    Object.hasOwnProperty.call(container, "items"),
  );

  if (itemsContainer) {
    const spaces = itemsContainer.spaces as (string | SpaceData)[];

    return spaces.filter(
      (space) => typeof space !== "string" && space.title !== originalSpaceName,
    ) as SpaceData[];
  }
}

async function getTargetSpacesSynced(
  json: StorableSidebarJson,
  originalSpaceName: string,
): Promise<SpaceModel[]> {
  return json.sidebarSyncState.spaceModels.filter(
    (spaceModel) =>
      typeof spaceModel !== "string" &&
      spaceModel.value?.title !== originalSpaceName,
  ) as SpaceModel[];
}

async function writeStorableSidebarJson(
  json: StorableSidebarJson,
): Promise<void> {
  await removeSidebarCacheFiles();

  await writeFile(
    join(ARC_LIBRARY_PATH, "StorableSidebar.json"),
    JSON.stringify(json, null, 2),
  );
}

async function mapJsonToSpaceNames(
  json: StorableSidebarJson,
): Promise<string[]> {
  const itemsContainer = json.sidebar.containers.find((container) =>
    Object.hasOwnProperty.call(container, "spaces"),
  );

  if (itemsContainer) {
    const spaces = itemsContainer.spaces as (string | SpaceData)[];

    return (
      spaces.filter((space) => typeof space !== "string") as SpaceData[]
    ).map((space) => space.title);
  }
}

async function main(): Promise<void> {
  await killArcProcess();
  await removeSidebarCacheFiles();

  const storableSidebarJson: StorableSidebarJson =
    await readStorableSidebarJson();

  const spaceNames = await mapJsonToSpaceNames(storableSidebarJson);

  const sourceSpaceName = await arg(
    "Which Space theme you want to use for all the others?",
    spaceNames,
  );

  const sourceSpaceTheme: WindowTheme = await getSourceSpaceTheme(
    storableSidebarJson,
    sourceSpaceName,
  );

  const targetSpaces: SpaceData[] = await getTargetSpaces(
    storableSidebarJson,
    sourceSpaceName,
  );

  for (const targetSpace of targetSpaces) {
    targetSpace.customInfo.windowTheme = sourceSpaceTheme;
  }

  const targetSpacesSynced: SpaceModel[] = await getTargetSpacesSynced(
    storableSidebarJson,
    sourceSpaceName,
  );

  for (const targetSpace of targetSpacesSynced) {
    targetSpace.value.customInfo.windowTheme = sourceSpaceTheme;
  }

  writeStorableSidebarJson(storableSidebarJson);
}

await main();

// Interfaces ------------------------------------------------------------------

interface Color {
  colorSpace: string;
  red: number;
  alpha: number;
  blue: number;
  green: number;
}

interface ColorSettings {
  [key: string]: Color;
}

interface WindowTheme {
  semanticColorPalette: {
    appearanceBased: {
      light: ColorSettings;
      dark: ColorSettings;
    };
  };
  [key: string]: unknown;
}

interface CustomInfo {
  windowTheme: WindowTheme;
  [key: string]: unknown;
}

interface SpaceData {
  title: string;
  customInfo: CustomInfo;
  id: string;
  [key: string]: unknown;
}

interface SpaceModel {
  value: SpaceData;
  [key: string]: unknown;
}

interface SidebarSyncState {
  spaceModels: (string | SpaceModel)[];
}

interface Sidebar {
  containers: Array<
    | {
        spaces: (SpaceData | string)[];
      }
    | {
        [key: string]: unknown;
      }
  >;
}

interface StorableSidebarJson {
  sidebarSyncState: SidebarSyncState;
  sidebar: Sidebar;
  [key: string]: unknown;
}
```
