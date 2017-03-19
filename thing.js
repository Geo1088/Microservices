const svg2png = require('svg2png')
const request = require('request')

module.exports = function (hook) {
  const someURL = `http://latex.codecogs.com/svg.latex?${hook.params.text}`
  request(encodeURI(someURL), (err, res, body) => {
    const ogHeight = parseInt(/<svg height='([\d.]+)/.exec(body)[1], 10)
    const buf = Buffer.from(body)
    const png = svg2png.sync(body, {height: ogHeight * 1.2})
    hook.res.end(png)
  })
}
