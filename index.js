class AutoResponder {
  constructor (type) {
    this.type = type
    this.respond = this.respond.bind(this)
  }

  async respond (context) {
    const options = context.repo({ path: this.templatePath() })
    const res = await context.github.repos.getContents(options)
    const template = Buffer.from(res.data.content, 'base64').toString().replace(/@@NUMBER@@/g, context.payload.number)

    return context.github.issues.createComment(context.issue({ body: template }))
  }

  templatePath () {
    if (this.type === 'pull_request') {
      return '.github/PULL_REQUEST_REPLY_TEMPLATE.md'
    } else {
      return '.github/ISSUE_REPLY_TEMPLATE.md'
    }
  }
}

module.exports = robot => {
  robot.on('issues.opened', new AutoResponder('issue').respond)
  robot.on('pull_request.opened', new AutoResponder('pull_request').respond)
}
