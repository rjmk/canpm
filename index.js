#!/usr/bin/env node
var child = require('child_process')

var argv = process.argv.slice(2)

var flags = argv.filter(function (arg) { return arg[0] === '-' }).join(' ')
var args = argv.filter(function (arg) { return arg[0] !== '-' })

args.forEach(save)

function save (package) {
  child.exec('npm info ' + package + ' repository.url gitHead', install)
}

function install (err, info) {
  if (err) throw err

  var path = makePath(info)
  var command = 'npm i ' + flags + ' ' + path
  child.exec(command)
}

// info ~ "repository.url = 'git+ssh://...' \n gitHead = '3f9dfd1e09c3...'\n"
// return ~ "'git+ssh://...'#'3f9dfd1e09c3...'"
function makePath (info) {
  return info
    .trim()
    .split('\n')
    .map(function (line) { return line.split('=')[1].trim() }).join('#')
}

