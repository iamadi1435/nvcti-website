// We can test the API routes here
// I've made one test

// NPM modules
const chai = require('chai')
const { expect } = chai
const chaiHttp = require('chai-http')

// Server
const requester = chai.request('http://localhost:8080')

// For cleaner HTTP requests
chai.use(chaiHttp)

describe('Website', () => {
  beforeEach((done) => {
    // We'll do something like emptying the database,
    // before starting each test (if required)
    // For now, we'll leave this empty

    done()
  })

  describe('GET /', () => {
    it('should GET an HTML file', (done) => {
      requester
        .get('/')
        .end((err, res) => {
          expect(err).to
            .equal(null, 'An error occured in requesting data: ' + err)
          expect(res).to
            .have.property('status', 200, 'The response code was ' + res.status)
          expect(res).to
            .have.property('body')
          expect(res.get('Content-Type')).to
            .contain('text/html',
              'The retuned mimetype was ' + res.get('Content-Type'))
          done()
        })
    })
  })

  describe('GET /api', () => {
    it('should GET an HTML file', (done) => {
      requester
        .get('/api')
        .end((err, res) => {
          expect(err).to
            .equal(null, 'An error occured in requesting data: ' + err)
          expect(res).to
            .have.property('status', 200, 'The response code was ' + res.status)
          expect(res).to
            .have.property('body')
          expect(res.get('Content-Type')).to
            .contain('text/html',
              'The retuned mimetype was ' + res.get('Content-Type'))
          done()
        })
    })
  })

  describe('GET /api/v1', () => {
    it('should GET an HTML file', (done) => {
      requester
        .get('/api/v1')
        .end((err, res) => {
          expect(err).to
            .equal(null, 'An error occured in requesting data: ' + err)
          expect(res).to
            .have.property('status', 200, 'The response code was ' + res.status)
          expect(res).to
            .have.property('body')
          expect(res.get('Content-Type')).to
            .contain('text/html',
              'The retuned mimetype was ' + res.get('Content-Type'))
          done()
        })
    })
  })

  describe('GET /contact', () => {
    it('should GET an HTML file', (done) => {
      requester
        .get('/contact')
        .end((err, res) => {
          expect(err).to
            .equal(null, 'An error occured in requesting data: ' + err)
          expect(res).to
            .have.property('status', 200, 'The response code was ' + res.status)
          expect(res).to
            .have.property('body')
          expect(res.get('Content-Type')).to
            .contain('text/html',
              'The retuned mimetype was ' + res.get('Content-Type'))
          done()
        })
    })
  })

  describe('GET /register', () => {
    it('should GET an HTML file', (done) => {
      requester
        .get('/register')
        .end((err, res) => {
          expect(err).to
            .equal(null, 'An error occured in requesting data: ' + err)
          expect(res).to
            .have.property('status', 200, 'The response code was ' + res.status)
          expect(res).to
            .have.property('body')
          expect(res.get('Content-Type')).to
            .contain('text/html',
              'The retuned mimetype was ' + res.get('Content-Type'))
          done()
        })
    })
  })

  describe('GET /about', () => {
    it('should GET an HTML file', (done) => {
      requester
        .get('/about')
        .end((err, res) => {
          expect(err).to
            .equal(null, 'An error occured in requesting data: ' + err)
          expect(res).to
            .have.property('status', 200, 'The response code was ' + res.status)
          expect(res).to
            .have.property('body')
          expect(res.get('Content-Type')).to
            .contain('text/html',
              'The retuned mimetype was ' + res.get('Content-Type'))
          done()
        })
    })
  })

  describe('GET /events', () => {
    it('should GET an HTML file', (done) => {
      requester
        .get('/events')
        .end((err, res) => {
          expect(err).to
            .equal(null, 'An error occured in requesting data: ' + err)
          expect(res).to
            .have.property('status', 200, 'The response code was ' + res.status)
          expect(res).to
            .have.property('body')
          expect(res.get('Content-Type')).to
            .contain('text/html',
              'The retuned mimetype was ' + res.get('Content-Type'))
          done()
        })
    })
  })
})
