---
title: Ideas
customHeader: true
---

# Ideas worth exploring

Here I keep list of ideas I came up, but haven't had time to [[experiments/experiments|experiment]] with them yet.

::: warning
Some of these might not be as useful as one might think, but executing them might be a funny thing to do.
:::

::: info
treat "names" as codenames, not the final one
:::

## [GFDA](https://gfda.co/)-like wallpapers creator

- webapp that allows to create text-based wallpaper with the content of your own
- Things that could be useful for making such app
  - [RenderForm](https://renderform.io) for creating the image
  - `imagemagick`
- could have API for automation
  - possible Make integration:
    - Get inspirational quote from _somewhere_
    - Make a wallpaper
    - Save it to DropBox
    - Automate setting a wallpaper on macOS with the saved file
    - Profit

## AI-based Arc Browser _space manager_

- Lists all the spaces and all the tabs open in the [[tools/apps/arc|Arc]] browser
- Asks GPT to categorise (normalised) tab titles into spaces
- The categorisation based on space name/domain
- Moves tabs to particular spaces according to GPTs response
- This could be done using bunch of AppleScripts, as Arc provides a dictionary
- I could use [[tools/apps/raycast|Raycast]] extension to fire the categorisation

## _ViteBlish_

- An enhanced theme for [[tools/apps/vite-press|VitePress]] that would provide additional features like:
  - [x] backlinks
  - [ ] knowledge graph
    - https://github.com/penrose/penrose/ - diagrams maker
  - [ ] deep integration with [[tools/apps/obsidian|Obsidian]]
- Think Obsidian Publish/[Quartz](https://quartz.jzhao.xyz/) but made for VitePress
- Progress on that could be seen in this [[about/digital-garden|digital garden]] since I experiment with many features in my setup
- Perhaps it could be a set of VitePress plugins instead of the fully-featured theme?

## _Blockhooks_

A webapp allowing to select particular Notion Blocks and generate webhooks that would update these blocks.

Or, maybe it should allow to assign the blocks the requests to external APIs and build the block's content.

Basically integrating Notion to _everything_ (that has API, to be precise) without having to maintain dozens of Make scenarios.

## Unnamed AI game

- Player 1 (User) speaks English ONLY.
- Player 2 (System/AI) speaks Spanish ONLY.
- They had a car accident (or any other stressful interaction like that)
- Now they need to resolve the issue even though they can't understand each other.
  - Looking for words sounding similarly in both languages, perhaps

## Others

- Ron Swanson's daily quote Slack Integration
- Set of Make integrations helping [[knowledge/adhd|neurodivergent]] people
