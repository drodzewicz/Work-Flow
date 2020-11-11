# WorkFlow - Kanban board

**Work-Flow** is a web-based Kanban-style list making application used to manage work at personal or organizational level. Using this application organizing your work will be easy.

### Application fetures:

### Install dependencies

```sh
npm install
```

### Running app

```sh
npm run dev
```
> application requires a **.env** file which has to contain:
<br> DBURI: *Database URI*
<br> PORT: *clinet port*
<br> SERVER_PORT: *babckend server port*
<br> APP_SECRET: *secret that will be used to encrypt passwords and tokens*
<br> NODE_ENV: *[ production | development ]*

## Used Technologies
### Backend
* [Node.js](https://nodejs.org) - pen-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side
* [Express.js](https://expressjs.com) - for building web applications, APIs and connecting middleware.
* [MongoDB](https://www.mongodb.com) - NoSQL database for data storage.
* [Mongoose](http://mongoosejs.com/)  - ODM library for MongoDB and Node.js.
* [PassportJS](http://www.passportjs.org/) - authentication middleware for Node.js.
* [Passport-JWT](http://www.passportjs.org/packages/passport-jwt/) - A Passport strategy for authenticating with a JSON Web Token.
* [bcryptjs](https://www.npmjs.com/package/bcrypt) - A library to help you hash passwords.
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - An implementation of JSON Web Tokens.
* [socket.io](https://www.npmjs.com/package/socket.io) - Socket.IO enables real-time bidirectional event-based communication.

### Frontend
* [React](https://reactjs.org/) - Javascript library for creating User Interfaces.
* [React-Beautiful-DnD](https://github.com/atlassian/react-beautiful-dnd) - Library that allows for drag and drop interactions within React.
* [Material UI](https://material-ui.com/) - Styled components.
* [Formik](https://formik.org/) - Form library.
* [Yup](https://www.npmjs.com/package/yup) - JavaScript schema builder for value parsing and validation.
* [SASS](https://sass-lang.com/) - Used for styling HTML.
* [Prop Types](https://www.npmjs.com/package/prop-types) - Runtime type checking for React props and similar objects.
* [Query-String](https://www.npmjs.com/package/query-string) - Query String parser.
* [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
* [socket.io-client](https://www.npmjs.com/package/socket.io-client) - A standalone build of socket.io-client is exposed automatically by the socket.io server as /socket.io/socket.io.js.
* [React Router](https://reactrouter.com/web/guides/quick-start) - Library for creating navigations in one page applications in React.







