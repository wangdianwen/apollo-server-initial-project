#!/bin/bash

# Install zsh and oh-my-zsh
apt-get update
apt-get install -y zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
echo 'exec zsh' >> ~/.bashrc

# Install dependencies
yarn install

# Configure git
git config --global user.name "Wang Dianwen"
git config --global user.email "wangdw2012@gmail.com"

