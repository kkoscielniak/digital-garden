---
title: Codzienność na Autopilocie
---

> Łańcuchy nawyku są za słabe aby je poczuć do chwili, gdy stają się zbyt silne aby je zerwać.
> ~ Adam _Overment_ Gospodarczyk

## Powiadomienia

Powiadomienia są zabójcze dla skupienia i efektywności. Ich nadmierna liczba bardzo negatywnie wpływa na skuteczność i samopoczucie.

Wyłącz wszystkie powiadomienia i aktywuj tylko te, które są naprawdę potrzebne. Nie ma żadnego realnego uzasadnienia dla sprawdzania e-maila i telefonu co chwilę, ani dla odpowiadania na wiadomości od razu.

## Focus Mode i monitorowanie

Używaj trybów Focus Mode. Najlepiej aby odpowiednie Focus Mode uruchamiało się automatycznie (_Work_ w godzinach pracy, _Reading_ w reakcji na otwarcie apki [[tools/apps/kindle|Kindle]] itd.).

Monitoruj swoją aktywność za pomocą narzędzi takich jak [Rize](https://rize.io), Screen Time lub [RescueTime](https://rescuetime.com). Od czasu do czasu sprawdź raporty generowane przez te narzędzia i wyciągnij odpowiednie wnioski. Dostęp do takiej wiedzy, jest pierwszym krokiem do wprowadzania usprawnień.

## Rozpraszacze

Warto skorzystać z aplikacji takich jak [Freedom](https://freedom.to) lub [Pi-hole](https://pi-hole.net/) do eliminacji innych rozpraszaczy.

## Czarno-biały ekran w urządzeniach mobilnych

Przełącz ekran w telefonie w tryb [[tools/automation/shortcuts/automated-grayscale|czarno-biały]] (najlepiej poprzez automatyzację) - to pomoże ograniczyć korzystanie z niego. Pozostawienie telefonu poza zasięgiem ręki przed rozpoczęciem pracy także może zmniejszyć pokusę sięgania po niego.

::: info
Sam korzystam z [[tools/hardware/iPhone|iPhone'a]] i [[tools/hardware/iPad|iPada]] w 90% w trybie B&W. Wyjątki stanowią aplikacje Instagrama, aparatu i okazjonalnie serwisów streamingowych.
:::

## Odkrywanie narzędzi

Oprogramowanie i narzędzia starzeją się, dlatego warto sprawdzać alternatywy, otworzyć się na nowe możliwości. Regularne odwiedzanie [ProductHunt](https://producthunt.com), gdzie są prezentowane nowe produkty, może pomóc być na bieżąco. Dodaj PH do swojego feedu RSS.

Ważne jest także **stworzenie przestrzeni fizycznej i mentalnej** na eksperymentowanie z narzędziami (a więc m.in. eliminacja rozpraszaczy) oraz otwarcie się na ewentualne zmiany narzędzi, co może przynieść korzyści w jakości pracy i skuteczności.

## Ustawienia systemowe

- Skonfiguruj **Hyper Key** (`⌘⌥⌃⇧`)
  - [Karabiner-Elements](https://karabiner-elements.pqrs.org/)
- Wyłącz ikony pulpitu
  - `defaults write com.apple.finder CreateDesktop -bool false && killall Finder`
  - Możesz też przypiąć folder `~/Desktop` do systemowego Docka.
- Usuń zbędne ikony z Docka
- Wyłącz zbędne paski zakładek i inne elementy w najczęściej używanych przez Ciebie aplikacjach
- Przyspiesz kursor myszy i aktywuj _Tap to Click_
- Ustaw _Key repeat rate_ i _Delay until repeat_ na maksymalne wartości
- Zainstaluj [[tools/apps/raycast|Raycast]] i ustaw go jako domyślne narzędzie przeszukiwania systemu

## Rekomendowane aplikacje

- [[tools/automation/keyboard-maestro/keyboard-maestro|Keyboard Maestro]] (a jakże)
- Mosaic
  - zarządzanie oknami
  - ja korzystam z [[tools/cli/yabai|yabai]]
- [[Hazel]]
  - zautomatyzowane organizowanie plików na dysku twardym
- [[Dropshare]]
  - zautomatyzowany upload plików na serwer
- BetterTouchTool
  - przydatna jeśli korzysta się z zewnętrznego trackpada

...
