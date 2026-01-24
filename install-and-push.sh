#!/bin/bash

echo "🚀 Pitch Dreams - Install GitHub CLI and Push to GitHub"
echo "========================================================"
echo ""

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "📦 Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

    # Add Homebrew to PATH for Apple Silicon Macs
    if [[ $(uname -m) == 'arm64' ]]; then
        echo "🍎 Detected Apple Silicon Mac, adding Homebrew to PATH..."
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
else
    echo "✅ Homebrew is already installed"
fi

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo ""
    echo "📦 Installing GitHub CLI..."
    brew install gh
else
    echo "✅ GitHub CLI is already installed"
fi

echo ""
echo "🔐 Authenticating with GitHub..."
echo "Follow the prompts to log in with your browser."
echo ""

gh auth login

echo ""
echo "📤 Creating repository and pushing code..."
echo ""

cd "/Users/lossa/Documents/Side Projects/Pitch Dreams"

# Check if remote already exists
if git remote get-url origin &> /dev/null; then
    echo "ℹ️  Remote 'origin' already exists, pushing to existing remote..."
    git push -u origin main
else
    echo "ℹ️  Creating new repository and pushing..."
    gh repo create Pitch-Dreams-2 --public --source=. --remote=origin --push
fi

echo ""
echo "✅ Done! Your repository should be available at:"
echo "   https://github.com/lossanchez-svg/Pitch-Dreams-2"
echo ""
echo "🎉 Next steps:"
echo "   1. Visit your repository on GitHub"
echo "   2. Run 'npm install' to install dependencies"
echo "   3. Run 'npm run dev' to start the development server"
echo ""
