try {

const request = require('request')

function getBadge (options, callback) {
  const left = options.left.replace(/-/g, "--").replace(/_/g, "__")
  const right = options.right.replace(/-/g, "--").replace(/_/g, "__")
  const color = options.color || 'lightgray'
  const style = options.style || 'flat'

  const url = `https://img.shields.io/badge/${left}-${right}-${color}.svg?style=${style}`

  request(url, function (err, response, body) {
    if (err)
      callback(err)
    if (response.statusCode !== 200)
      callback(new Error('Non-200 status code returned'))

    callback(null, body)
  });
}

function getCodeClimateStatus (repoUser, repoName, callback) {
  if (!repoUser || !repoName)
    callback(new Error('No ID given'))
  request(`https://codeclimate.com/github/${repoUser}/${repoName}/badges/gpa.svg`, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      const gpa = body.match(/<text [^>]*?>(\d.\d)<\/text>/)[1]
      callback(null, parseInt(gpa, 10))
    } else {
      callback(new Error(response.statusCode))
    }
  })
}

module.exports = function (hook) {
  getCodeClimateStatus(hook.params.user, hook.params.repo, (err, gpa) => {
    if (err) {
      // well shit
      getBadge({
        left: 'code climate',
        right: 'badge error',
        style: hook.params.style,
        color: 'lightgray'
      }, callback)
    } else {
      // We now have the GPA, let's categorize it
      let right, color
      if (gpa >= 3.5) {
        right = 'popsicle'
        color = '00bfff'
      } else if (gpa >= 3) {
        right = 'iced tea'
        color = '00cd89'
      } else if (gpa >= 2.5) {
        right = 'cold cereal'
        color = 'green'
      } else if (gpa >= 2) {
        right = 'crispy toast'
        color = 'yellow'
      } else if (gpa >= 1.5) {
        right = 'overdone pizza'
        color = 'orange'
      } else if (gpa >= 1) {
        right = 'in the oven'
        color = 'red'
      } else {
        right = 'literally on fire'
        color = 'b3002d'
      }

      // Allow thing as well
      if (hook.params.showgpa) {
        if (gpa.toString().length < 2) gpa = gpa.toString() + '.0'
        right += ` (${gpa})`
      }

      // All done
      getBadge({
        left: 'code climate',
        right: right,
        style: hook.params.style,
        color: color
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

} catch (e) {

module.exports = (hook) => {
  hook.res.end(require('util').inspect(hook), '\n\n', e)
}

}