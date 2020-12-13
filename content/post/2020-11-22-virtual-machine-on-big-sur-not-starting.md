+++
title = "My virtual windows machine from VirtualBox on Big Sur will not start"
summary = "A quick fix if your virtual machine will not start. As long, as you got the same configuration as me"
date = 2020-11-22T18:02:45+01:00
tags = ["macos","big sur","virtualbox"]

+++

Okay, a quick one. I've updated my macbook now to Big Sur today. A lot of files
have been copied and moved and written and so on -- I think that update was
something around 12 GB of files to download...

So my virtual windows machine won't start. With a quick Google search I found some
hints, that the kernel drivers will not load or something like that. A few posts
below I read something about the System Protection of macOS and read on a bit.

Now to make things short: I restarted the macbook, went straight into recovery
mode and fired up the terminal.

The command `csrutil status` told me, that my system was in an undefined state.
I'm not sure what I changed here on the last major macOS version but it printed
a few changes and something that I did not read completely. I just enabled the
protection system as suggested on the forums before and rebootet the system again.

To enable Apples protection system, type this command:

```bash
csrutil enable
```

After that, type `reboot` and hit enter.

This fixed it for me and I am now able to run my virtual windows machine. But: I
still cannot open my NFS shares on my Raspberry Pi yet.
