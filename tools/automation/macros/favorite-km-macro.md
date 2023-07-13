---
title: Copy Samples to MPC
customHeader: true
---

# Copy Samples to MPC Live automatically

~~I am a beginner music producer.~~ I occasionally play with sample-based boombap beats trying to make something audible. Because of this hobby, my drive is full of jazzy cuts. I wanted to have them synced on my MPC Live SSD so I can access them in the standalone mode (without the computer connected).

This was bothersome, because most of the time, whenever the inspiration hit or I had a minute to tinker with music, I needed to connect the MPC to the computer, manually copy the sample packs I've downloaded to the precise location on my MPC SSD, keeping in mind the naming scheme, directory structure, etc. instead of making music.

Fortunately, [Keyboard Maestro](/tools/apps/keyboard-maestro.md) has this feature to trigger a macro once the drive is attached, and the macro itself can be a command line. This way I can automate the process (to some extent) to sync the `~/Desktop/Beatmaker` directory to my MPC Live.

> [!tip] Note to self: Buy Hazel
>
> This could be automated even more with [Hazel](https://www.noodlesoft.com/) - I could automate the process of unarchiving and putting samples in `Beatmaker/` directory.

## How to

Thanks to [[tools/cli/rsync|rsync]], I can sync samples from my computer to the target device pretty easily without having to remove/copy the content that is already on my MPC.

> [!caution] One way syncing
>
> `rsync` is great for _one way_ synchronisation. It completely ignores what happens in the target directory, so the one I have on my computer is the _source of truth_ here.

The macro goes like that. Once the USB device that has `MPC` in name is attached, the following actions are triggered:

1. Cancel all other macros
   - for some reason, MPC mounts and dismounts few times once connected to Mac. Because of that the macro would run few times and I don't like that. I'm cancelling other macros to make sure `rsync` would run once
   - This may be tricky to handle once I have more different macros running in the background, but for now it works perfectly
2. Wait until the `/Volumes/MPC SSD` directory is mounted (_a folder exists_)
3. Execute this command:
   ```zsh
   rsync -aP ~/Desktop/Beatmaker/ /Volumes/MPC\ SSD/Beatmaker_sync
   ```

The results should be shown in Keyboard Maestro's command output window (so I am sure everything went fine).

The final macro looks like that:
![](/public/km-sync-samples.png)

## Summary

With new every macro made, I see how much of what I did in front of my computer was mundane, senseless and completely repetible. I am amazed of much of that I can automate by using just one tool.

By the way, during this write-up, I’ve created another 2 macros - the one that sorts the currently selected lines, so I can sort tags in my Obsidian notes and the one that converts Markdown to Rich Text. **This tool is fucking awesome.**
