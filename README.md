# Autoresponder

This is a fork of
[probot/autoresponder](https://github.com/probot/autoresponder) that's been
updated to the latest dependencies (as of June 2020) and enhanced in two ways:

1. In addition to `.github/ISSUE_REPLY_TEMPLATE.md` for responding to new
   issues, `.github/PULL_REQUEST_REPLY_TEMPLATE.md` will be used for responding
   to new pull requests (if you install this probot, you'll need to further
   subscribe to pull request events)

2. If your template contains `@@NUMBER@@`, it will be substituted for the number
   of the new issue or pull request

See [docs/deploy.md](docs/deploy.md) if you would like to run your own instance of this plugin.
