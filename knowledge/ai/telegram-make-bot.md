---
title: Telegram Bot with Make
customHeader: true
---

# Telegram Bot + Make as an AI Assistant interface

> This article has been translated to English using GPT API.

The side effect of my adventure in AI Devs was the creation of a Telegram bot, which serves as an interface for communication with Zelda\* - my private AI assistant.

I chose Telegram because of its presence on both phone and computer, and even in the car, through CarPlay. It is also relatively easy to integrate with Make, on which my Zelda is based.

I will show you how to connect Telegram with Make.com and respond to messages sent to the bot in automation scenarios. I also found an interesting patent for quickly launching a chat with the bot on iOS (to my knowledge, the technique presented should also work on Android - _I hope I got you covered_) and macOS.

The final result for me looks like [this](https://koscielniak.pro/assets/0_part.mp4).

## Creating a bot in Telegram

Creating a bot in Telegram is done through... Telegram. You can use both the mobile and desktop Telegram clients for this.

First, you need to use a bot with the charming name [_BotFather_](https://telegram.me/botfather) (you can also just click on the link) and send him a message:

```
/newbot
```

Telegram will ask for a name for the bot. The name will also be its _@handler_ and must end with the suffix `Bot`. For the purposes of this article, I named it `SprytnyBotAndrzejaKobryBot`.

> 💡 It's worth naming the bot in such a way that it's not easy to find. I'll explain why soon.

> This won't necessarily be the bot's _final name_, so don't worry, a random string of characters will do too 😅

In response, we will receive a token for communication with the HTTP API, which we will use in Make. The direct link to the bot will also be useful later (in my case it is `t.me/SprytnyBotAndrzejaKobryBot`).

![](/public/telegram-make-bot-1.png)

## Creating a webhook in Make

To integrate Telegram with our automations, we will use a ready-made module in Make called **_Telegram Bot_** and its trigger **_Watch Updates_**.

To configure the connection, we only need the token sent to us by BotFather:

![](/public/telegram-make-bot-3.1.png)

Thanks to this simple step, our scenario can listen for new messages directed to _SprytnyBotAndrzejaKobry_ 😅

> 💡 I encourage you to run the scenario once at this point and send anything to the newly created bot, so that Make knows what data to expect.

## Responding to messages

Making the bot respond to our messages is even easier than listening, and basically comes down to using the **\_Telegram Bot\*** -> **\_Send a Text Message or a Reply\*** module.

In this module, the _Chat ID_ should be selected as the chat identifier from the incoming message in the trigger:

![](/public/telegram-make-bot-3.2.png)
The _Text_ value is, of course, the content of the bot's response.

What happens between sending a message **to the bot** and receiving its response is up to you 🙂 It can be the direct use of any Make module, but also calling a webhook and _responding_ with the returned response.

Securing the bot against unauthorized use I mentioned earlier that it's important to name the bot in a way that makes it difficult to identify. This is because (at least to my current knowledge) **every bot on Telegram is a public bot**, and theoretically any user of the messaging app could find and chat with it. This creates a risk that someone could gain access to our automation scenario, which is definitely something we don't want.

Choosing an ambiguous name for our bot is just the first line of defense against unauthorized use. But we can add another.

Thanks to the **_Router_** module in Make, we can filter incoming messages and return responses only when certain conditions are met. A relatively safe technique seems to be checking the Chat ID - it's different for each user, so in theory it should be impossible for a third party to use our bot for nefarious purposes. We can combine this with our name, surname, username, or add another method of verifying our identity using other Make modules, a secret word present in the message content, etc.

The downside of this solution is that from time to time we may need to update our filter, for example when we delete the entire chat with the bot on Telegram and create a new one.

![](/public/telegram-make-bot-2.png)

> 💡 We can also use the **Router** to respond with a not-so-nice message to our _uninvited guests_ in case of failed authorization 😉

## Customizing the bot

Our newly created bot is still quite generic. It has a poor name and lacks any character. Fortunately, we can still ask the "godfather" of bots (after all, it's BotFather 😂) for a favor. Let's use it to change the name displayed on the contact list:

```
/mybots
```

After selecting our bot from the list, additional options will appear:

![](/public/telegram-make-bot-3.5.png)

By selecting _Edit Bot_, we will have the option to change its name, contact picture, description, etc. By clicking on the appropriate option (e.g. Edit Name), we will be asked to provide a new name.

> 💡 The _Edit Botpic_ option is used to change the profile picture/contact photo.

In this way, our bot will stand out a bit on the contact list:

![](/public/telegram-make-bot-3.png)

## Bonus: Integration with iOS via Shortcuts

Well, that's nice. The only problem for me right now is the need to open Telegram "manually" and select the bot from the contact list. That's one step too many.

Fortunately, we can easily prepare a Shortcut that will open a direct chat with the Assistant immediately in Telegram.

To do this, we will use the **_Open URLs_** action in Shortcuts, setting the URL value to the same URL that BotFather greeted us with when creating the bot (for me: `t.me/SprytnyBotAndrzejaKobryBot`).

![](/public/telegram-make-bot-4.jpeg)
The first time we use the Shortcut, we will need to allow the bot URL to be opened. After that, there will be no problem 🙂

We can attach such a Shortcut to the Home Screen, as well as give it any name and icon.

> 💡 On Android, this simple bot link should also work. I leave it up to you to attach it to an icon on the desktop 😉

## Bonus #2: Integration with macOS via Keyboard Maestro

The Shortcut presented above works on macOS, but it also unnecessarily opens an additional browser tab. Fortunately, this can be bypassed if you use Keyboard Maestro. Simply create a macro consisting of a single **_Open URL_** action and set the _with_ parameter to Telegram.

![](/public/telegram-make-bot-5.png)

Thanks to this trick, not only will we skip the browser when opening the bot, but we will also be able to attach it to any keyboard shortcut (in my case, it's `◆ + X`; [[tools/automation/karabiner|Hyper Key]]), [[tools/hardware/stream-deck|Stream Deck]], etc.

## What's next?

Telegram Bot is just one way to integrate Make scenarios. In the case of the AI Assistant, it works great for everyday chatting, but for some actions, I recommend attaching them to other Shortcuts or Keyboard Maestro macros. Moreover, on iOS, thanks to the [LockFlow app](https://www.macstories.net/reviews/lockflow-a-simple-way-to-add-shortcuts-to-the-ios-16-lock-screen/), we can also add our Shortcut to the LockScreen to make it even easier to use our bot. Thus, in practice, we can enjoy almost full integration of the operating system with GPT and our Assistant.

## Resources

- [Create Private Telegram Chatbot](https://sarafian.github.io/low-code/2020/03/24/create-private-telegram-chatbot.html)

---

\* any resemblance to persons or names is accidental, ~~suck it Nintendo~~ 😅
