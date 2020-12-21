+++
title = 'Keep up-to-date on forked repositories'
summary = 'One of the most useful reminder for me at the moment :p'
date = 2020-11-14T23:20:16+01:00
tags = ["til-git"]

+++

I usually fetch the upstream repository and merge it into my local repository,
then upload all the merges into the github repository. That works sometimes,
but it also fails sometimes with me having an extra commit with merges leaving
the git history different from the upstream...

## `git pull --rebase`

This snippet has been taken from [github.community][1].

[1]: https://github.community/t/update-a-forked-repository-when-the-original-repository-is-updated/1855/3

```shell
git checkout master # Make sure you always run the following commands from the master branch
git fetch --all
git pull --rebase upstream master
git push origin master
```

> This will rebase the upstream changes on your local forked version so the
> master branch git history will look exactly the same at the end.

## `git reset --hard`

This solution has been taken from [stackoverflow.com][2].

[2]: https://stackoverflow.com/a/42332860

My setup is exactly like the one in the example, I usually use origin as my
remote repo on github and upstream as the one that I forked off. It is a good
idea to get rid of any changed or untracked files beforehand.

```bash
# ensures current branch is master
git checkout master

# pulls all new commits made to upstream/master
git pull upstream master

# this will delete all your local changes to master
git reset --hard upstream/master

# take care, this will delete all your changes on your forked master
git push origin master --force
```

My workflow for this is explained over here: [Forking GIT-repositories][3]

[3]: {{< relref "post/2020-12-21-forking-git-repositories" >}}
