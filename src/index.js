const app = require('electron').app
const cli = require('./cli')
const gui = require('./gui')
const minimist = require('minimist')
const utils = require('./utils')

let argv, isGuiStart

const prepare = function () {
  let argPos = process.env.NODE_ENV == 'development' ? 2 : 1
  argv = minimist(process.argv.slice(argPos))
  argv['original_string'] = process.argv.slice(argPos + 1)
  isGuiStart = argv['_'].length == 0

  //Need to hide icon
  if (utils.isMacOS && !isGuiStart) {
    app.dock.hide()
  }
}

const guiStart = function () {
  gui.execute(null, app.quit)
}

const cliStart = function () {
  let cmdName = argv['_'][0]
  cli.execute(cmdName, argv, app.quit)
}

prepare()
app.on('ready', isGuiStart ? guiStart : cliStart)
