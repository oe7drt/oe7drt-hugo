+++
title = "Mountint Ext4 Filesystem On MacOS Readonly"
summary = "An overview of how to mount your Pi-Star sdcard on a mac machine."
date = 2020-02-22T09:33:44+01:00
tags = ["pi-star","macos"]

+++

## Installing the needed tools

```
brew cask install osxfuse
brew install ext4fuse
```

## Mount the disk on your filesystem

```
ext4fuse /dev/disk2s2 pi-star
```

## Users, groups, write permissions etc.

If you feel that you have to add yourself to another usergroup, then do that
as the following code suggests:

```
sudo dseditgroup -o edit -a $username -t user $groupname
```
