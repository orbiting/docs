# Archive a repo's history

How to archive a (document) repo and copy the last commit to a new one. `republik/magazine` is used as an example here. For other repos, make sure to also copy the `meta` tag in step 4.

## Run

### 0. Make a Backup

```
mkdir backup
cd backup
git clone --mirror git@github.com:republik/magazine.git
cd ..
```

### 1. Clone

```
git clone git@github.com:republik/magazine.git
cd magazine
```

### 2. Rebase

Make sure you're on the right branch before running.

```
ref=$(git symbolic-ref HEAD 2> /dev/null)
b="${ref#refs/heads/}"
c="$(git rev-parse $b)"
echo "Current branch: $b $c"
echo "Recreating $b branch with initial commit $c ..."
git checkout --orphan new-start $c
git commit -C $c
git rebase --onto new-start $c $b
git branch -d new-start
git reflog expire --expire=all
git gc --prune=all
```

### 3. Roll

- Rename repo on github `${name}-${yearStart}${monthStart}-${yearEnd}${monthEnd}`
- Archiv the renamed repo `${name}-${yearStart}${monthStart}-${yearEnd}${monthEnd}`
- Create new repo `${name}`

### 4. Tags

In this example, the tag `v945` was the latest version-name, applied to the latest commit. If you need to tag a previous commit with a version tag, just add the commit id after `git tag -a vxxx`
If your repo has a `meta` tag, copy it too.

```
# note tag messages (M) & version (X)
git show publication

git tag -d vX
git tag -d publication
git tag -d prepublication

git tag -a vX # insert message (M)
git tag publication vX
git tag prepublication vX

git push origin vX
git push origin publication
git push origin prepublication
```
