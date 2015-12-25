'use strict';

exports.__esModule = true;

var _yeomanGenerator = require('yeoman-generator');

var _child_process = require('child_process');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AssemblyLine = (function (_Base) {
  _inherits(AssemblyLine, _Base);

  function AssemblyLine() {
    _classCallCheck(this, AssemblyLine);

    return _possibleConstructorReturn(this, _Base.apply(this, arguments));
  }

  AssemblyLine.prototype.initializing = function initializing() {
    var _this2 = this;

    var done = this.async();

    (0, _child_process.exec)('git config --get remote.origin.url', function (err, stdout) {
      if (stdout.toString()) {
        _this2.config.set('repoType', 'git');
        _this2.config.set('repoUrl', stdout.split('\n')[0]);
      }
      done();
    });
  };

  AssemblyLine.prototype.prompting = function prompting() {
    var _this3 = this;

    var done = this.async();

    this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname
    }, {
      type: 'input',
      name: 'version',
      message: 'The project\'s initial version number',
      default: '1.0.0'
    }, {
      type: 'input',
      name: 'description',
      message: 'The project\'s description'
    }, {
      type: 'input',
      name: 'repoType',
      message: 'The repository type',
      default: this.config.get('repoType'),
      store: true
    }, {
      type: 'input',
      name: 'repoUrl',
      message: 'The repository url',
      default: this.config.get('repoUrl')
    }, {
      type: 'input',
      name: 'author',
      message: 'The project\'s author',
      store: true
    }, {
      type: 'input',
      name: 'keywords',
      message: 'Comma-separated project keywords',
      filter: function filter(keywords) {
        return keywords ? keywords.split(',').map(function (keyword) {
          return keyword.trim();
        }) : [];
      }
    }, {
      type: 'confirm',
      name: 'react',
      message: 'Will the project use React?',
      default: true
    }], function (answers) {
      _this3.config.set(answers);
      done();
    });
  };

  AssemblyLine.prototype.configuring = function configuring() {
    this.fs.copyTpl(this.templatePath('_.eslintrc'), this.destinationPath('.eslintrc'), this.config.getAll());
    this.fs.copy(this.templatePath('_.gitignore'), this.destinationPath('.gitignore'));
    this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), this.config.getAll());
    this.fs.copyTpl(this.templatePath('.babelrc'), this.destinationRoot(), this.config.getAll());
    this.fs.copy(this.templatePath('.editorconfig'), this.destinationRoot());
    this.fs.copy(this.templatePath('.nvmrc'), this.destinationRoot());
    this.fs.copy(this.templatePath('.travis.yml'), this.destinationRoot());
    this.fs.copyTpl(this.templatePath('LICENSE'), this.destinationRoot(), this.config.getAll());
    this.fs.copyTpl(this.templatePath('webpack.config'), this.destinationPath('webpack.config.js'), this.config.getAll());
  };

  AssemblyLine.prototype.writing = function writing() {
    this.fs.write(this.destinationPath('src/index.js'), '');
    this.fs.write(this.destinationPath('lib/index.js'), '');
    this.fs.write(this.destinationPath('dist/index.js'), '');
    this.fs.write(this.destinationPath('test/index.js'), '');
  };

  return AssemblyLine;
})(_yeomanGenerator.Base);

exports.default = AssemblyLine;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map