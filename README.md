**Work-Flow** is a web-based Kanban-style list making application used to manage work at personal or organizational level. Using this application organizing your work will be easy. Inspiration for this project came from such applications like: [Jira](https://www.atlassian.com/software/jira), [Github Projects](https://github.com/features/project-management/) and [Trello](https://trello.com/).
This project was build following the MERN stack (_Mongo_, _Express_, _React_, _Nodejs_). This application is also using _websockets_ so that when working with a team all chages can be seen without refreshing the page.

> All of the project functionalities are described in the [Documentation](https://github.com/drodzewicz/Work-Flow/wiki)

![Workflow task board](https://raw.githubusercontent.com/wiki/drodzewicz/Work-Flow/images/app-thumbnail.png)

**You can checkout live version of this app on** https://work-flow-rwsy.onrender.com/
<br>_\*opening the page sometimes might take a while since it is served by [render](https://render.com/) on a free plan and it will most likely initiate a cold start._

A **demo user** should be available on this instance. If you are not greeted with a demo dialog then you can login to demo user with following credentials

```
username: DemoUser
password: password123
```

### Running in development

**For project installation please navigate to** [documentation](https://github.com/drodzewicz/Work-Flow/wiki/Project-installation)

1. Open terminal in root directory
2. run `yarn server:dev:run`
3. Open second terminal in root directory
4. run `yarn client:dev:run`

### Running in production

1. Open terminal in root directory
2. run `yarn app:build`
3. run `yarn server:prod:run`


### Run Frontend tests
1. Open terminal in root directory
2. run `yarn client:test`

### Run End to End tests
1. Open terminal in root directory
2. run `yarn app:test`
