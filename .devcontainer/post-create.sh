#!/bin/bash

# Install zsh and oh-my-zsh
apt-get update
apt-get install -y zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
chsh -s /bin/zsh

# Enable git plugin in oh-my-zsh
sed -i 's/plugins=(git)/plugins=(git git-flow)/g' ~/.zshrc

# Install dependencies
yarn install

# Configure git
git config --global user.name "Wang Dianwen"
git config --global user.email "wangdw2012@gmail.com"

