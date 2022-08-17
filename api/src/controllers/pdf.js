const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs-extra')
const ejs = require('ejs')
const NVCTIBaseExceptionHandler = require('../core/NVCTIBaseExceptionHandler')
const Application = require('../models/Application')
const IITISMApplicant = require('../models/IITISMApplicant')
const ExternalApplicant = require('../models/ExternalApplicant')
const moment = require('moment')

module.exports = {
  getPdf: async function (req, res) {
    try {
      const id = req.params.id
      const application = await Application.findByPk(id)
      let applicant
      if (application.iitismId) {
        applicant = await IITISMApplicant.findByPk(application.iitismId)
      } else {
        applicant = await ExternalApplicant.findByPk(application.externalId)
      }
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      const filePath = path.join(
        __dirname,
        '..',
        '..',
        'resources',
        'templates',
        'form.ejs'
      )
      const data = {
        application: application,
        applicant: applicant,
        API_URL: process.env.API_URL,
        createdAt: moment(application.createdAt).format('MM/DD/YYYY')
      }
      const html = await fs.readFile(filePath)
      const compiled = await ejs.render(html.toString(), data)
      await page.setContent(compiled)
      const pdf = await page.pdf({
        format: 'a4',
        printBackground: true,
        pageRanges: '1'
      })
      await browser.close()
      res.writeHead(200, [['Content-Type', 'application/pdf']])
      res.end(new Buffer(pdf, 'base64'))
    } catch (err) {
      err = NVCTIBaseExceptionHandler(err)
      res.status(err.code).json(err)
    }
  }
}
