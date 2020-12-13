+++
title = "Hs Dual Hat With PiStar v4"
summary = "This is a MMDVM_HS_Dual_Hat hotspot in duplex mode with DMRGateway and an actual Pi-Star image. In this setup I use **DMR+_IPSC2-OE-DMO** and **BM_Germany_2622** as master servers. I also use **DAPNET** and **PiStar Remote**."
date = 2020-01-23T15:03:35+01:00
lastmod = 2020-02-15T18:05:40+01:00
tags = ["dmr","mmdvm","pi-star","ham radio"]

+++

I've been playing with Pi-Star now for a while and I finally got my
IPSC2-Brandmeister dual-setup working.

I'm using the beta version v4 because I read somewhere, that DUAL-HATS won't
work properly with the older v3 firmware -- but I never really tested the v3.
Instead I went for v4 straight away as it seemed pretty stable anyway.

Now, I began with a very simple IPSC2-only setup in the first place. I then made
a backup and changed all settings to be used for Brandmeister only. Another backup
of the Brandmeister setup and I moved on to using DMRGateway.

It was a bit tricky at the beginning, because I was not used to the configuration
of such devices in any kind. After a few hours of research and testing I finally
got the DMR-GW setup ready.

Those pages helped me a lot when I researched for this topic. There might be
more but...

<http://ham-dmr.at/index.php/download/#panel-340-0-0-3>  
There are plenty of instructions on how to setup different things like DVMEGA,
Openspots, Jumbospots etc. Even [code plugs] can be downloaded. The website is
maintained by the Austrian DMR team, the Austrian amateur radio leage ÖVSV and
Michi OE8VIK. Just read along, there is shitload of information.

[code plugs]: http://ham-dmr.at/index.php/download/#panel-340-0-0-0

<https://www.youtube.com/channel/UCw2IvlJcK9kXzn32xI7XB0Q/videos>  
This is the youtube channel of Michi OE8VIK / HB3YZE with tons of information
about digital amateur radio.

<https://www.youtube.com/channel/UC6Us7z_gkxNKc0PcCuS7fYQ/videos>  
The youtube channel of Winters Huang BI7JTA. He writes also on his [blog]. If
you want a nice duplex hotspot with fancy acrylic "L" case and nextion display
you want to have a look at [his shop].

[blog]: https://mmdvm.bi7jta.org/
[shop]: https://www.bi7jta.org/cart/

{{< alert "secondary" >}}
This part gets probably updated from time to time. At least as long new websites
come back to my memory ;-)
{{< /alert >}}

## The first thing I did on Pi-Star

Setup the keyboard and language on the console. I mostly type in german and I
know most of the characters on an en_US or en_UK keyboard, but I still prefer
a german layout ;-)

Before we start, we have to make the filesystem writable. Do this with the
command alias `rpi-rw` either in a console or in the SSH-Access tab on the
dashboard (Configuration -> Expert -> SSH Access). The login details for SSH are
the same as on the dashboard.

Now you got the filesystem writable, so start the keyboard configuration:

```
sudo dpkg-reconfigure keyboard-configuration
```

I then usually go for the 105-key PC one. Choose German (Austria) and go for the
default keyboard layout with no compose key -- except you have other needs.

Then start generating the locales for your environment.

```
sudo dpkg-reconfigure locales
```

Choose the locales that you need or want. My setup looks like this:

![locales setup](/images/post/2020/01/00_locales.png)

If you don't know what to choose, go with your language and the UTF-8 version.

I also create my ssh-keys for passwordless login as well as some comfortable
aliases. I usually use the ZSH shell, but on Pi-Star I just leave it as it was.
I add my aliases to `.bash_aliases` -- this is the file that gets sourced via
`.bashrc` in the default pi-star setup.

Quick and dirty -- my current `.bash_aliases` on my Pi-Stars looks like this:

``` bash
DATE=$(date +%Y-%m-%d)
PI=/var/log/pi-star/
DMRGW=${PI}DMRGateway-${DATE}.log
MMDVM=${PI}MMDVM-${DATE}.log
DAPNET=${PI}DAPNETGateway-${DATE}.log

[ -x /usr/bin/pydf ] && alias df='/usr/bin/pydf' || alias df='df -h'

alias digg='dig +noall +answer'
alias dt='dmesg | tail'

alias mm="multitail ${DMRGW} ${MMDVM}"
alias mmdmr="multitail ${DMRGW}"
alias mmdv="multitail ${MMDVM}"
alias mmdap="multitail ${DAPNET}"

# Screen and Tmux alike
alias sc='screen -DR Screen_A'
alias tm='tmux -u new-session -A -s Tmux_A'

# ls
alias l='ls -1A'
alias la='ls -lah'
alias lc='lt -c'
alias lk='ll -Sr'
alias ll='ls -lh'
alias lad='ls -lah|more'
alias lld='ls -lh|more'
alias lm='la | "$PAGER"'
alias ln='nocorrect ln -i'
alias lni='nocorrect ln -i'
alias locate='noglob locate'
alias lr='ll -R'
alias ls='ls --group-directories-first --color=auto'
alias lt='ll -tr'
alias lu='lt -u'
alias lx='ll -XB'

alias ducks='du -cks * | sort -rn | head'

alias confcat="sed -e 's/#.*//;/^\s*$/d' "$@""
```

