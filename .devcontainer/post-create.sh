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
npx --no-install husky install .husky || npx husky install .husky || true
if [ -d ".husky" ]; then
	chmod +x .husky/* || true
fi

# Configure git
git config --global user.name "Wang Dianwen"
git config --global user.email "wangdw2012@gmail.com"

