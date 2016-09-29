#!/usr/bin/env bash

# A script to run test runner in Heroku CI
#
# The HEROKU_TEST_RUN_BRANCH is set by the CI job, which we will use to decide
# which testrunner profile to use.

PROFILE="basic"

if [ $HEROKU_TEST_RUN_BRANCH = "master" ]
then
    # TODO enable once selenium works on heroku ci
    #PROFILE=$HEROKU_TEST_RUN_BRANCH
   PROFILE="basic"
fi

CMD="force:test -c test/test-runner-config.json -p $PROFILE -r tap -w"
echo "Running heroku $CMD"

# TODO Hard code the path to heroku cli for now. We should be able to just use
# heroku but the PATH variable is being lost.
/app/vendor/heroku-cli/heroku/bin/heroku $CMD
