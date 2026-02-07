export type User = {
  email: string;
  warpAuth?: WarpAuth;
  jiraAuth?: JiraAuth;
};

export type WarpAuth = {
  password?: string;
  token: string;
};

export type JiraAuth = {
  token: string;
};
