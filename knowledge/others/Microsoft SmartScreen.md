---
title: Microsoft SmartScreen
---

## tl;dr

- Obtain a MS Authenticode Code Signing Certificate
- Sign both the app and the installer with it
- Send both the app and the installer to [Submit an installer for malware analysis](https://www.microsoft.com/en-us/wdsi/filesubmission?persona=SoftwareDeveloper) page on MS Servers
- Wait some time for the certificate to gain trust among users (can take from several days to several weeks)

> [!tip] It's the best time to certify your app in before the 1.0 release, so it can gain trust.

---

_SmartScreen_ "blocks" us from opening the app if it comes from an unknown place or is created by an unknown publisher. We still can install the app, but we'll see a dialog asking us if we're sure what we're doing.

In details that means that if we download a file, it gets _flagged_ by Windows as a subject to check with SmartScreen. We can see that parameter in **Properties** dialog.

![][https://i.stack.imgur.com/9rLVe.png]

According to [Electron docs](https://www.electronjs.org/docs/latest/tutorial/code-signing#signing-windows-builds) **code signing** should be enough to ultimately not trigger any OS security checks. However, **not from the very beginning**.

> On Windows, the system assigns a trust level to your code signing certificate which if you don't have, or if your trust level is low, will cause security dialogs to appear when users start using your application. Trust level builds over time so it's better to start code signing as early as possible.

This means the signed app will have to _gather_ enough reputation not to display this dialog.

## Code Signing vs EV Code Signing

- Both will work for Auto Updater
- regular (and cheaper) Code Sign Certs
  - will show a warning during installation anyway 🤷‍♂️
  - warning will go away **permanently** as the users install and trust our app
- EV Certs
  - get rid of the issue entirely, but I suppose we can't use them
  - expensive
  - bound to USB dongle, which means we'd need to build the app on our own servers, or manually on our computers (idk if that's even possible to achieve simply)

## Next steps

- Obtain a certificate from a **trusted cert publisher** (Symantec, Thawte, GlobalSign)
  - We need a cert for _Microsoft Authenticode_ platform ("Only Authenticode Certificates issued by a CA that is a member of the Windows Root Certificate Program can establish reputation.")
- Export the certificate to `*.p12` file
- Encode it to `base64`
- Sign the app with the certificate using [`electron-builder`](https://www.electron.build/code-signing)
- Sign the installer (described in the docs as well)
- [Submit an installer for malware analysis](https://www.microsoft.com/en-us/wdsi/filesubmission?persona=SoftwareDeveloper) on MSs servers to make the trust building process faster

We might also use `SignTool` from Windows SDK, if the method above won't work. But that'd be a manual hassle.

## How long will it take to build trust?

With regular Code Signing Certificate, the unofficial numbers are:

- `18 days` and about `430 app installs`
- `42 days` and about `1.400 app installs`
- `16 days` and about `2.000 app installs`
- `One month` and more than `10.000 downloads`. Source: [here](https://security.stackexchange.com/a/223505)
- Between `a few weeks` and `a month`. Source: [here](https://security.stackexchange.com/q/222140/#comment452671_222140)

## Important notes

- the reputation will **not** automatically carry over to the renewed certificate (even if it's signed against the same private key as the old certificate) ([source](https://stackoverflow.com/a/66582477))
  - we shall buy the certificate with the **longest possible validity period**
  - we can mitigate the problem by getting renewed code signing certificate **before** the old certificate expires, and then using **both** the old (but not yet expired!) and the renewed certificate to sign the app
  - The old certificate will continue to bypass SmartScreen; the new one will help to build up trust

## Alternatives?

- A user on [SO](https://stackoverflow.com/a/68647245) hinted that arhiving with `rar` would make the archive flagged, but the unarchived installer itself wouldn't be flagged. This should be tested though (and, frankly, I don't think it'll work).

## Additional resources

- [(1) Electron - Windows Defender "protecting" a Signed App : electronjs](https://www.reddit.com/r/electronjs/comments/7m3aiw/electron_windows_defender_protecting_a_signed_app/)
