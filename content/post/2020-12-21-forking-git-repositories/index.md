+++
title = 'Forking GIT-repositories'
summary = '''So this is working for me now. Keeping up-to-date with my
	upstream github repository'''
date = 2020-12-21T12:13:30+01:00
lastmod = 2020-12-21T21:00:02+01:00
tags = ["til-git"]

+++

For me, git repositories are a complex thing. As I wrote in an [earlier article][1]
I can keep my local repository up-to-date to the original one and simply manage
my changes to a github repository saved in my github account. So I can distribute
my changes on many computers at home.

But all these changes make the structure of the git commit history more complex.
I thought I could shrink my own commits down to a minimum and just summarize them
into one single commit on the top of the commit history in my github repository.

Time will tell, if this is a good approach...

{{< alert "secondary" >}}
<strong>I am no expert!</strong><br /><br />
I am not an expert and this article helps me remembering this scenario with
multiple repositories and their commit history. The logic behind this might
not be correct, so if you have a better solution for this specific scenario,
please let me know. I'm all up to learn this stuff the right way.
{{< /alert >}}

## If you have commits in your history

Let's take my prezto repository and add the upstream repository to it.

```bash
❯ git log
commit d321120fdebb84c7dc282a05eaaa57fdaf56987b (HEAD -> master)
Author: Dominic Reich <dominic>
Date:   Mon Dec 21 10:33:44 2020 +0100

    remove dot-expansion as this is also done when doing multiline-commands
      like doing git commit with single quotes and making line brakes
      (like this git commit here../..)

commit aa85e03e8aced6832a77307c77aa77ce34dc462e
Author: Dominic Reich <dominic>
Date:   Mon Dec 7 07:15:45 2020 +0100

    adds aliases on darwin; fix ostype for raspberry pi

commit 63569c97a25c3910dfb1dad5a0e170850c5b4b67
Author: Dominic Reich <dominic>
Date:   Sun Nov 29 20:41:37 2020 +0100

    adds zaliases

commit 3877758908c60e24d4dce093ff8570135b7dfb19
Author: Dominic Reich <dominic>
Date:   Sat Nov 28 19:26:00 2020 +0100

    personalized

commit b7a80d99a84e718f30a076b27b090d3e998ad135 (upstream/master, origin/master, origin/HEAD)
Author: Roman Perepelitsa <roman.perepelitsa>
Date:   Fri Dec 18 16:38:31 2020 +0100

    prompt: update powerlevel10k submodule to v1.14.4

    Release notes:

    [...]
```

In this example I already have a commit that changes something. And a few commits
later the changes will be reverted again because that did not work out so well.

This is why we will extract those last commits into a patchfile and re-apply
the file in one single run after we updated our local repository to the state of
the upstream repository. We will also force the github repository (origin) to the
same state as our upstream repository, so we will end up having only one commit
on top of the history on github.

Now, create our patchfile.

```bash
git format-patch -5 HEAD > ../changes.patch
```

This saves the recent 5 commits from HEAD into `../changes.patch`, which file
is not in the git repository, but one directory above.

We continue using the master branch and getting upstream/master.

```bash
❯ git checkout master
Bereits auf 'master'
Ihr Branch ist auf demselben Stand wie 'origin/master'.
❯ git pull upstream master
Warning: Permanently added 'github.com,140.82.121.4' (RSA) to the list of known hosts.
Von github.com:sorin-ionescu/prezto
 * branch            master     -> FETCH_HEAD
Bereits aktuell.
❯ git reset --hard upstream/master
HEAD ist jetzt bei b7a80d9 prompt: update powerlevel10k submodule to v1.14.4
❯ git push origin master --force
```

Now we have our local master branch set equal to the master branch on the
remote upstream repository. We now add our changes into the repository, our
patchfile.

```bash
❯ patch -p1 < ../changes.patch
patching file runcoms/zlogout
patching file runcoms/zpreztorc
patching file runcoms/zprofile
patching file runcoms/zshrc
patching file runcoms/zaliases
patching file runcoms/zaliases
patching file runcoms/zpreztorc
patching file runcoms/zaliases
patching file runcoms/zshenv
```

This leaves us again with many changes, but we can add them to git all together
as one single commit if we like.

Run `git diff` to view the changes on the files.

Make your changes now and create a new commit.

```bash
❯ git add .
❯ gcm 'personalized'
[master 3d19001] personalized
 6 files changed, 195 insertions(+), 26 deletions(-)
 create mode 100644 runcoms/zaliases
 rewrite runcoms/zlogout (68%)
❯ git push origin
Warning: Permanently added 'github.com,140.82.121.4' (RSA) to the list of known hosts.
Objekte aufzählen: 16, Fertig.
Zähle Objekte: 100% (16/16), Fertig.
Delta-Kompression verwendet bis zu 8 Threads.
Komprimiere Objekte: 100% (9/9), Fertig.
Schreibe Objekte: 100% (9/9), 3.94 KiB | 3.94 MiB/s, Fertig.
Gesamt 9 (Delta 5), Wiederverwendet 0 (Delta 0), Pack wiederverwendet 0
remote: Resolving deltas: 100% (5/5), completed with 5 local objects.
To github.com:oe7drt/prezto.git
   b7a80d9..3d19001  master -> master
```

The history now looks like this:

```bash
❯ git log
commit 3d19001518997c29204457fe2d1119fc9830010c (HEAD -> master, origin/master, origin/HEAD)
Author: Dominic Reich <dominic>
Date:   Mon Dec 21 12:08:25 2020 +0100

    personalized

commit b7a80d99a84e718f30a076b27b090d3e998ad135 (upstream/master)
Author: Roman Perepelitsa <roman.perepelitsa>
Date:   Fri Dec 18 16:38:31 2020 +0100

    prompt: update powerlevel10k submodule to v1.14.4

    Release notes:

    [...]
```

## Approach #2: reset to upstream branch

```bash
❯ git checkout main
Bereits auf 'main'
Ihr Branch ist auf demselben Stand wie 'origin/main'.
❯ git reset upstream/main
Nicht zum Commit vorgemerkte Änderungen nach Zurücksetzung:
M html/js/config.js
M logtailer.ini
❯ git diff > ../changes.patch
❯ git reset --hard upstream/main
HEAD ist jetzt bei ea48f75 Added Key Features in Readme.md
❯ git push origin main --force
Gesamt 0 (Delta 0), Wiederverwendet 0 (Delta 0)
To github.com:oe7drt/MMDVMHost-Websocketboard.git
 + b06f675...ea48f75 main -> main (forced update)
❯ patch -p1 < ../changes.patch
patching file html/js/config.js
patching file logtailer.ini
❯ git add .
❯ git push
Warning: Permanently added 'github.com,140.82.121.3' (RSA) to the list of known hosts.
Objekte aufzählen: 11, Fertig.
Zähle Objekte: 100% (11/11), Fertig.
Delta-Kompression verwendet bis zu 4 Threads.
Komprimiere Objekte: 100% (6/6), Fertig.
Schreibe Objekte: 100% (6/6), 1.26 KiB | 646.00 KiB/s, Fertig.
Gesamt 6 (Delta 3), Wiederverwendet 0 (Delta 0)
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
To github.com:oe7drt/MMDVMHost-Websocketboard.git
   ea48f75..ba62875  main -> main
```

You now have the history of your upstream repository and only one commit on top
of the history.

PS: I've removed the full email addresses on `git log` outputs.

[1]: {{< relref "post/2020-11-15-keep-up-to-date-on-forked-repositories" >}}