### Optional

More software that comes in handy from time to time.

```
sudo apt-get install htop lsof nmap arping vnstat vim pydf multitail
```

`pydf` in combination with the alias from above displays a short and colored
output when you list your diskspace with `df`.

![an example output of `pf`](/images/post/2020/01/11_df_output.png)

#### If you intent to install and use vnstat, you need to set it up

The installation of vnstat is useful, if you let your pi-star run 24/7 as the
database gets cleared on every reboot!

Add the following line to your `/etc/fstab` file -- I assume that you still
have the filesystem writable.

```
tmpfs  /var/lib/vnstat  tmpfs nodev,noatime,nosuid,mode=1777,size=4m  0  0
```

If you run `cat /etc/fstab` it should look similar to this:

``` shell
#File System    Mountpoint              Type  Options                                   Dump  Pass
proc            /proc                   proc  defaults                                  0     0
/dev/mmcblk0p1  /boot                   vfat  defaults,ro                               0     2
/dev/mmcblk0p2  /                       ext4  defaults,noatime,ro                       0     1
tmpfs           /run                    tmpfs nodev,noatime,nosuid,mode=1777,size=32m   0     0
tmpfs           /run/lock               tmpfs nodev,noatime,nosuid,mode=1777,size=5m    0     0
tmpfs           /sys/fs/cgroup          tmpfs nodev,noatime,nosuid,mode=1755,size=32m   0     0
tmpfs           /tmp                    tmpfs nodev,noatime,nosuid,mode=1777,size=64m   0     0
tmpfs           /var/log                tmpfs nodev,noatime,nosuid,mode=0755,size=64m   0     0
tmpfs           /var/lib/sudo           tmpfs nodev,noatime,nosuid,mode=1777,size=16k   0     0
tmpfs           /var/lib/dhcpcd5        tmpfs nodev,noatime,nosuid,mode=1777,size=32k   0     0
tmpfs           /var/lib/vnstat         tmpfs nodev,noatime,nosuid,mode=1777,size=4m    0     0
tmpfs           /var/lib/logrotate      tmpfs nodev,noatime,nosuid,mode=0755,size=16k   0     0
tmpfs           /var/lib/nginx/body     tmpfs nodev,noatime,nosuid,mode=1700,size=1m    0     0
tmpfs           /var/lib/php/sessions   tmpfs nodev,noatime,nosuid,mode=0777,size=64k   0     0
tmpfs           /var/lib/samba/private  tmpfs nodev,noatime,nosuid,mode=0755,size=4m    0     0
tmpfs           /var/cache/samba        tmpfs nodev,noatime,nosuid,mode=0755,size=1m    0     0
tmpfs           /var/spool/exim4/db     tmpfs nodev,noatime,nosuid,mode=0750,size=64k   0     0
tmpfs           /var/spool/exim4/input  tmpfs nodev,noatime,nosuid,mode=0750,size=64k   0     0
tmpfs           /var/spool/exim4/msglog tmpfs nodev,noatime,nosuid,mode=0750,size=64k   0     0
```

Normally, vnstat creates `/var/lib/vnstat` and starts the vnstat service. We now
delete the freshly created databases (they are nearly empty anyway) and
re-create them when we have mounted the ramdisk.

```
sudo rm /var/lib/vnstat/*
sudo mount -a
sudo systemctl restart vnstatd
```

Now run `vnstat` to display network interface statistics. It's output could
look similar to this one:

```
                      rx      /      tx      /     total    /   estimated
 eth0: Not enough data available yet.
 wlan0:
       Jän '20     39,23 MiB  /   39,10 MiB  /   78,33 MiB  /  106,00 MiB
         today     39,23 MiB  /   39,10 MiB  /   78,33 MiB  /     138 MiB
```

It takes time to gather enough information. Get back to this in a few days and
you will get more useful information. Because we save the databases in the
ramdisk, we will save the sdcards lifetime, but also we loose the statistics
when we reboot the raspberry pi.

{{< background "warning" >}}
If you want to save them forever, you won't have
to create a ramdisk like above, but <strong>you also have to make sure that
PiStar does not mount the volumes read-only!</strong>
{{< /background >}}

