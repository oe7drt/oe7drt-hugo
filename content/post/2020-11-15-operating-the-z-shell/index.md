+++
title = 'Operating the Z-Shell'
summary = 'The Z-Shell. I love it in combination with Prezto.'
date = 2020-11-15T00:35:22+01:00
tags = ["til-zsh"]

+++

This article is a summary of
[reasoniamhere.com/.../outrageously-useful-tips-to-master-your-z-shell/][1].
The original article is from 2014 and the pages last entry is from 2015. In case
the website goes down I want the important bits saved for my reading and learning
pleasure ;-)

*None of the following commands on this page are my own.*

[1]: https://reasoniamhere.com/2014/01/11/outrageously-useful-tips-to-master-your-z-shell/

## File picking

```shell
# list every file directly below the Sites folder
ls Sites

# list every file in the folders directly below the Sites folder
ls Sites/*

# list every file in every folder two levels below the Sites folder
ls Sites/*/*

# list every file anywhere below the Sites folder
ls Sites/**/*

# list every file that ends in .txt in every folder at any level below the Sites folder
ls Sites/**/*.txt
```

## Glob operators

```shell
# list text files that end in a number from 1 to 10
ls -l Sites/**/*<1-10>.txt

# list text files that start with the letter a
ls -l Sites/**/[a]*.txt

# list text files that start with either ab or bc
ls -l Sites/**/(ab|bc)*.txt

# list text files that don't start with a lower or uppercase c
ls -l Sites/**/[^cC]*.txt
```

## Glob qualifiers

```shell
# show only directories
print -l Sites/**/*(/)

# show only regular files
print -l Sites/**/*(.)

# show empty files
ls -l Sites/**/*(L0)

# show files greater than 3 KB
ls -l Sites/**/*(Lk+3)

# show files modified in the last hour
print -l Sites/**/*(mh-1)

# sort files from most to least recently modified and show the last 3
ls -l Sites/**/*(om[1,3])
```

```shell
ls -l Sites/**/*(.Lm-2mh-1om[1,3])
# you won't typically write at this level of obfuscation

ls -l Sites/**/*(. Lm-2 mh-1 om [1,3])
# this is more parseable, but unfortunately Zsh doesn't allow spaces
# between qualifiers, so you'll get an error
```

[Read more](http://zsh.sourceforge.net/Doc/Release/Expansion.html#Filename-Generation) in section 14.8.7 of the manual.

## Modifiers

Modifiers are preceded with a colon (`:`).

```shell
# A plain old glob
print -l Sites/website/images/gif/*.txt

# Return the file name (t stands for tail)
print -l Sites/website/images/gif/*.txt(:t)

# Return the file name without the extension (r stands for remove_extension, I think)
print -l Sites/website/images/gif/*.txt(:t:r)

# Return the extension
print -l Sites/website/images/gif/*.txt(:e)

# Return the parent folder of the file (h stands for head)
print -l Sites/website/images/gif/*.txt(:h)

# Return the parent folder of the parent
print -l Sites/website/images/gif/*.txt(:h:h)

# Return the parent folder of the first file
print -l Sites/website/images/gif/*.txt([1]:h)
# Remember you can combine qualifiers and modifiers.
```
