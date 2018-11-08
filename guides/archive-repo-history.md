# Archive a repo's history

How to archive a (document) repo and copy the last n commits to a new one. `republik/magazine` is used as an example here. For other repos, make sure to also copy the `meta` tag in step 6.

## Preparation
1. Ìnstall git script `rebase-from`
```
git config --global alias.rebase-from '!b="$(git branch --no-color | cut -c3-)" ; h="$(git rev-parse $b)" ; echo "Current branch: $b $h" ; c="$(git rev-parse $1)" ; echo "Recreating $b branch with initial commit $c ..." ; git checkout --orphan new-start $c ; git commit -C $c ; git rebase --onto new-start $c $b ; git branch -d new-start ; git reflog expire --expire=all ; git gc --prune=all'
```

## Run
0. make a backup
```
mkdir backup
cd backup
git clone --mirror git@github.com:republik/magazine.git
cd ..
```

1. clone
```
git clone git@github.com:republik/magazine.git
cd magazine
```

2. Archive repo on github.

(Settings -> Danger Zone -> Archive this repository)

3. Search and note for the latest commit to keep. `git log`.
```
177fa35c78730b7c687f8576f9501f847746eaad
```

4. Rebase
```
git rebase-from 177fa35c78730b7c687f8576f9501f847746eaad
```

5. Roll
- Rename repo on github `${name}-${yearStart}${monthStart}-${yearEnd}${monthEnd}`
- Create new repo `${name}`
- In the cloned archive (step 2): add remote `new`: `git remote add new git@github.com:republik/magazine.git`
- Push `git push new geometric-blazing-skull` (name of main branch at the time)


6. Tags

In this example, the tag `v945` was the latest version-name, applied to the latest commit. If you need to tag a previous commit with a version tag, just add the commit id after `git tag -a vxxx`
If your repo has a `meta` tag, copy it too.
```
# note tag messages
git show v945

git tag -d v945
git tag -d publication
git tag -d prepublication

git tag -a v945 # insert message noted above
git tag publication v945
git tag prepublication v945

git push new v945
git push new publication
git push new prepublication
```

7. Reindex repositories
```
heroku run "node packages/search/script/pullElasticsearch.js -i repo" -a republik-publikator-api
```

8. Profit
