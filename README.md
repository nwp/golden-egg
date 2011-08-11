# Golden Egg

*PT-Beanstalk Integration Proxy*

Beanstalk does not offer a built-in Pivotal Tracker integration and
Pivotal Tracker doesn\'t natively understand and parse Beanstalk JSON
payloads. This proxy, therefore, bridges this gap by examining the
standard Beanstalk JSON payload, generating the appropriate Pivotal
Tracker XML, and posting it to the Pivotal Tracker commit api
endpoint (http://www.pivotaltracker.com/services/v3/source\_commits).

## Source

[github.com/nwp/golden-egg](https://github.com/nwp/golden-egg)

## Installation

    npm install
    ...
    git push heroku

## Configuration

Add a Beanstalk post-commit hook pointing to the following url:

    http://APPURL/commits/new/TOKEN

Replace APPURL with the url of your ap on Heroku or elsewhere.

Replace TOKEN with your user API token from Pivotal Tracker.

## Use

Once setup, you can format commit messages as specified
[here](https://www.pivotaltracker.com/help/api?version=v3#scm\_post\_commit\_message\_syntax)
