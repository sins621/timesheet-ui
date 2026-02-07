import { urlSchema } from "../schemas/common.ts";

export const COST_CODE_IDS: Record<string, number> = {
  Consulting: 1,
  "Software Development": 2,
  "Graphic Design": 3,
  "Onsite Support: Infrastructure": 5,
  "Onsite Support: Software": 6,
  "Telephonic Support: Infrastructure": 8,
  "Telephonic Support: Software": 9,
  "Telephonic Support: Internet": 10,
  "Telephonic Support: Hosting": 11,
  "Sales: Internet": 13,
  "Sales: Hosting": 14,
  "Web Update": 15,
  "Quality Assurance": 16,
  "Software Design": 18,
  Documentation: 19,
  "Testing: Software": 20,
  "Testing: Web": 21,
  "Testing: Hardware": 22,
  "Testing: Infrastructure": 23,
  "Bug Fix": 24,
  Miscellaneous: 26,
  Management: 27,
  Support: 28,
  "Data Capturing": 29,
  Research: 30,
  Report: 31,
  "Social Marketing": 33,
  "Support: Callout JHB": 34,
  "Support: In House": 35,
  Deployment: 36,
  "Onsite Support": 37,
  "Remote Support": 38,
  Training: 40,
  Styling: 41,
  SEO: 42,
  "Scrum and Project Administration": 43,
  "Marketing Automation": 45,
  "Online Marketing": 46,
  Copywriting: 48,
  "UX Design": 51,
  "Server maintenance": 52,
  Timesheets: 57,
  "Daily Standup Meeting": 59,
  "Support Management": 60,
  "Planning & Design": 61,
} as const;

export const API_URL = "https://office.warpdevelopment.com/api/";

export const ENDPOINTS = {
  me: {
    method: "GET",
    url: urlSchema.parse(API_URL + "users/me")
  },
  getProjects: {
    method: "GET",
    url: urlSchema.parse(API_URL + "Project")
  },
  authorise: {
    method: "POST",
    url: urlSchema.parse(API_URL + "account/authorise")
  }
};
