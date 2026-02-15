'use strict'

import express from "express";
import path from "node:path";
import { Eta } from "eta";
import { getProjects } from "../lib/use-cases/jira.ts";
import { constructBasicAuthHeaders } from "../lib/use-cases/common.ts";
import env from "../env.ts";

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

app.get("/jira/projects", async (req, res) => {
  const { query } = req.query;
  if (query) console.log(query);
  const authHeaders = constructBasicAuthHeaders(env.TEST_WARP_EMAIL, env.JIRA_API_TOKEN);
  const result = await getProjects(authHeaders);
  if (result.isErr()) return res.status(503);
  return res.json(result.value)
})

app.listen(3000, () => {
  console.log("Server listening on port 3000")
})
