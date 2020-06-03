const { createProbot } = require('probot')
const plugin = require('..')
const event = require('./fixtures/issues.opened')

let robot, github, app
describe('autoresponder', () => {
  beforeEach(() => {
    robot = createProbot({ githubToken: 'test' })

    // Load the plugin
    app = robot.load(plugin)

    // Mock out the GitHub API
    github = {
      repos: {
        getContents: jest.fn().mockImplementation(() => Promise.reject(new Error('lol')))
      },

      issues: {
        createComment: jest.fn()
      }
    }

    // Mock out GitHub client
    app.auth = () => Promise.resolve(github)
  })

  test('if the template is missing do nothing', async () => {
    await robot.receive(event)

    expect(github.issues.createComment).not.toHaveBeenCalled()
  })
})