## Make the filesystem read-only again

Once you finished your setup, make the filesystem read-only again.

```
rpi-ro
```

## Start setting up your Pi-Star MMDVM

{{< background "warning" >}}
<strong>Very very very important information</strong><br>
The MMDVM services restart every time you hit
the {{< badge >}}Apply Changes{{< /badge >}} button. So when hitting the button
wait a few seconds &ndash; this takes some time to complete ;-)
{{< /background >}}

### Talkgroup setup

This setup uses some talk groups from IPSC2/DMR+ and the rest from Brandmeister.
Specifically these talkgroups are:

- {{< badge "secondary" >}}Timeslot 1{{< /badge >}}
  - {{< badge "primary" >}}TG 1{{< /badge >}} -
    {{< badge "primary" >}}TG 7{{< /badge >}}
  - {{< badge "primary" >}}TG 10{{< /badge >}} -
    {{< badge "primary" >}}TG 89{{< /badge >}}
  - {{< badge "primary" >}}TG 100{{< /badge >}} -
    {{< badge "primary" >}}TG 199{{< /badge >}}
- {{< badge "danger" >}}Timeslot 2{{< /badge >}}
  - DMR+ reflectors with {{< badge "primary" >}}TG 9{{< /badge >}}
  - {{< badge "primary" >}}TG 232{{< /badge >}}
  - {{< badge "primary" >}}TG 8181{{< /badge >}} -
    {{< badge "primary" >}}TG 8189{{< /badge >}}
  - {{< badge "primary" >}}TG 8191{{< /badge >}} -
    {{< badge "primary" >}}TG 8199{{< /badge >}}
- {{< badge "success" >}}GPS data{{< /badge >}} sent as private calls
  to {{< badge "primary" >}}9057{{< /badge >}}

All other talkgroups are routed to the Brandmeister network. Private calls are
also routed to Brandmeister.

### Simplex or Duplex?

This is where we actually start. At the first start either connect your
Raspberry Pi to an ethernet port or look out for a WiFi network called
Pi-Star Setup.

![Control Software configuration](/images/post/2020/01/01_control-software.png)

Make sure to use Duplex Repeater in order to use different RX and TX frequencies.

### MMDVMHost

![MMDVMHost configuration](/images/post/2020/01/02_mmdvmhost.png)

Choose the modes that you want to use. I only use DMR and POCSAG for now.

### General information about the station

![general information](/images/post/2020/01/03_general.png)

