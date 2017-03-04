const request = require("request");

function getBadge (options, callback) {
  const left = options.left.replace(/-/g, "--").replace(/_/g, "__")
  const right = options.right.replace(/-/g, "--").replace(/_/g, "__")
  const color = options.color || '7289DA'
  const style = options.style || 'flat'
  const invite = options.invite ? `https://discordapp.com/invite/${options.invite}` : ''

  const url = `https://img.shields.io/badge/${left}-${right}-${color}.svg?style=${style}`

  request(url, function (err, response, body) {
    if (err)
      callback(err)
    if (response.statusCode !== 200)
      callback(new Error('Non-200 status code returned'))

    // Add link if we need to
    if (invite)
      // body = body.replace('>', ` xmlns:xlink="http://www.w3.org/1999/xlink"><a xlink:href="${invite}">`).replace(/(.*)<\//, '$1</a></')
      body = body.replace('>', `><a xlink:href="${invite}">`).replace(/(.*)<\//, '$1</a></')

    callback(null, body)
  });
}

function getOnlineUsers (serverId, callback) {
  if (!serverId)
    callback(new Error('No ID given'))
  request(`https://discordapp.com/api/servers/${serverId}/widget.json`, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      body = JSON.parse(body)
      let onlineCount = body.members.length
      callback(null, onlineCount)
    } else {
      callback(new Error(response.statusCode))
    }
  })
}

module.exports = function (hook) {
  getOnlineUsers(hook.params.id, (err, num) => {
    if (err) {
      getBadge({
        left: hook.params.left || 'chat',
        right: hook.params.right || 'on Discord',
        style: hook.params.style,
        color: hook.params.color,
        invite: hook.params.invite
      }, callback)
    } else {
      getBadge({
        left: (hook.params.left || 'chat').replace(/{}/g, num),
        right: (hook.params.right || '{} online').replace(/{}/g, num),
        style: hook.params.style,
        color: hook.params.color,
        invite: hook.params.invite
      }, callback)
    }
  })

  function callback (err, badge) {
    hook.res.setHeader('Content-Type', 'image/svg+xml')
    if (err)
      return hook.res.end(`<svg xmlns="http://www.w3.org/2000/svg"><!-- ${err} --></svg>`)

    hook.res.end(badge)
  }
}
