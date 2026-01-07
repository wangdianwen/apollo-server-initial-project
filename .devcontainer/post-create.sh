#!/bin/bash

# Install zsh and oh-my-zsh
apt-get update
apt-get install -y zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
echo 'exec zsh' >> ~/.bashrc

# Install dependencies
yarn install

# Ensure Husky hooks are installed and executable
# `yarn install` runs the `prepare` script which should call `husky install`,
# but call it explicitly here to be robust on container rebuilds.
npx --no-install husky .husky || npx husky .husky || true
if [ -d ".husky" ]; then
	chmod +x .husky/* || true
fi

# Remove deprecated lines from husky pre-commit hook
if [ -f ".husky/pre-commit" ]; then
    sed -i '1,2d' .husky/pre-commit
fi

# Configure git
git config --global user.name "Wang Dianwen"
git config --global user.email "wangdw2012@gmail.com"

# Install OpenCode CLI
curl -fsSL https://opencode.ai/install | bash
echo 'export PATH=/root/.opencode/bin:$PATH' >> ~/.zshrc


