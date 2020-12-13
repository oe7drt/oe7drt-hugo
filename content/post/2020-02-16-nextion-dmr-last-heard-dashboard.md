+++
title = "My Nextion 2.4\" DMR Last Heard Dashboard"
summary = "I created a simple last-heard-dashboard for my small Nextion screen. It currently shows the used slot, its origin (like Network or RF) , the callsign and the used talkgroup."
date = 2020-02-16T12:43:34+01:00
tags = ["ham radio","nextion","dmr"]

+++

## The display

When I got the display there was already a Screen Layout installed --- it was
probably the Layout of [PD0DIB].

[PD0DIB]: https://github.com/PD0DIB/Nextion_HAM-radio-screens/tree/master/MODEL%208/GLOBE

We're talking about a {{< badge "secondary" >}}NX3224T024_011{{< /badge >}}.

![display](/images/post/2020/02/nxt_01_display.jpg)

My dashboard now looks like this:

![display](/images/post/2020/02/nxt_01_display-lh.jpg)

The number on the bottom right corner displays the actual status code sent by
the MMDVMHost binary. A list of these codes can be seen [here].

[here]: https://github.com/WA6HXG/MMDVM-Nextion-Screen-Layouts/blob/master/Info%20Sheets/Status%20Codes%20and%20Fields.txt

Also have a look at the debug output within the Nextion Editor. You get to the
second screen (SYSTEM screen) by touching/pressing the header of the dashboard.
Within the system screen you can clear the dashboard.

![overview](/images/post/2020/02/nxt_02_screens.png)

## The editor

The most HMI files I found online were made with the older version of Nextion
Editor --- v53. It is the Nextion Editor LTS version. It is available on
[nextion.tech](https://nextion.tech/nextion-editor/).

For the editor to work you need to install a Microsoft Visual C++
Redistributable Package --- Nextion Editor is a 32bit application, so choose
the 32bit version (`vc_redist.x86.exe`).

## TFT files and HMI files

I'm no professional and this is the way I look at these things. For me HMI files
are source files. You can open them with Nextion Editor and edit them just right
away. Whereas TFT files cannot be "opened" with the Nextion Editor, they have to
be opened **with no open project** by clicking the
{{< badge >}}Debug{{< /badge >}} button (next to the Compile button). They get
loaded into the simulator and you can preview the file.

**TFT files are the compiled output of HMI files.**

## Get the files

I've setup a repository on Github for my screen --- for now there is one layout
online. It only displays a last heard table with callsign and talkgroup for DMR.
I'd like to have this for a bigger screen but I'm not sure when I'll find the
time for it.

- <https://github.com/freefallcid/MMDVM-Nextion-Screen-Layouts>

What the actual dashboard looks like.

{{< youtube uqIErzgr3zQ >}}

## Resources

{{< alert "secondary" >}}
This section will be updated from time to time.
{{< /alert >}}

I've found several resources that I want to list in no particular order here.

- https://www.hamdigitaal.nl/download/algemene-informatie/Setup-a-MMDVM-Hotspot-20161212.pdf
- https://github.com/WA6HXG/MMDVM-Nextion-Screen-Layouts
- https://github.com/PD0DIB/Nextion_HAM-radio-screens
- 
