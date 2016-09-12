#!/usr/bin/env bash

##
# Installs AppCloud and Force.com CLI plugins.
#
# Assumes Heroku CLI already installed.
##

# Debug, echo every command
#set -x


# ensure Heroku CLI client exists
HEROKU_CLIENT=heroku
if type "$HEROKU_CLIENT" &> /dev/null; then
    echo "Installing AppCloud and Force CLI Plugins..."
    $HEROKU_CLIENT plugins:install salesforce-alm-dev
    $HEROKU_CLIENT plugins:install force-cli-dev

    echo "Installed Heroku Plugins:"
    $HEROKU_CLIENT plugins
else
    echo "ERROR: Heroku CLI not found"
    exit 1;
fi

exit 0