+++
title = "APRS With The Hytera Pd785g And It's New Firmware v9"
summary = "The short way of how I did this setup because it is a bit different than the ones that I've seen for the older firmware version V8."
date = 2020-01-27T17:34:01+01:00
tags = ["dmr","ham radio","aprs","hytera"]

+++

I've read many articles about the Hytera PD785G, APRS, GPS, IPSC2, DMR+,
Brandmeister and what not...

These are the settings that I currently run with.

## GPS settings

These settings remain the same as on the v8 firmware.

![GPS settings](/images/post/2020/01/hyt_01_gps.png)

Also this remains the same -- make sure to disable *Quick GPS* and enable
*RSSI Report*.

![GPS settings](/images/post/2020/01/hyt_02_gps.png)

You do not really need the other settings. On incoming calls *Call Location*
will show the location of other stations on the display. *Voice with Location*
sends your own location info out with your voice. This is needed for
*Call Location*.

## Network settings

Set the Control Center ID to `9057` if you want to appear as portable device.

![network settings](/images/post/2020/01/hyt_03_network.png)

You can also use any of those number-symbol combinations.

| RRS & Radio IDs | description          |
| :---            | :---                 |
| 9050            | without SSID         |
| 9055            | house / QTH          |
| 9056            | camping / fieldday   |
| 9057            | handheld transceiver |
| 9058            | mobile / boat        |
| 9059            | mobile / car         |

## Channel settings

Setup the channel like this. Just make sure to set {{< badge >}}Location Info
Revert Channel{{< /badge >}}. I did not select {{< badge >}}IP Multi-site
Connect{{< /badge >}} and I also did not select an {{< badge >}}RRS Revert
Channel{{< /badge >}}. I am not 100% sure, but I think the *RRS Revert Channel*
is what makes your HT send your position out when you change channels.

![channel settings](/images/post/2020/01/hyt_04_channel.png)

You can also set {{< badge >}}Slot Operation{{< /badge >}} to {{< badge >}}Pseudo
Trunk{{< /badge >}} -- that would let you hear statically linked talkgroups of
another timeslot too.

## Buttons

Did you set {{< badge >}}Button{{< /badge >}} as a GPS Trigger? Then you want
to configure a button here.

![buttons settings](/images/post/2020/01/hyt_05_buttons.png)

## Basic settings

For what I have tested this works quite well. Although [Brandmeister
recommends][bm] to set the {{< badge >}}Data Bearer Service{{< /badge >}} to
{{< badge >}}Compressed IP{{< /badge >}} if you want to use text messaging.

[bm]: https://wiki.brandmeister.network/index.php/Hytera/Radios#Text_Messaging

![basic settings](/images/post/2020/01/hyt_06_basic.png)

## Examples

In-call location information does not contain an SSID. That means, that your
location is transferred as your plain CALLSIGN, without the `-7` for
{{< badge >}}9057{{< /badge >}}.

The route looks like this when transmitted as CALLSIGN-7.

![route with the ssid 7](/images/post/2020/01/hyt_08_aprs_route_9057.png)

The route looks like that when no SSID is appended to the CALLSIGN.

![route without ssid](/images/post/2020/01/hyt_07_aprs_route_9050.png)

When transmitted with SSID a location point looks like this:

![location with ssid](/images/post/2020/01/hyt_09_aprs_ssid_working.png)

and without SSID:

![location without ssid](/images/post/2020/01/hyt_10_aprs_ssid_notworking.png)

There is usually only a red dot marker and not a house. The house replaced
the red dot when I tried new APRS settings with my Openspot2 -- which sended
out a beacon for my callsign only. This might not be compatible to each other --
time will tell...

![hotspot beacon](/images/post/2020/01/hyt_11_aprs_ssid_hotspot.png)

In case you don't know that site yet, there is also <https://aprsdirect.com> as
an alternative to <https://aprs.fi> -- I love the realtime raw package feed.
I use them both here and there.

![aprsdirect.com station info](/images/post/2020/01/hyt_12_aprsdirect.png)
