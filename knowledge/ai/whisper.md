---
title: Whisper
---

_Whisper_ - A speech recognition model by OpenAI.

## Create transcription for the mp4 video

::: warning
`mp3` file can't be bigger than 25MB
:::

```zsh
#!/bin/zsh

# filename: transcribe.sh

OPENAI_API_KEY="..."

ffmpeg -i $1 -vn -ab 160k -ar 44100 -y output.mp3

curl -X POST https://api.openai.com/v1/audio/transcriptions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: multipart/form-data" \
  -F file="@output.mp3" \
  -F model="whisper-1" \
  -F response_format=srt # Adds timing metadata to the response
```

Usage:

```sh
chmod +x transcribe.sh
./transcribe.sh video_file.mp4 > output.txt
```
