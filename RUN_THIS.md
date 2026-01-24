# 🚀 Quick Start: Push to GitHub

I've created an automated script that will:
1. Install Homebrew (if needed)
2. Install GitHub CLI
3. Authenticate with GitHub
4. Push your code to https://github.com/lossanchez-svg/Pitch-Dreams-2

## Run This Command

Open your **Terminal** app and run:

```bash
cd "/Users/lossa/Documents/Side Projects/Pitch Dreams" && ./install-and-push.sh
```

## What Will Happen

1. **Homebrew Installation** (if not installed)
   - You'll be asked for your password (sudo access)
   - This is normal and safe

2. **GitHub CLI Installation**
   - Installs automatically via Homebrew

3. **GitHub Authentication**
   - A browser window will open
   - You'll see a one-time code
   - Copy/paste it in the browser
   - Click "Authorize"

4. **Repository Creation & Push**
   - Creates `Pitch-Dreams-2` repository
   - Pushes all 31 files
   - Shows success message with URL

## Total Time

⏱️ About 3-5 minutes (depending on internet speed)

## Troubleshooting

### "Permission denied" error
Make sure the script is executable:
```bash
chmod +x install-and-push.sh
./install-and-push.sh
```

### "Command not found: brew" after install
Restart your terminal or run:
```bash
eval "$(/opt/homebrew/bin/brew shellenv)"  # For Apple Silicon
# or
eval "$(/usr/local/bin/brew shellenv)"      # For Intel Mac
```

Then run the script again.

### Already have Homebrew?
The script detects this and skips installation.

### Already have GitHub CLI?
The script detects this and goes straight to authentication.

## Manual Alternative (If Script Fails)

If the script doesn't work, you can do it manually:

```bash
# 1. Install Homebrew (if needed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Install GitHub CLI
brew install gh

# 3. Authenticate
gh auth login

# 4. Push
cd "/Users/lossa/Documents/Side Projects/Pitch Dreams"
git push -u origin main
```

## After Pushing

Visit your repository:
https://github.com/lossanchez-svg/Pitch-Dreams-2

Then start developing:
```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

---

**Ready?** Open Terminal and run:

```bash
cd "/Users/lossa/Documents/Side Projects/Pitch Dreams" && ./install-and-push.sh
```
