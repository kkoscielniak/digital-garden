The operating system does a lot to attempt to keep things responsive for the user. For example, phones attempt to [[private/v6-old-obsidian-publish/Challenges with threads#The UI thread|update the UI]] 60 to 120 times per second (60 at minimum). There's a short finite time to prepare and draw the UI (at 60 fps, every screen update should take 16ms or less).

Android will drop frames, or abort trying to complete a single update cycle to attempt to catch up. Some frames drop and fluctuation is normal but too many will make your app unresponsive.

Performance issues, [[private/v6-old-obsidian-publish/Challenges with threads#Race conditions|race conditions]], and hard to reproduce bugs are some of the reasons why we don't recommend working with threads directly.

Use [[knowledge/kotlin/Coroutines]] for writing the concurrent code.
