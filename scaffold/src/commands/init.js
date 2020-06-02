const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require('../utils')
const { resolve } = require('path')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')

let tplList = require('../../templates')

const question = [
  {
    type: 'input',
    name: 'name',
    message: 'Template name:',
    validate(val) {
      if (tplList[val]) {
        return true
      } else if (val === '') {
        return 'Name is required!'
      } else {
        return `This template doesn\'t exists. 
          options: ${Object.keys(tplList)}`
      }
    },
  },
  {
    type: 'input',
    name: 'project',
    message: 'Local project name:',
    validate(val) {
      if (val !== '') {
        return true
      }
      return 'Project name is required!'
    },
  },
  {
    type: 'input',
    name: 'place',
    message: 'Where to init the Local project:',
    default: './',
  },
]

module.exports = prompt(question).then(({ name, place: localPath, project: localProject }) => {
  const gitPlace = tplList[name]['owner/name']
  const gitBranch = tplList[name]['branch']
  
  const spinner = ora('Downloading template...')
  spinner.start()

  download(`direct:https://github.com/${gitPlace}.git#${gitBranch}`, `${localPath}/${localProject}`, { clone: true }, (err) => {
    if (err) {
      console.log(chalk.red(err))
      process.exit()
    }
    spinner.stop()
    console.log(chalk.green('New project has been initialized successfully!'))
  })
})
