+++
title = "Error with signed commits"
summary = "This basically enabled signed commits for me again."
date = 2020-11-14T23:22:42+01:00
tags = ["til-git"]

+++

For some reason my git commits failed when I re-enabled gpg signing. This is how
I finally fixed that problem.

**Add to `~/.gnupg/gpg.conf`**

```
use-agent 
pinentry-mode loopback
```

**And add to `~/.gnupg/gpg-agent.conf`**

```
allow-loopback-pinentry
```

**Restart the agent**

```
echo RELOADAGENT | gpg-connect-agent
```

This information was found on [d.sb/2016/11/gpg-inappropriate-ioctl-for-device-errors][1].

[1]: https://d.sb/2016/11/gpg-inappropriate-ioctl-for-device-errors
