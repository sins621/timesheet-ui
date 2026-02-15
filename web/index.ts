'use strict'

import { Eta } from "eta";
import env from "../env.ts";
import path from "node:path";
import express from "express";
import { getProjects } from "../lib/use-cases/jira.ts";
import { constructBasicAuthHeaders } from "../lib/use-cases/common.ts";

const app = express()
app.use(express.json())

const eta = new Eta({
  views: path.join(import.meta.dirname, "views"),
  cache: true
})

app.get("/", (_, res) => {
  const renderedTemplate = eta.render("home", {})
  res.status(200).send(renderedTemplate)
})

app.get("/jira/projects", async (_, res) => {
  const authHeaders = constructBasicAuthHeaders(env.TEST_WARP_EMAIL, env.JIRA_API_TOKEN);
  const result = await getProjects(authHeaders);
  if (result.isErr()) {
    console.log("GET: /jira/projects failed getProjects() with err: ", result.error);
    return res.status(503).json({ error: "Failed to fetch projects" })
  };
  return res.json(result.value)
})

app.listen(3000, () => {
  console.log("Server listening on port 3000")
})
