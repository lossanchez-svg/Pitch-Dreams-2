# Install GitHub CLI and Push Repository

GitHub CLI (`gh`) is not currently installed. Here's how to install it and push your code.

## Step 1: Install GitHub CLI

### Using Homebrew (Recommended for macOS)

First, check if Homebrew is installed:
```bash
brew --version
```

If not installed, install Homebrew:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then install GitHub CLI:
```bash
brew install gh
```

### Alternative: Download Directly

Visit: https://cli.github.com/
- Download the macOS installer
- Install the .pkg file
- Restart your terminal

## Step 2: Authenticate with GitHub

```bash
gh auth login
```

Follow the prompts:
1. Choose: **GitHub.com**
2. Choose: **HTTPS**
3. Authenticate: **Login with a web browser** (easiest)
4. Copy the one-time code shown
5. Press Enter to open browser
6. Paste code and authorize

## Step 3: Create Repository and Push

```bash
cd "/Users/lossa/Documents/Side Projects/Pitch Dreams"
gh repo create Pitch-Dreams-2 --public --source=. --remote=origin --push
```

This will:
- Create the repository `Pitch-Dreams-2` on your GitHub account
- Set it as the remote
- Push all your code

## Alternative: Manual Push (If You Prefer)

If you don't want to install `gh`, you can push manually:

### Option A: Using Personal Access Token

1. **Create token:** https://github.com/settings/tokens/new
   - Name: "Pitch Dreams"
   - Scope: Check `repo`
   - Generate and copy the token

2. **Create repository manually:**
   - Go to: https://github.com/new
   - Name: `Pitch-Dreams-2`
   - Click "Create repository"

3. **Push:**
   ```bash
   cd "/Users/lossa/Documents/Side Projects/Pitch Dreams"
   git push -u origin main
   ```

   When prompted:
   - Username: `lossanchez-svg`
   - Password: Paste your token

### Option B: Using SSH

If you have SSH keys set up:

```bash
cd "/Users/lossa/Documents/Side Projects/Pitch Dreams"
git remote set-url origin git@github.com:lossanchez-svg/Pitch-Dreams-2.git
git push -u origin main
```

## Verify Success

After pushing, check your repository:
https://github.com/lossanchez-svg/Pitch-Dreams-2

You should see all 31 files including README.md, the complete app structure, and documentation.

## Quick Commands Summary

```bash
# Install gh (choose one method above)
brew install gh

# Authenticate
gh auth login

# Create repo and push
cd "/Users/lossa/Documents/Side Projects/Pitch Dreams"
gh repo create Pitch-Dreams-2 --public --source=. --remote=origin --push

# Verify
open https://github.com/lossanchez-svg/Pitch-Dreams-2
```

## Current Status

✅ Code is ready (31 files, 3 commits)
✅ Remote configured: https://github.com/lossanchez-svg/Pitch-Dreams-2.git
⏳ Waiting for GitHub CLI installation OR manual push

Choose the method that works best for you!
