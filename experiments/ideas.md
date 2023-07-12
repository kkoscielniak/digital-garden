---
title: Ideas worth exploring
---

# Ideas worth exploring
Here I keep list of ideas I came with, but haven't had time to [[experiments/index|experiment]] with them yet. 

- [GFDA](https://gfda.co/)-like wallpapers creator
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
- AI-based Arc Browser space manager
	- Lists all the spaces and all the tabs open in the [[tools/apps/arc]] browser
	- Asks GPT to categorise (normalised) tab titles into spaces
		- The categorisation based on space name
	- Moves tabs to particular spaces according to GPTs response
		- This could be done using bunch of AppleScripts, as Arc provides a dictionary
	- I could use [[tools/apps/raycast]] extension to fire the categorisation