+++
title = 'Create your own DMR-ID database file'
summary = 'Sometimes you just need to create your own files...'
date = 2020-11-16T23:23:51+01:00
lastmod = 2021-01-14T22:35:17+01:00
tags = ["dmr","script"]

+++

{{< alert "danger" >}}
`radioid.net` and `ham-digital.org` are now managed only by `radioid.net` and
this is still not in my code below. I'm going to changes this here the upcoming
week or so. This shuold still work though...
{{< /alert >}}

Let's start with the website [ham-digital.org](https://ham-digital.org/). It
contains the user database of registered DMR-IDs worldwide.

**Are you still waiting for your confirmation email?** You may
[look at the registration site][reg], which contains links to the list of open
registrations or the list of local administrators.

[reg]: https://register.ham-digital.org/

Okay, I try to keep this simple. These scripts are made to download an actual
snapshot of the DMR-ID database from *ham-digital.org*. They create a comma-separated
list of DMR-IDs and callsigns to import into an amateur radio device. Actually
I use them only on my [Radioddity GD-77]({{< relref "equipment/radioddity-gd77" >}}).

## Download the full database

That fetches the whole database, which are something around 180.000 entries at
the moment (2020-Nov-15). The script uses about 8MB of RAM. Something like that.

```php
#!/usr/bin/env php
<?php
  /*
   *  Save the full database (much big!!)
   *  DMR-IDS-FULL.csv
   *  Dominic, OE7DRT
   */

  $url = 'https://ham-digital.org/status/users.csv';
  $remote_file = fopen ($url, 'r') or die ($php_errormsg);

  $filename = '/Users/dominic/OneDrive/Amateurfunk/Geraete/Funkgeraete/Radioddity GD-77/Codeplug/Contacts/DMR-IDS-FULL.csv';
  
  @unlink ($filenme);

  $local_file = fopen ($filename, 'w') or die ($php_errormsg);

  fputcsv ($local_file, array ('dmrid', 'callsign', 'name'));

  while (!feof ($remote_file)) {
    $line = fgetss ($remote_file, 64);
    $elem = explode (',', $line, -4);

    fputcsv ($local_file, $elem);
  }

  fclose ($remote_file);
  fclose ($local_file);
?>
```

## Download only a few regions into separate files

Fetch some regions (specified in the script) and some additional callsigns from
a file that contains one callsign per line. This script uses a lot more RAM.
Something around 32MB I guess. Or so.

```php
#!/usr/bin/env php
<?php
  /*
   *  Save regions and favourites in separate files
   *  DMR-IDS-$REGION.csv and DMR-IDS-FAV.csv
   *  Dominic, OE7DRT
   */

  $url = 'https://ham-digital.org/status/users.csv';
  $remote_file = fopen ($url, 'r') or die ($php_errormsg);

  $mem = array ();
  
  while (!feof ($remote_file)) {
    $line = fgetss ($remote_file, 64);
    $elem = explode (',', $line, -4);
    array_push($mem, $elem);
  }
  
  $path = '/Users/dominic/OneDrive/Amateurfunk/Geraete/Funkgeraete/Radioddity GD-77/Codeplug/Contacts/';

  $fav_filename = 'Favorite_Callsigns.txt';
  $fav_file = fopen ($path.$fav_filename, 'r') or die($php_errormsg);

  $fav = array ();

  while (!feof ($fav_file)) {
    $line = fgetss ($fav_file, 16);
    if (!empty ($line)) $fav[] = trim ($line);
  }

  fclose ($fav_file);

  $filename = $path.'DMR-IDS-FAV.csv';
  @unlink($filename);

  $fav_out = fopen ($filename, 'w') or die ($php_errormsg);

  foreach ($fav as $callsign) {
    foreach ($mem as $item) {
      if (preg_match("/\b$callsign\b/i", $item[1], $m)) {
        fputcsv ($fav_out, $item);
      }
    }
  }

  fclose ($fav_out);

  // $regions = array ('232', '262', '263', '264', '228', '222');
  // $regions = array ('2327', '2328', '2329');
  $regions = array ('232','262','263','222','228');

  foreach ($regions as $region) {
    $filename = $path.'DMR-IDS-'.$region.'.csv';
    @unlink ($filename);

    $local_file = fopen ($filename, 'w') or die ($php_errormsg);
    fputcsv ($local_file, array ('dmrid', 'callsign', 'name'));

    foreach ($mem as $item) {
      if (preg_match ("/^$region/", $item[0], $m)) {
        fputcsv ($local_file, $item);
      }
    }
  }
    fclose ($remote_file);
  fclose ($local_file);
?>
```

## Download only a few regions into one single file

Like the one above, but it saves all IDs into one file. Uses probably the same
amount of RAM.

```php
#!/usr/bin/env php
<?php
  /*
   *  Save the regions and favourites in a single file
   *  DMR-IDS-SMALL.csv
   *  Dominic, OE7DRT
   */

  $path = '/Users/dominic/OneDrive/Amateurfunk/Geraete/Funkgeraete/Radioddity GD-77/Codeplug/Contacts/';

  $url = 'https://ham-digital.org/status/users.csv';
  $remote_file = fopen ($url, 'r') or die ($php_errormsg);

  $mem = array ();
  
  while (!feof ($remote_file)) {
    $line = fgetss ($remote_file, 64);
    $elem = explode (',', $line, -4);
    array_push($mem, $elem);
  }

  fclose ($remote_file);

  $whitelist_filename = 'Favorite_Callsigns.txt';
  $whitelist_file = fopen ($path.$whitelist_filename, 'r') or die($php_errormsg);

  $whitelist_array = array ();

  while (!feof ($whitelist_file)) {
    $line = fgetss ($whitelist_file, 16);
    if (!empty ($line)) $whitelist_array[] = trim ($line);
  }

  fclose ($whitelist_file);

  $filename = 'DMR-IDS-SMALL.csv';
  @unlink($path.$filename);
  
  $file = fopen ($path.$filename, 'w') or die ($php_errormsg);

  fputcsv ($file, array ('dmrid', 'callsign', 'name'));

  // $regions = array ('232', '262', '263', '264', '228', '222');
  //$regions = array ('2327', '2328', '2329');
  $regions = array ('232');

  foreach ($regions as $region) {
    foreach ($mem as $item) {
      if (preg_match ("/^$region/", $item[0], $m)) {
        fputcsv ($file, $item);
      }
    }
  }

  foreach ($whitelist_array as $callsign) {
    foreach ($mem as $item) {
      if (preg_match("/\b$callsign\b/i", $item[1], $m)) {
        fputcsv ($file, $item);
      }
    }
  }

  fclose ($file);   
?>
```
