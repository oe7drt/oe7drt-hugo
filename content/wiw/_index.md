+++
title = "Wake Island Warriors"
summary = "Years ago we all played a game called Battlefield 2. The game bound us together as a team, or, as a family."
date = 2019-01-21T11:14:30+01:00
lastmod = 2020-01-27T23:51:19+01:00
#tags = ["wiw","games"]
tags = []

+++

*Years ago we all played a game called Battlefield 2. The game bound us together
as a team and family.*

![wiw site logo sepia](/images/wiw-logo-sepia.jpg)

{{< alert "secondary" >}}
<strong>Migration status</strong><br>
This page looks good but I might have forgotten something. Please <a
href="/about/#contact">report errors or bugs to me</a>. Thank you!<br><br>
<strong>Deutsche Version</strong><br>
Es wird <strong>keine deutsche Version</strong> dieser Seite geben. Der Clan
sprach englisch, und so wird auch diese Seite publiziert.
{{< /alert >}}

## I became member

I myself started to be a member of
[**=WiW=**](http://www.wakeislandwarriors.eu/forum/) back in 2010, specifically
on May 20<sup>th</sup> 2010, when I was
[granted the membership](https://web.archive.org/web/20100524010630/http://www.wakeislandwarriors.com/community/viewforum.php?f=5)
(uhm, sorry the post itself is not available on the wayback archive) of the best
community that I can still remember. My old computer served me well for a while
--- it was one of the first 64bit beasts that came out at that time.

When time went by, I started paying the admin fee for the clan and became one of
the admins. It made things a bit easier as I was able to remove rule-breakers by
myself but it also made things a bit more complicated than before --- I had to
know the regular players better to know if someone is reporting a rule-breaker
because he broke a rule or just for his own advantage. This went on for a few
weeks or months and settled down with the time. I got more and more relaxed at
playing and administration of the game felt more easier and made fun again. Also
watching other players for a while wasn't that bad --- it felt good to do a good
thing beside playing the game. I think everyone benefits from good admins.

{{< youtube 2fd2vgkM8nY >}}

## I became head-admin

=WiW= did some re-structuring in its hierarchy and I got the role of the
head-admin. This happened around the last epoche of BF2, if not the beginning of
BF3. I can remember a shitload of talk about good and bad admining on the BF3
Karkand map. Hell, was it a pain every and every time again. Anyway, also on BF3
we got some good servers up and running for quite a while --- you've seen when
people were present and when our lifes at home needed us more than the game.

At the time of BF3 we had a third server for a short time --- I enjoyed the SQDM
(Squad Death Match) rounds with you guys a lot. Shit, I started getting good at
that game --- which wasn't the case back in BF2 times.

{{< youtube njJ6uYQdveA >}}

The next video shows a few guys with no luck. But neither had I luck --- my team
did not help me much.

{{< youtube h26dA_pB_sM >}}

*If you like, watch my
[Battlefield 2](https://www.youtube.com/playlist?list=PLAVuOpof7vDrLj6gNgPIAde6CLZC5CoCy)
or [Battlefield 3](https://www.youtube.com/playlist?list=PLAVuOpof7vDoNS_1ECqkx5XusLjI7CjMM)
playlists on YouTube --- I'm going forward in history and tell you the rest of
the story so you can read on.*

## I became recruiter

With beeing head-admin for a while, I got asked to join the recruitment team ---
which consisted of Niels and Bange at that moment (I think Spocki already left,
but I'm not really sure about that right now). Time went by with playing and
recruiting new members mostly on BF3 but also sometimes on BF2, still. 

Anyway, Bange was pushed towards the Mods group and Sanna joined the recruitment
team. I created two tools at that time:

- [WiW Trial Handout Generator](#)  
  creates a pre-defined text that recruiters post when a new member is granted
  a trial period
- [WiW RCON Chat](#)  
  a tool made to properly read and filter out logfiles from
  [rconnet.de](http://rconnet.de)[^rconnet].

{{< alert >}}
These pages have to be created first. You can still <a
href="https://dominicreich-old.netlify.com/portfolio/software/#wiw-rcon-chat">browse them on my older website</a>.
{{< /alert >}}

To follow time I felt the need to leave the clan. I had not enough free time to
bring into the community. I stepped back from recruiting and Morphoes took place.
From then I was normal clan member without the need of any hassle to bring or
not to bring into --- not that anyone would have told me to bring, but this was
my own decision to take away some stress that I would probably just make myself.

*Puh, that wording was not good, but I have no idea how to put that together that
it actually makes sense*

## I left the clan (not)

I never left the clan officially[^clan] --- but in fact I wasn't that present in
the clan around the 23<sup>rd</sup> of November 2014.

## Website mirror

On December 6<sup>th</sup>, 2014 I went totally insane and copied nearly the
whole wake island warriors website to my webserver --- to host a personal copy
of the forum of that time. To produce a copy of the website, I used httrack and
this piece of command line input:

``` shell
$ httrack 'http://www.wakeislandwarriors.com/forum/ucp.php?mode=login?>postfile:websites/hts-post0' \
  -O '/home/dominic/websites/wiw' -'*' -'mime:*/*' \
  +'mime:text/html' +'mime:image/*' \
  +'www.wakeislandwarriors.com/forum/viewforum.php?f=*' \
  +'www.wakeislandwarriors.com/forum/viewtopic.php?f=*' \
  +'www.wakeislandwarriors.com/forum/memberlist.php?mode=viewprofile&u=*' \
  +'www.wakeislandwarriors.com/forum/index.php' \
  +'www.wakeislandwarriors.com/forum/*.gif*[<100]' \
  +'www.wakeislandwarriors.com/forum/*.png*[<100]' \
  +'www.wakeislandwarriors.com/forum/*.jpg*[<100]' \
  +'tmsn.at/*.png*[<100]' +'*/*.css*[<100]' \
  -T60 -R2 -%v -%c1 -c4 -o \
  -F 'Mozilla/5.0 (X11; Operatoah Systemz; Linux x86_64; rv:34.0) like Gecko' -r999999
```

```
## Some tech notes
# Googlebot user_agent
Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)
# a possible usable user_agent string in a next version
Mozilla/5.0 (compatible; FreefallCid MirrorBot/0.1; +https://dominicreich.com/wiw)
```

{{< alert "danger" >}}
I advise you to not use that code any more &mdash; it does not filter out enough
URLs and results in <a href="https://www.webopedia.com/TERM/T/thread_bump.html">
bumping</a> a shitload of topics.
{{< /alert >}}

[^rconnet]: rconnet.de log files were printed upwards down, so you had to read them from the bottom to the top. My tool re-ordered all the lines you copied into it and it had the possibility to filter out server messages or text that you could specify.
[^mirror]: Like I said already, the stylesheets and javascripts do not get loaded due to the Content-Security-Policy of my webserver.
[^clan]: But I tried xD --- I announced to not have enough time to participate in clan management and clan life as a whole. Nowadays (a few years later) I realized that many (if not all) people in the clan went AWOL (absent without official leave). Some people pop by from time to time. And some I haven't seen for ages.

{{< alert "secondary" >}}
<strong>Future plans</strong><br>
<strike>A new version is planned. But it's not on top of my priority list.
</strike><br>
I won't fetch a new version any more. In fact, I'm looking where I saved the old
one to get it back online. I could possibly replace the css files in the code to
host it without issues via Netlify. Maybe, or maybe not. Time will tell.<br>
<br><strong>Update on March 28 2020</strong><br>Time... I guess I won't update
this ever.
{{< /alert >}}
