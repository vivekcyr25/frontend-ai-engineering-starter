# Agents and MCP

## 1. Workflow vs Agent

I think of a workflow as a route drawn before work starts: I define the stops, order, and handoffs. It can use AI, but it follows that route unless I change it.

An agent gets a goal and boundaries, then chooses its next action from the current situation. It might inspect a file, ask for missing evidence, revise a draft, or stop when checks pass. The distinction is not whether an LLM writes text; it is whether the system can adapt its next action to what it finds.

My FL-04 pipeline is a practical example:

```text
RAW PROJECT NOTES → GATHER → SYNTHESIZE → DRAFT → CRITIQUE → FINAL REVISION
```

This sequence helps case-study writing: Gather extracts supported facts, Synthesize organizes them, Draft writes, Critique finds problems, and Final Revision applies valid corrections. I can inspect every handoff and stop invented claims from flowing forward.

It does not decide to gather more evidence, read a repository, or run critique twice. It always has the same next box, so it is a **workflow**, not an agent.

## 2. My FL-04 Classification

FL-04 is a **WORKFLOW**. Its steps, handoffs, and output shapes are predefined. Critique follows Draft even when Gather already reveals a missing repository link or screenshot; it can flag the gap but does not choose to investigate it. That is useful for repeatable, auditable portfolio writing, where I retain responsibility for facts, contribution, metrics, and evidence.

## 3. MCP

Model Context Protocol (MCP) is a standard protocol through which an AI client can communicate with external capabilities from MCP servers. A client can discover exposed files, databases, APIs, or internal tools through a common interaction model instead of a custom integration for each one. MCP is not an agent; it can support a workflow, an agent, or one tool call.

MCP servers can expose three core primitives:

1. **Tools** are callable functions, such as listing allowed directories, reading a file, or searching text. Their descriptions and input schemas tell the client/model how to call them.
2. **Resources** are contextual data, such as a file, document, schema, or project record. They have identifiers (typically URIs) and can be read or attached as context.
3. **Prompts** are reusable, parameterized message templates. A client can present them for a user to select and fill in; they do not provide file access by themselves.

The protocol’s distinction is useful: tools are model-callable functions, resources are data/context, and prompts are user-selectable templates. The official MCP server specification describes the same three primitives and their control roles. [MCP server primitives](https://modelcontextprotocol.io/specification/2024-11-05/server/index)

MCP adds responsibility. A filesystem connection can expose sensitive files and a write-capable tool can change data, so the user should know allowed directories and approve sensitive actions. [MCP security principles](https://modelcontextprotocol.io/specification/2024-11-05/index)

## 4. My MCP Demonstration Status

The preferred demonstration is Claude Desktop plus a filesystem MCP server restricted to the FlyRank project directory. I checked before claiming success: this session exposes plugin resources, not a filesystem MCP server, and the standard local Claude Desktop configuration locations contained no `claude_desktop_config.json`. No filesystem MCP tool call is therefore available here.

`MCP-EVIDENCE.md` records this status and the exact tasks to run after a filesystem server is connected. It is deliberately not a substitute for real tool-use evidence or screenshots.

## 5. How FL-04 Could Become More Agentic

To upgrade FL-04, I would give it a goal such as “produce a publishable case study with every claim traceable to project evidence,” limited filesystem access, safe search/read tools, and clear stopping rules. It could decide whether it needs more evidence, a targeted question, or another critique rather than blindly executing five stages.

For example, if a draft contains an unsupported technology claim, an agent could search `package.json`, `requirements.txt`, imports, or architecture documentation; verify the dependency; correct the claim; and rerun the quality check. The fixed workflow relies on a human to supply extra verification.

This is more agentic because the next action is selected from the state of the work. It still needs read-only access by default, source citations, a retry limit, and human approval before publishing. Agentic does not mean unsupervised or automatically trustworthy.
