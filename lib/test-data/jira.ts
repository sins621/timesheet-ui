import { faker } from "@faker-js/faker";

const fields = [
  "description",
  "lead",
  "issueTypes",
  "url",
  "projectKeys",
  "permissions",
  "insight",
];

export const exampleProject = () => ({
  expand: faker.helpers
    .arrayElements(fields, { min: 1, max: fields.length })
    .join(","),
  self: faker.internet.url(),
  id: faker.number.int({ min: 10000, max: 99999 }),
  key: faker.lorem.word(3).toUpperCase(),
  name: faker.lorem.word(),
  avatarUrls: {
    "48x48": faker.internet.url(),
    "24x24": faker.internet.url(),
    "16x16": faker.internet.url(),
    "32x32": faker.internet.url(),
  },
  projectCategory: {
    self: faker.internet.url(),
    id: faker.number.int({ min: 10000, max: 99999 }),
    name: faker.lorem.word(),
    description: "",
  },
  projectTypeKey: faker.lorem.word(),
  simplified: faker.datatype.boolean(),
  style: "classic",
  isPrivate: faker.datatype.boolean(),
  properties: {},
});

export function getExampleProjects(count: number) {
  return Array.from({ length: count }, () => exampleProject())
};
