const { prompt } = require('inquirer')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')
const { exit, cwd } = require('node:process')

const { listTable } = require('../utils')
const tplList = require('../../templates')
const generateProject = require('../utils/generateProject')

listTable(tplList)

const question = [
  {
    type: 'input',
    name: 'name',
    message: 'Template name:',
    validate(val) {
      if (tplList[val]) {
        return true
      }
      
      if (val === '') {
        return 'Name is required!'
      }

      return `This template doesn\'t exists. 
          options: ${Object.keys(tplList)}`
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
]

module.exports = prompt(question).then((answers) => {
  const { name, project: projectName } = answers

  const gitPlace = tplList[name]['owner/name']
  const gitBranch = tplList[name]['branch']

  const spinner = ora('Downloading template...')
  spinner.start()

  download(`direct:https://github.com/${gitPlace}.git#${gitBranch}`, `./${projectName}`, { clone: true }, (err) => {
    if (err) {
      console.log(chalk.red(err))
      exit(1)
    }

    const path = `${cwd()}/${projectName}`
    generateProject({ answers, dist: path }, () => {
      spinner.stop()

      console.log(chalk.green(`\u2714 New project has been initialized successfully!`))
    })
  })
})
