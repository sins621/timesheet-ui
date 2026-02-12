export const API_URL = "https://warpdevelopment.atlassian.net/rest/api/3/";

export const ENDPOINTS = {
  me: {
    method: "GET",
    url: urlSchema.parse(API_URL + "project"),
  },
};
