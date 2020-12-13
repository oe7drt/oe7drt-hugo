+++
title = "Optimizing PNG Images"
summary = "A quick notice about three very handy tools to optimize PNG images on the command line. They work on linux and macOS. Use jpegtran for JPG images."
date = 2020-01-20T20:34:20+01:00
lastmod = 2020-01-23T14:39:06+01:00
tags = ["notes"]

+++

## Optimizing a bunch of images in a directory

I found these commands here coincidentally on a
[pull request](https://github.com/xianmin/hugo-theme-jane/pull/266) at Github.
I found them quite handy ;-)

```
find . -type f -name "*.png"  -print0 | xargs -0 -I {} optipng -nb -nc "{}"
find . -type f -name "*.png"  -print0 | xargs -0 -I {} advpng -z4 "{}"
find . -type f -name "*.png"  -print0 | xargs -0 -I {} pngcrush -rem gAMA -rem alla -rem cHRM -rem iCCP -rem sRGB -rem time -ow "{}"
```

## Quickly optimizing only one image

I've set up a function in my `.zaliases` file for this to be done on a single
image aswell:

``` zsh
function opti() {
  optipng -nb -nc "$*";
  advpng -z4 "$*";
  pngcrush -rem gAMA -rem alla -rem cHRM -rem iCCP -rem sRGB -rem time -ow "$*";
}
```

To run all three commands on a single image I just call it like that:

```
opti image.png
```

That's all the magic it needs.

## Use jpegtran for JPG images.

```
jpegtran -copy none -optimize -progressive -outfile output.jpg input.jpg
```

## Install these tools on your system

On debian or ubuntu

```
sudo apt-get install optipng pngcrush advancecomp
```

On macOS

```
sudo port install optipng pngcrush advancecomp
```

or if you use homebrew

```
brew install optipng pngcrush advancecomp
```

You may know other package managers commands, but I only use these.

## An example

### By filesize

The files taken from the snapshot tool on my macbook.

```
 33K 00_locales.png
 61K 01_control-software.png
157K 02_mmdvmhost.png
184K 03_general.png
187K 04_dmrconfig.png
 69K 05_exp_mmdvmhost-dmrnetwork.png
212K 06_exp_dmrgw-dmrnetwork1.png
236K 07_exp_dmrgw-dmrnetwork2.png
```

Three to four minutes later (all three commands):

```
 17K 00_locales.png
 33K 01_control-software.png
 81K 02_mmdvmhost.png
 98K 03_general.png
 97K 04_dmrconfig.png
 32K 05_exp_mmdvmhost-dmrnetwork.png
127K 06_exp_dmrgw-dmrnetwork1.png
144K 07_exp_dmrgw-dmrnetwork2.png
```

### By view

```
 25K opti_01.png
 13K opti_02.png
```

This is the unmodified image: `opti_01.png`

![Original image](/images/post/2020/01/opti_01.png)

And this is the optimized image: `opti_02.png`

![Original image](/images/post/2020/01/opti_02.png)

Do you see much difference?
