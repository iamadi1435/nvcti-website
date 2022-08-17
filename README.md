# NVCTI website

### Front-End - React + CSS + Bootstrap + React-Bootstrap

### Back-End - Node.js, Express.js & MongoDB

### Steps to run the app locally

1. Clone the repo directly.
2. Make sure you have nodemon, Node.js and MongoDB installed in your system.
3. [Only once] Run (from the root) `npm install` and `cd client && npm install`.
4. Run `npm run dev` to start the application. Server will run at `port 8080` and UI will run at `port 3000`.
5. Go to `http://localhost:3000/` to see the application running.

### Steps for contributing

1. Make a separate branch for addition of any feature. Directly don't push to the `master` branch.
2. Name the branch as per the task assigned to you.
3. Make a pull request after you're done with the changes.

### Routes:
```
Methods: GET 
Routes: /**
```
*Web app routes:*
homepage, contact, register, about, signin, etc.

```
Methods: GET, POST, PUT, DELETE 
Routes: 
    Root: /api/v1/applicant
    Sub-routes: /, /:id, /verify, /photo, /login
```
*Applicant routes:*
get one, get all, update one, (soft and hard) delete one, get photo of one, verify email of one, login and get token for one

```
Methods: GET, POST, PUT, DELETE 
Routes: 
    Root: /api/v1/application
    Sub-routes: /, /:id, /document, /status (if required)
```
*Application routes:*
get one, (if required) get all, update one, (soft and hard) delete one, get documents of one, get status of one

```
Methods: GET, POST, PUT, DELETE 
Routes: 
    Root: /api/v1/admin
    Sub-routes: /, /:id, /verify (if required), /photo (if required), /login
```
*Admin routes:*
get one, get all (if required), update one, (soft and hard) delete one, get photo of one, verify email of one (if required), login and get token for one

```
Methods: POST
Routes: 
    Root: /api/v1/mail
    Sub-routes: /send?type=verification_email/status_change_email/new_application_email
```
*Mail routes:*
send one, send many