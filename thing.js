// const svg2png = require('svg2png')
// const request = require('request')
// const someURL = 'http://latex.codecogs.com/svg.latex?\sum_{x=1}^{100}x=1+2+...+99+100=\frac{1}{2}(100+1)=500500'
//
// request(encodeURI(someURL), (err, res, body) => {
//   console.log(body)
//   const ogHeight = parseInt(/<svg height='([\d.]+)/.exec(body)[1], 10)
//   const buf = Buffer.from(body)
//   const png = svg2png.sync(body, {height: ogHeight * 1.2})
//   console.log(png)
// })

// const svg2png = require('svg2png')
const gm = require('gm')
const request = require('request')

module.exports = function (hook) {
  const someURL = `http://latex.codecogs.com/svg.latex?${hook.params.text}`
  request(encodeURI(someURL), (err, res, body) => {
    const ogHeight = parseInt(/<svg height='([\d.]+)/.exec(body)[1], 10)
    const buf = Buffer.from(body)
    gm(buf).toBuffer('PNG', (err, buffer) => {
      hook.res.setHeader('Content-Type', 'image/png');
      hook.res.end(buffer, 'binary')
    })
    // hook.res.end(png)
  })
}
