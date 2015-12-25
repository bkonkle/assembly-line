import {Base} from 'yeoman-generator'
import {exec} from 'child_process'

export default class AssemblyLine extends Base {

  initializing() {
    const done = this.async()

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
      message: 'Your project name',
      default: this.appname,
    }, {
      type: 'input',
      name: 'version',
      message: 'The project\'s initial version number',
      default: '1.0.0',
    }, {
      type: 'input',
      name: 'description',
      message: 'The project\'s description',
    }, {
      type: 'input',
      name: 'repoType',
      message: 'The repository type',
      default: this.config.get('repoType'),
      store: true,
    }, {
      type: 'input',
      name: 'repoUrl',
      message: 'The repository url',
      default: this.config.get('repoUrl'),
    }, {
      type: 'input',
      name: 'author',
      message: 'The project\'s author',
      store: true,
    }, {
      type: 'input',
      name: 'keywords',
      message: 'Comma-separated project keywords',
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
    this.fs.copyTpl(this.templatePath('_.eslintrc'), this.destinationPath('.eslintrc'), this.config.getAll())
    this.fs.copy(this.templatePath('_.gitignore'), this.destinationPath('.gitignore'))
    this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), this.config.getAll())
    this.fs.copyTpl(this.templatePath('.babelrc'), this.destinationRoot(), this.config.getAll())
    this.fs.copy(this.templatePath('.editorconfig'), this.destinationRoot())
    this.fs.copy(this.templatePath('.nvmrc'), this.destinationRoot())
    this.fs.copy(this.templatePath('.travis.yml'), this.destinationRoot())
    this.fs.copyTpl(this.templatePath('LICENSE'), this.destinationRoot(), this.config.getAll())
    this.fs.copyTpl(this.templatePath('webpack.config'), this.destinationPath('webpack.config.js'), this.config.getAll())
  }

  writing() {
    this.fs.write(this.destinationPath('src/index.js'), '')
    this.fs.write(this.destinationPath('lib/index.js'), '')
    this.fs.write(this.destinationPath('dist/index.js'), '')
    this.fs.write(this.destinationPath('test/index.js'), '')
  }

}