Put in your own callsign and your DMR-ID --
[register your callsign](https://register.ham-digital.org/) if you don't have
one yet. Select appropiate frequencies and make sure they are at least a few
MHz apart from each other. I used the common shift that we use in Austria
on 70cm (-7.6 MHz).

### DMR configuration

{{< background "warning" >}}
Now, setup IPSC2 only or Brandmeister only if you are unsure about the
DMRGateway setup. Make yourself comfortable with both of the systems but only
one system at a time and move over to DMRGateway when you feel confident enough.
The rewrite rules can be sometimes a bit tricky to set up.
{{< /background >}}

![DMR configuration](/images/post/2020/01/04_dmrconfig.png)

Choose the Brandmeister master server you want to connect to. Also set a
password in [Brandmeisters SelfCare](https://brandmeister.network/?page=selfcare)
for Hotspot Security. That makes sure, that only you can add a Hotspot with your
callsign. Also select the IPSC2 server of your choice and set the wanted
options. I go with these:

```
StartRef=4197;RelinkTime=15;UserLink=1;TS2_1=232;TS2_2=8189;
```

In this scenario I want to statically link the two talk groups `232` and `8189`
on timeslot 2. I also allow `UserLink` which allows users to link to different
reflectors. The default reflector is `4197` and this gets relinked if nobody
presses PTT for 15 minutes. If you need talk groups from timeslot 1 you would
probably write something like this:

```
StartRef=4197;RelinkTime=15;UserLink=1;TS1_1=20;TS2_1=232;TS2_2=8189;
```

That will also include talk group 20 from timeslot 1. I thought you can
statically link up to 5 talkgroups, but I'm not sure if this information is up
to date (I haven't tried this yet, but you can do that on your own very easy).

### Move over to the expert configuration tab

#### Quick edit

Whenever you feel comfortable with DMRGateway, head over to the expert settings
page and select MMDVMHost. I've adjusted the Jitter settings "a bit", although
this should run smooth with a setting of `1000` too -- I'm still a bit of
experimenting with this. I read a lot of times that `1000` should be fine with
slower networks -- but you should definitely experiment yourself a bit with this
setting.

![DMR jitter configuration](/images/post/2020/01/05_exp_mmdvmhost-dmrnetwork.png)

Now let's have a look at the DMR Gateway configuration. Navigate to the DMR GW
expert settings. Choose **DMR GW** of the upper line (Quick Edit).

![DMR Network 1 configuration](/images/post/2020/01/06_exp_dmrgw-dmrnetwork1.png)

![DMR Network 2 configuration](/images/post/2020/01/07_exp_dmrgw-dmrnetwork2.png)

Don't forget to save the settings.

#### Full edit

When you have saved that, go to the expert settings again and choose again
**DMR GW** -- **but this time, choose the one from the lower line (Full Edit)**.

This configuration file is split into paragraphs. Look out for the
**\[DMR Network 1]** block.

```
[DMR Network 1]
Enabled=1
Address=178.238.234.72
Port=62031
TGRewrite0=2,8,2,8,1
PCRewrite0=2,84000,2,84000,1001
TypeRewrite0=2,9990,2,9990
SrcRewrite0=2,84000,2,8,1001
PassAllPC0=1
PassAllTG0=1
PassAllPC1=2
PassAllTG1=2
Password="***"
Debug=0
Id=232718001
Name=BM_Germany_2622
```

Our next block is called **\[DMR Network 2]**.

```
[DMR Network 2]
Enabled=1
Address=89.185.97.34
Port=55555
TGRewrite0=1,1,1,1,7
TGRewrite1=1,10,1,10,80
TGRewrite2=1,100,1,100,100
TGRewrite3=2,232,2,232,1
TGRewrite4=2,8181,2,8181,9
TGRewrite5=2,8191,2,8191,9
TGRewrite6=2,9,2,9,1
PCRewrite0=1,9055,1,9055,6
PCRewrite1=2,9055,2,9055,6
PCRewrite2=2,4000,2,4000,1001
Password="PASSWORD"
Debug=0
Id=2327180
Name=DMR+_IPSC2-OE-DMO
Options="StartRef=4197;RelinkTime=15;UserLink=1;TS2_1=232;TS2_2=8189;"
```

[Read along here](https://github.com/g4klx/DMRGateway/wiki/Rewrite-Rules)
if you want to know more about the different rewrite rules.

### POCSAG configuration

{{< background "warning" >}}
<strong>Info:</strong> The following frequency is used in Austria. Please
refer to your local amateur radio club for information about the used
frequencies in your country. You may use 439.987.500 in Germany.
<a href="https://hampager.de/dokuwiki/doku.php?id=dapnetfrq">See here</a> for
more frequencies.
{{< /background >}}

![POCSAG configuration](/images/post/2020/01/10_pocsag.png)

Read more on <https://hampager.de> and on <https://support.hampager.de>. You
need to create an account to bind your callsign to a RIC. You also need a
second account for your transmitter - that is when you get your AuthKey.

## That's it - images and videos

I suppose this gets easier from time to time -- depending on how often I have to
install this stuff on a Pi :-)

### My Raspberry Pi 3 B

![my raspberry pi 3](/images/post/2020/01/08_raspberrypi.jpg)

### And this is the admin page of the dashboard

If you want to use the Brandmeister Manager you need to set the api key. Go to
expert settings and choose **BM API** in the lower line. It is somewhat in the
middle of the page. To get an api key visit the
[Brandmeister API Keys page](https://brandmeister.network/?page=profile-api).

![Dashboard - Admin view](/images/post/2020/01/09_dashboard-admin.png)

There are some more handy links for Brandmeister:

- [list connected hotspots to the Austrian BM_2321 server][list]
- [last heard on this specific master server][lh]

[list]: http://94.199.173.125/status/list.htm
[lh]: https://brandmeister.network/?page=lh&Master=2321

### PiStar Remote

Restart the PiStar services with RF power from your HT.

{{< youtube lTh1p-eVGxQ >}}

Or reboot the whole Raspberry Pi.

{{< youtube hFyEL6kfRco >}}

To make use of PiStar Remote you need to set it up. Go to *Configuration ->
Expert* and choose *PiStar Remote* (in the Full Edit line).

```
[enable]
# Is the Pi-Star Remote Enabled? (true|false)
enabled=true

...

[dmr]
# TG commands
#svckill=8999999
svcrestart=8999998
reboot=8999997
#shutdown=8999996
#hostfiles=9999995
```

## Final words

I think this whole article is a *work in progress* -- I just always find things
that I do different now and I cannot always change these things in this article
too; some aren't even wrong, they just fit better.

I think this page is a good thing to look back to start a fresh configuration --
even if I have made different configuration backups from within PiStar.
Addidionally I made one-to-one copies of the used sdcards -- just in case ;-)

Initially I wrote this for myself, but I think this might be helpful for others
too so enjoy the content and feel free to mail me if you find errors or have
to add some notes on that topic.
