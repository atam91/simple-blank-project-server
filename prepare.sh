#!/bin/bash

if [ "$1" != "--docker" ] && [ "$1" != "--local" ]; then
  echo 'You must specify preparing mode with --docker or --local';
  exit 1;
fi;

################################################################################

if [ "$1" = "--local" ]; then
  echo -e '\e[36m   Checking global dependencies \033[0m';
  if which pm2 > /dev/null; then
    echo -e '\e[37m     Skipping pm2';
  else
    echo -e '\e[36m     Installing pm2';
    npm install -g pm2;
  fi

  if which knex > /dev/null; then
    echo -e '\e[37m     Skipping knex';
  else
    echo -e '\e[36m     Installing knex';
    npm install -g knex;
  fi
  echo -e "\033[0m";
else
  echo -e '\e[36m   Skip global dependencies for docker \033[0m';
fi

################################################################################

echo -e '\e[36m   Installing other dependencies';
npm install;
echo -e "\033[0m";

################################################################################

echo -e '\e[36m   Checking local configs';
if [ ! -f "config/local.js" ]; then
    echo -e '\e[36m     Creating config/local.js';
    cp config/local{.example,}.js;
else
    echo -e '\e[37m     Skipping config/local.js';
fi

if [ ! -f "knexfile.js" ]; then
    echo -e '\e[36m     Creating knexfile.js';
    if [ "$1" = "--local" ]; then
      cp knexfile{.example,}.js;
    else
      cp knexfile{.docker,}.js;
    fi;
else
    echo -e '\e[37m     Skipping knexfile.js';
fi
echo -e "\033[0m";

################################################################################

if [ "$1" = "--local" ]; then
  echo -e '\e[36m   Checking local db \033[0m';
  if psql simple_blank_project simple_blank_project -c 'SELECT 2*2;' &> /dev/null; then
    echo -e '\e[37m     Skipping';
  else
    cat PREPARE_DB.md;
    echo -e '\e[36m     Running: sudo -u postgres psql \033[0m';
    sudo -u postgres psql;
  fi
  echo -e "\033[0m";

  echo -e '\e[36m   Applying migrations';
  knex migrate:latest;
  echo -e '\e[37m     Default user credentials are root:qweqwe';
  echo -e "\033[0m";
else
  echo -e '\e[36m   Skip db preparing for docker \033[0m';
fi

################################################################################

echo -e '\e[32m   Server is ready.';
echo -e "\033[0m";

