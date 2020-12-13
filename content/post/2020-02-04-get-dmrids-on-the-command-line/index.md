+++
title = "Get DMRIDs Via Command Line"
summary = "This is a quick workaround to retrieve a DMRID on console or terminal. This comes in handy when you don't have a browser window open or not even a graphical setup running. The script uses w3m to retrieve website content from ham-digital.org. It's also usable when piping its output to a file."
date = 2020-02-04T13:05:25+01:00
lastmod=2020-03-28T16:36:28+01:00
tags = ["dmr","ham radio","pi-star","script"]

+++

## First off

You want to install `w3m`. It is a text browser. Don't forget `rpi-rw` before
installing anything if you're on Pi-Star.

```
sudo apt-get -y install w3m
```

## The script

The script itself does not verify the given callsign, so whatever you write as
an argument, it will be passed to the website. The script returns with `0` if
nothing is found. 

``` bash
#!/bin/bash
# Get DMR-IDs from CALLSIGN or CALLSIGN from DMR-ID or vice versa
# Author: Dominic Reich, OE7DRT
# File:   ~/bin/call
#
# Last modified: 2020-04-12 13:26:36+0200
#
# Inspired from this beautiful article:
#   https://pretzelhands.com/posts/command-line-flags
#
# Good DX and vy 73 de OE7DRT

command -v w3m > /dev/null 2>&1 || { echo >&2 "w3m not found"; exit 1; }

print_usage () {
  echo >&2 "usage: `basename $0` [dmr_id | callsign]"
  exit 1
}

if [ $# -ne 1 ]
then
  print_usage
fi

getID () {
  CALL=`echo $1 | tr a-z A-Z`
  FILE=/tmp/$CALL
  w3m "https://ham-digital.org/dmr-userreg.php?callsign=$CALL" > $FILE
  c=`grep $CALL $FILE | wc -l | xargs`

  while [ $c -gt 0 ]
  do
    OUT=`grep $CALL $FILE | head -n $c | tail -n 1 | awk '{ print $4,$5,$2,$3 }'`
    echo "$OUT"
    ((c--))
  done
  rm $FILE
}

getCALLSIGN () {
  ID=$1
  FILE=/tmp/$ID
  w3m "https://ham-digital.org/dmr-userreg.php?usrid=$ID" > $FILE
  CALL=`grep $ID $FILE | awk '{ print $4 }'`
  rm $FILE
  if [ -z $CALL ]
  then
    exit 1
  fi
  getID $CALL
}

checkID () {
  if [[ ! $1 =~ ^[0-9]{7}$ ]]
  then
    echo >&2 "no valid dmr_id supplied"
    exit 1
  fi
}

if [ "$1" -eq "$1" ] 2>/dev/null
then
  ID="$1"
  checkID $ID
else
  CALL="$1"
fi

if [ ! -z $ID ]
then
  getCALLSIGN $ID
  exit 0
elif [ ! -z $CALL ]
then
  getID $CALL
  exit 0
else
  print_usage
fi
```

{{< background "primary" >}}
If someone has two DMRIDS, the most recent registered callsign will appear on
the top. Feel free to modify the script to your needs if you also want to display
the date of registration. Or modify the url if you want to only display last
heard ids.
{{< /background >}}

## Example usage

Simply get one DMRID (or two, depends on the callsign though):

```
call OE7DRT
```

Now let's think a bit more complex. You can use the script in a loop. Let's fetch
some austrian callsigns only.

```
for i in 7one 7two 1three; do call oe$i ids >>! ids; done
```

That would fetch 3 callsigns `OE7ONE`, `OE7TWO` and `OE1ONE` and write them
all into the file `ids`. So run `cat ids` and display them on screen. Or copy
them into clipboard (on a mac only) with `pbcopy < ids`.

```
OE7ONE Username1 0007001 2018-05-12
OE7TWO Username2 0007003 2018-12-08
OE7TWO Username2 0007002 2018-11-09
OE1ONE Username3 0001001 2020-03-13
```

*I've been anonymizing the data a bit.*

## Partially known callsign

***I anonymized some DMR-IDs on this website.***

So you know only the three last letters of an austrian callsign and want to
know quickly what federal state it was? Run this command and you'll get a
quick answer on the command line:

```
for i in oe{1..9}drt; do call $i; done
OE7DRT Dominic 2327180 2019-11-24
```

If you called your script `call` and if `call` is in your `$PATH`.

This works also if you missed one letter.

```
for i in oe7{a..z}rt; do call $i; done
OE7BRT Rainer 2327XXX 20XX-XX-XX
OE7DRT Dominic 2327180 2019-11-24
OE7JRT Josef 2327XXX 20XX-XX-XX
```

This took ~10 seconds on my computer.

Or even with more letters, but this will take a while, since this will start
**676 (26 x 26) website lookups to ham-digital.org** -- maybe they'll block
your IP address quickly, if you hammer their server with so many request in a
short period of time.

```
for i in oe7d{a..z}{a..z}; do call $i; done
2327XXX OE7D?? Daniel
2327XXX OE7D?? Hermann
2327XXX OE7D?? Josef
2327XXX OE7D?? Dragan
2327XXX OE7D?? Peter
2327180 OE7D?? Dominic
2327XXX OE7D?? Wechselberger
2327XXX OE7D?? Gernot
```
{{< alert "secondary" >}}
<strong>Update:</strong> The output above was made with an older version of the script. The output now
contains also the registration date as seen in previous examples.
{{< /alert >}}


And this ran for 3 minutes and 17 seconds on my computer.
