var child = require('child_process')
var fs = require('fs')
var assert = require('assert')

child.exec('node index.js -S is-negative-zero@1.0.0', function (err, output) {
  var packagejson = fs.readFileSync(__dirname + '/package.json')
  var node_modules = fs.readdirSync(__dirname + '/node_modules')

  assert.ok(packagejson.indexOf('f632ae1') > -1, 'commit saved')
  assert.ok(node_modules.indexOf('is-negative-zero') > -1, 'module saved')

  child.exec('npm un -S is-negative-zero', function (err, _) {
    if (err) throw err
  })
})
