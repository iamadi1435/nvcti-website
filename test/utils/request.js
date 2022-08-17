const chaiHttp = require('chai-http')
const chai = require('chai')
const { expect } = chai

chai.use(chaiHttp)

module.exports = function (pathname) {
  const requester = chai.request('http://localhost:8080/api/v1/' + pathname)

  return function (path, code, method, done, token, body, cb) {
    const request = requester[method](path)
    if (token) { request.set('Authorization', 'Bearer ' + token) }
    if (body) { request.send(body) }
    request
      .end((err, res) => {
        expect(err).to
          .equal(null, 'Error in sending request: ' + err)
        expect(res).to
          .have.property('status', code, 'The response code was ' + res.status)
        expect(res).to
          .have.property('body')
        if (cb) { cb(res) }
        expect(res.get('Content-Type')).to
          .contain('application/json',
            'The retuned mimetype was ' + res.get('Content-Type'))
        done()
      })
    requester.keepOpen()
  }
}
