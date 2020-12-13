+++
title = "My 7-Inch DMR Dashboard"
summary = "I did not like the small screen and the small housing of my last Hotspot so I decided to make a bigger housing where I needed a bigger screen. Look what I got myself up and running, with some major options to control the hotspot just right off the screen itself. Make sure to install the NextionDrivers when you use this layout - it offers way more possibilities."
date = 2020-03-28T12:42:44+01:00
lastmod = 2020-06-07T11:10:12+02:00
tags = ["ham radio","nextion","dmr"]

+++

{{< alert "secondary" >}}
The content of this article may change continuously. Follow the
<a href="/blog/my-7inch-dmr-dashboard/#get-the-files-hmi-and-tft">Github
repository</a> to keep your files up to date.
{{< /alert >}}

## Model and overview

I got a Nextion {{< badge "secondary" >}}NX8048K070_011{{< /badge >}} recently
and I built a DMR Dashboard (again) for this screen. You see the last five
heard stations along with the timestamp (hour, minute), the used timeslot and
the used talkgroup. For your own transmissions the RSSI information as well as
the calculated BER will be displayed.

I've lost a few words about this topic (Nextion) in general on my first post
about my 2.4 inch nextion screen
[in a previous article]({{ relref "/post/nextion-dmr-last-heard-dashboard.md#the-editor" }}).

![Nextion back view / model](/images/post/2020/03/nxt07_00.jpg)

Have a look at the debug preview made within the Nextion Editor. The main screen
is on the left and on the right side you see the system screen, this screen is
for system tasks and you need a working NextionDriver installation to use all
the buttons. Read more about the system screen on the chapter
[Management view](#management-view).

![Screen Debug Preview](/images/post/2020/03/nxt07_01.png)

{{< alert "danger" >}}You will need NextionDriver installed to use
<strong>all the buttons</strong> on the SYSTEM page.{{< /alert >}}

~~I have not tested it yet with Pi-Star v4 but it should work as long as MMDVMHost
runs as root user.~~ Otherwise you should download the HMI files and modify it
in your NextionEditor LTS.

{{< alert "success" >}}
<strong>Update on March 31, 2020</strong><br>
The screen works fine on Pi-Star v4, but without NextionDrivers you won't be
able to use the start/stop buttons on the system page. In fact, you won't be
able to use any buttons that execute code on the linux box. Also the version and
serial number does not get loaded without NextionDrivers.
{{< /alert >}}

Choose Nextion Layout L3 HS on Pi-Star -- the screen runs with 115200 baud.

### Get NextionDriver

- https://github.com/on7lds/NextionDriver

You may also find [NextionDriverInstaller] helpful.

[NextionDriverInstaller]: https://github.com/on7lds/NextionDriverInstaller

## Get the files (HMI and TFT)

Download the files from my github repository.

- https://github.com/freefallcid/MMDVM-Nextion-Screen-Layouts

*Have a look at the **releases** tab as there are more older versions available
(the older layout looks ugly on the system page, but has buttons for
DMRGateway and DAPNETGateway).*

## Management view

By "clicking" the page (mainly the header on the top of the screen) you will see
a management screen with a lot of buttons. I think these are self-explanatory.

Although I hate to say it, but I had to run MMDVMHost as user *root* ---
otherwise the screen went all black. I'd rather like to have MMDVMHost running
as a non-privileged user *mmdvm*. Please let me know if you found a solution to
run MMDVMHost as user *mmdvm* again.

Maybe this is the reason why MMDVMHost runs as root on Pi-Star v4 too.

{{< youtube oGkDzS5MtuA >}}

Above is a short demonstration of the system screen. The Layout might change
in the future, but you might edit the layout on your own. Just retext the
buttons and modify the executed command line.

At the moment the {{< badge >}}SHRINK LOGS{{< /badge >}} button
executes `/usr/local/sbin/shrinklog` and the
{{< badge >}}PHP-DASHBOARD ON{{< /badge >}} and
{{< badge >}}PHP-DASHBOARD OFF{{< /badge >}} buttons execute
`/usr/local/sbin/dashboard start` and `/usr/local/sbin/dashboard stop`
respectively.

Most of the code in `shrinklog` has been taken from Pi-Star, which is why I
won't release that file here, you gonna take the code from Pi-Star and modify
it to your needs. `dashboard` starts and stops `php-fpm` and places (or removes)
an `index.html` file in the webroot so it displays a message, that the dashboard
is offline. Otherwise nginx would display a simple **Bad Gateway** error message.

## Pictures and images

The dashboard looks something like this. On your own transmissions there is also
RSSI and BER information available.

![7 inch dashboard](/images/post/2020/03/nxt07_02.jpg)

The duration of the transmission does not match with the duration on the web
dashboard, but it gives a simple idea of its lenght. I'm not a good programmer
so I'll let this for now.

## Resources

- https://www.on7lds.net/42/nextion-displays
