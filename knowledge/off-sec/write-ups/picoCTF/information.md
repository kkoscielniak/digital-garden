---
title: Information
---

[Link to the exercise](https://play.picoctf.org/practice/challenge/186)

## Steps

First, I've checked the filetype with the `file cat.jpeg` command to check if I'm dealing with a JPG file for sure, as I remember in the [[knowledge/off-sec/write-ups/picoCTF/matryoshka-dolls|matryoshka-dolls]] exercise, the attached `dolls.jpg` was, in fact, a PNG.

```
cat.jpeg: JPEG image data, JFIF standard 1.02, aspect ratio, density 1x1, segment length 16, baseline, precision 8, 2560x1598, components 3
```

Then I tried to check for embedded files inside with `binwalk -e cat.jpeg`, but without results. The `strings` command didn't provide anything valuable either.

I forgot to check the EXIF data, so I went with `exiftool cat.jpeg` which responded with:

```
ExifTool Version Number         : 12.30
File Name                       : cat.jpeg
Directory                       : .
File Size                       : 858 KiB
File Modification Date/Time     : 2022:04:21 15:19:08+02:00
File Access Date/Time           : 2022:04:21 15:28:52+02:00
File Inode Change Date/Time     : 2022:04:21 15:19:09+02:00
File Permissions                : -rw-r--r--
File Type                       : JPEG
File Type Extension             : jpg
MIME Type                       : image/jpeg
JFIF Version                    : 1.02
Resolution Unit                 : None
X Resolution                    : 1
Y Resolution                    : 1
Current IPTC Digest             : 7a78f3d9cfb1ce42ab5a3aa30573d617
Copyright Notice                : PicoCTF
Application Record Version      : 4
XMP Toolkit                     : Image::ExifTool 10.80
License                         : cGljb0NURnt0aGVfbTN0YWRhdGFfMXNfbW9kaWZpZWR9
Rights                          : PicoCTF
Image Width                     : 2560
Image Height                    : 1598
Encoding Process                : Baseline DCT, Huffman coding
Bits Per Sample                 : 8
Color Components                : 3
Y Cb Cr Sub Sampling            : YCbCr4:2:0 (2 2)
Image Size                      : 2560x1598
Megapixels                      : 4.1
```

The `License` field looked a bit odd, so I tried to decode it with a [base64 decoder](https://www.base64decode.org), and voila!

## Flag

`picoCTF{the_m3tadata_1s_modified}`
