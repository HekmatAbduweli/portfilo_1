import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import {getData} from "./server";
import { updateData } from "./server";
import {Project} from "../../frontend-ts/src/types"

const app = new Hono();

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", async (c) => {
  const data = await getData()
  return c.json({data});
});

app.post("/", async (c) => {
  const newRepo = await c.req.json<Project>();
const projects = await getData()
  projects.push(newRepo)
  await updateData(projects);
  return c.json(projects);
  
});

const port = 3999;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
