const NVCTIResourceNotFoundException = require('../exceptions/NVCTIResourceNotFoundException')
const { readFile } = require('fs')
const { join } = require('path')

class Template {
  constructor ({ name, subject }) {
    this.name = name
    this.subject = subject
  }

  getTemplateAddress () {
    return join(__dirname, '../..', 'resources/templates', this.name + '.html')
  }

  getTemplateString () {
    return new Promise((resolve, reject) => {
      readFile(this.getTemplateAddress(), 'utf8', (err, file) => {
        if (err) reject(new NVCTIResourceNotFoundException(err.path))
        resolve(file)
      })
    })
  }

  async getBody (variables) {
    const str = await this.getTemplateString()
    return this.setVariables(str, variables)
  }

  getSubject () {
    return this.subject
  }

  replaceVariables (str, name, value) {
    const then = Date.now()
    if (typeof str === 'string') {
      let j = 0
      while (j >= 0 && Date.now() - then < 10000) {
        j = str.indexOf('${' + name + '}', j > 0 ? j + 1 : 0)
        if (j === -1 || (j > 0 && str[j - 1] === '\\')) {
        } else {
          const first = str.substring(0, j)
          const last = str.substring(j + name.length + 3)
          str = first + value + last
        }
      }

      return str
    }
  };

  setVariables (str, variables) {
    // for (let a in variables) {
    // Using regular expression
    // let regex = new RegExp('\\$\\{' + a + '\\}', 'g');
    // str = str.replace(regex, variables[a]);
    // }
    Object.keys(variables)
      .forEach(v => (str = this.replaceVariables(str, v, variables[v])))
    return str
  }
}

module.exports = Template
