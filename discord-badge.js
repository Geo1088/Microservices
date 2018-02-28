const request = require("request");

function getBadge (options, callback) {
  const left = options.left.replace(/-/g, "--").replace(/_/g, "__")
  const right = options.right.replace(/-/g, "--").replace(/_/g, "__")
  const color = options.color || '7289DA'
  const style = options.style || 'flat'
  const invite = options.invite ? `https://discord.gg/${options.invite}` : ''

  const url = `https://img.shields.io/badge/${left}-${right}-${color}.svg?style=${style}`

  request(url, function (err, response, body) {
    if (err)
      callback(err)
    if (response.statusCode !== 200)
      callback(new Error('Non-200 status code returned'))

    // Add link stuff if we need to
    if (invite) {
      if (body.indexOf('href="') > -1) {
        // The link templates are already here, we just need to replace the current value with our own
        body = body.replace(/ (xlink:)?(href=")[^"]*(")/g, ` $2${invite}$3`)
      } else {
        // We need to wrap the whole thing in a link and go from there
        // body = body.replace('>', ` xmlns:xlink="http://www.w3.org/1999/xlink"><a xlink:href="${invite}">`).replace(/(.*)<\//, '$1</a></')
        body = body.replace('>', `><a href="${invite}">`).replace(/(.*)<\//, '$1</a></')
       }
    } else {
      // If there's no invite and there are link templates in the output, remove the templates
      body = body.replace(/ (xlink:)?href="[^"]*"/g, '')
    }
    
    callback(null, body)
  });
}

function getGuildInfo (serverId, callback) {
  if (!serverId)
    callback(new Error('No ID given'))
  request(`https://discordapp.com/api/guilds/${serverId}/widget.json`, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      callback(null, JSON.parse(body))
    } else {
      callback(new Error(response.statusCode))
    }
  })
}

function substituteTokens (string, guildInfo) {
  return string
    .replace(/{(members)?}/g, guildInfo.members.length)
    .replace(/{name}/g, guildInfo.name)
    .replace(/{channels}/g, guildInfo.channels.length)
}

module.exports = function (hook) {
  getGuildInfo(hook.params.id, (err, guildInfo) => {
    // Set up the standard options
    let options = {
      left: hook.params.left || 'chat',
      right: hook.params.right || '{} online',
      style: hook.params.style,
      color: hook.params.color,
      invite: hook.params.invite
    }
    // As long as we got the guild stuff, we can add more things
    if (!err) {
      options.left = substituteTokens(options.left, guildInfo)
      options.right = substituteTokens(options.right, guildInfo)
    } else if (!hook.params.right) {
      // change `{} online` to `on Discord` if the defaults are used and no guildInfo
      options.right = 'on Discord'
    }
    // Spaces are stupid
    options.left = options.left.replace(/-/g, "--").replace(/_/g, "__")
    options.right = options.right.replace(/-/g, "--").replace(/_/g, "__")

    getBadge(options, (err, badgeSource) => {
      hook.res.setHeader('Content-Type', 'image/svg+xml')
      if (err) {
        hook.res.end(`<svg xmlns="http://www.w3.org/2000/svg"><!--\n\nError from shields.io:\n${err}\n\n--></svg>`)
      } else {
        hook.res.end(badgeSource)
      }
    })
  })
}
