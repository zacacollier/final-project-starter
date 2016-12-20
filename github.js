const GitHubApi = require('github');

const github = new GitHubApi({
  debug: true,
  protocol: "https",
  host: "api.github.com",
  headers: {
    "user-agent": "zacacollier"
  },
  followRedirects: false,
  timeout: 5000
});

// Get single user
github.users.getForUser({ username:'zacacollier' })
  .then(res => console.log(res))
  .catch(err => console.log(err))
