## Files and their uses

- `api.js` <br>
    Includes middleware and functions for REST manipulation like HATEOAS, setting cookies, headers, etc.

- `auth.js` <br>
    Primary authentication logic via middleware for authenticating a particular route, checking if a request is authenticated, checking the permissions of X-Requested-By user, generating JWTs, etc.

- `errors.js` <br>
    All the custom error classes

- `files.js` <br>
    Everything to do with file manipulation like appending, overwriting, creating, deleting, etc.

- `tools.js`v
    General purpose functions like time/date manipulation, encoding/decoding, delays, etc.

- `web.js` <br>
    HTTP requests and download handling

- `validator.js` <br>
    Data validation methods

- `setup.js` <br>
    Inital db setup

- `message.js` <br>
    Mailing utilities