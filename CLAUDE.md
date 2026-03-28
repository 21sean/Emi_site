# Claude Code – Project Guidelines

## Git Best Practices

### Always pull before starting work
Before making any changes, sync with the remote to avoid building on a stale commit:

```bash
git pull origin master
```

### Always push after completing work
After committing, push immediately so changes are not left only on the local machine:

```bash
git push origin master
```

### Commit and push workflow
1. `git pull origin master` — get latest before starting
2. Make changes
3. `git add <specific files>` — stage only relevant files (avoid `git add .` to prevent accidentally committing secrets or binaries)
4. `git commit -m "..."` — write a clear, concise commit message describing *why*, not just what
5. `git push origin master` — push to remote immediately after committing

### Branch workflow (for larger changes)
For non-trivial features or fixes, use a branch:

```bash
git pull origin master
git checkout -b feature/my-change
# make changes, commit
git push origin feature/my-change
# open a pull request on GitHub
```

### Do not force-push to master
Never run `git push --force` on `master`. Force-pushing rewrites shared history and can destroy teammates' work.

### Commit message format
- Keep the first line under 72 characters
- Use present tense ("Add feature" not "Added feature")
- Describe the *why* in the body if the change needs context

### Before pushing
- Run `npx tsc --noEmit` to catch TypeScript errors
- Run `npm run build` if you want to verify a clean production build
