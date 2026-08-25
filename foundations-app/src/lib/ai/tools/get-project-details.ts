import "server-only";

import { tool } from "ai";
import { z } from "zod";
import { findPortfolioProject, type ProjectDetailsResult } from "@/lib/portfolio-projects";

export const getProjectDetailsInputSchema = z.object({
  projectName: z
    .string()
    .trim()
    .min(2, "Provide a recognizable portfolio project name.")
    .max(120, "Project names must be 120 characters or fewer.")
    .describe("Exact or recognizable portfolio project name"),
});

export async function lookupProjectDetails(projectName: string): Promise<ProjectDetailsResult> {
  const project = findPortfolioProject(projectName);

  if (!project) {
    throw new Error("Project details could not be found for that portfolio project.");
  }

  return { found: true, project };
}

export const getProjectDetails = tool({
  description:
    "Retrieve verified, structured details for a named portfolio project. Use for questions asking about a specific project, its technologies, decisions, evidence, or links. Do not use it for general career advice.",
  inputSchema: getProjectDetailsInputSchema,
  execute: async ({ projectName }) => lookupProjectDetails(projectName),
});
