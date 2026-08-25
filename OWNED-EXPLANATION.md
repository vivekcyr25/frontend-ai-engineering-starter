# What I Now Understand

## The Real Piece
The Secure Server-Side AI Assistant & Tool-Calling Pipeline (`POST /api/assistant`)

---

## My Explanation

In my portfolio, I built an interactive technical assistant that lets recruiters and engineers ask questions about my engineering projects.

Here is how it actually works under the hood:

1. **Why it needs a backend route:**  
   I don't call Groq or OpenAI directly from the browser because doing so would expose my private API keys in the browser's network tab. Instead, the browser sends a message to my own server endpoint at `/api/assistant`. The server keeps my credentials private in `.env.local` and makes the external AI calls on my behalf.

2. **How tool-calling eliminates hallucinations:**  
   LLMs can easily invent fake stats or metrics. To stop this, I gave the model a custom tool called `getProjectDetails`. When someone asks about my video restoration pipeline, the model stops generating text and runs my tool with the project name. The tool looks up the exact, verified data (technologies, problem statement, and real engineering boundaries) in `portfolio-projects.ts` and returns it directly.

3. **How the response streams back:**  
   Instead of making the visitor wait 5 seconds for a full paragraph, the server streams tokens back word-by-word as they generate. If the external AI service drops or if no API key is provided, the route does not crash—it catches the missing model and runs a local fallback stream with verified project details.

4. **The files involved:**  
   - `foundations-app/src/app/api/assistant/route.ts`: The Next.js server route that manages models, streaming, and tool execution.
   - `foundations-app/src/lib/ai/tools/get-project-details.ts`: The tool definition with Zod schema validation.
   - `foundations-app/src/lib/portfolio-projects.ts`: The single source of truth for all verified project data.
   - `foundations-app/.env.local`: The server-only environment file containing my API keys.

---

## What I Learned

I learned that building production AI features isn't just about sending a prompt to an API. It requires:
- Isolating secrets on the server so they never leak to the client.
- Structuring tools with schemas so the AI is forced to fetch real facts from code rather than making up answers.
- Designing fallbacks so the application remains functional even when third-party APIs fail.
