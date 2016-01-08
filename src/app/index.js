import {Base} from 'yeoman-generator'
import {exec} from 'child_process'
import chalk from 'chalk'
import mkdirp from 'mkdirp'
import path from 'path'

export default class AssemblyLine extends Base {

  initializing() {
    const done = this.async()

    this.log(chalk.blue(`
      ___                         _     _         _     _
     / _ \\                       | |   | |       | |   (_)
    / /_\\ \\___ ___  ___ _ __ ___ | |__ | |_   _  | |    _ _ __   ___
    |  _  / __/ __|/ _ \\ '_ \` _ \\| '_ \\| | | | | | |   | | '_ \\ / _ \\
    | | | \\__ \\__ \\  __/ | | | | | |_) | | |_| | | |___| | | | |  __/
    \\_| |_/___/___/\\___|_| |_| |_|_.__/|_|\\__, | \\_____/_|_| |_|\\___|
                                           __/ |
                                          |___/
    `))

    exec('git config --get remote.origin.url', (err, stdout) => {
      if (stdout.toString()) {
        this.config.set('repoType', 'git')
        this.config.set('repoUrl', stdout.split('\n')[0])
      }
      done()
    })
  }

  prompting() {
    const done = this.async()

    this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Your project name:',
      default: path.basename(this.destinationRoot()),
    }, {
      type: 'input',
      name: 'version',
      message: 'The project\'s initial version number:',
      default: '1.0.0',
    }, {
      type: 'input',
      name: 'description',
      message: 'The project\'s description:',
    }, {
      type: 'input',
      name: 'repoType',
      message: 'The repository type:',
      default: this.config.get('repoType'),
      store: true,
    }, {
      type: 'input',
      name: 'repoUrl',
      message: 'The repository url:',
      default: this.config.get('repoUrl'),
    }, {
      type: 'input',
      name: 'author',
      message: 'The project\'s author:',
      store: true,
    }, {
      type: 'input',
      name: 'keywords',
      message: 'Comma-separated project keywords:',
      filter: keywords => keywords ? keywords.split(',').map(keyword => keyword.trim()) : [],
    }, {
      type: 'confirm',
      name: 'react',
      message: 'Will the project use React?',
      default: true,
    }], answers => {
      this.config.set(answers)
      done()
    })
  }

  configuring() {
    this.fs.copyTpl(this.templatePath('*'), this.destinationRoot(), this.config.getAll())
    this.fs.copyTpl(this.templatePath('.*'), this.destinationRoot(), this.config.getAll())
    this.fs.copy(this.templatePath('static/*'), this.destinationRoot())
    this.fs.copy(this.templatePath('static/.*'), this.destinationRoot())
  }

  writing() {
    mkdirp.sync(this.destinationPath('src'))
    mkdirp.sync(this.destinationPath('lib'))
    mkdirp.sync(this.destinationPath('dist'))
    mkdirp.sync(this.destinationPath('test'))
  }

}
