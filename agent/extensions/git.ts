import git from "eve/extensions/git";

import { brokerGitHubLease, GITHUB_CONNECTOR } from "../lib/github";

// `authorize` is the only access control. Commands use the caller's own
// token, which GitHub limits to the caller's access and the App's installation.
// Turns started from a GitHub comment cannot run commands: a diff under review
// is in context there, and it must not direct the commenter's access at other
// repositories. Those turns work from the checkout and reply in the thread.
export default git({
  github: {
    connector: GITHUB_CONNECTOR,
    broker: brokerGitHubLease,
    principalType: "user",
    authorize: ({ auth }) =>
      auth !== null && auth.authenticator !== "github-webhook",
  },
});
