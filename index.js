module.exports = robot => {
  robot.on('issues.opened', async context => {
    const options = context.repo({ path: '.github/ISSUE_REPLY_TEMPLATE.md' })
    const res = await context.github.repos.getContents(options)
    const template = Buffer.from(res.data.content, 'base64').toString()

    return context.github.issues.createComment(context.issue({ body: template }))
  })

  robot.on('pull_request.opened', async context => {
    const options = context.repo({ path: '.github/PULL_REQUEST_REPLY_TEMPLATE.md' })
    const res = await context.github.repos.getContents(options)
    const template = Buffer.from(res.data.content, 'base64').toString().replace(/@@NUMBER@@/g, context.payload.number)

    return context.github.issues.createComment(context.issue({ body: template }))
  })
}
