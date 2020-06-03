const { createProbot } = require('probot')
const plugin = require('..')
const event = require('./fixtures/issues.opened')

let robot, github, app, fakeTemplate
describe('autoresponder', () => {
  beforeEach(() => {
    robot = createProbot({ githubToken: 'test' })

    // Load the plugin
    app = robot.load(plugin)

    // Mock out the GitHub API
    github = {
      repos: {
        // Response for getting content from '.github/ISSUE_REPLY_TEMPLATE.md'
        getContents: jest.fn().mockImplementation(() => Promise.resolve({
          data: {
            content: Buffer.from(fakeTemplate).toString('base64')
          }
        }))
      },

      issues: {
        createComment: jest.fn()
      }
    }

    // Mock out GitHub client
    app.auth = () => Promise.resolve(github)
  })

  test('posts a comment to an issue', async () => {
    fakeTemplate = 'Hello greetings and welcome to issue #@@NUMBER@@'

    await robot.receive(event)

    expect(github.repos.getContents).toHaveBeenCalledWith({
      owner: 'robotland',
      repo: 'test',
      path: '.github/ISSUE_REPLY_TEMPLATE.md'
    })

    expect(github.issues.createComment).toHaveBeenCalledWith({
      owner: 'robotland',
      repo: 'test',
      number: 97,
      body: 'Hello greetings and welcome to issue #97'
    })
  })
})
