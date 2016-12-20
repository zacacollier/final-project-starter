const GitHubApi = require('github');

let github = new GitHubApi({
  debug: true,
  protocol: "https",
  host: "api.github.com",
  baseUri: "https://api.github.com",
  headers: {
    "user-agent": "zacacollier"
  },
  followRedirects: false,
  timeout: 5000
});

github.users.getFollowingForUser({
  username: "zacacollier"
})
  .then(response => console.log(JSON.stringify(response)))
  .catch(err => console.log(err))



