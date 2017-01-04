module.exports = function (hook) {
  hook.res.end(JSON.stringify(hook.params, null, 4))
}