## **1. Problem Discovery + Jobs To Be Done**

### a) Decoding the hypothesis: *AI agents for automating SEO and GEO AI (focus on closing manual, boring tasks)*

First we need to understand what this hypothesis is and what we mean by it. To do that we pull out the keywords:

- SEO agencies or SMBs (they will be our potential clients. I suggest we stop at SEO agencies)
- Manual and boring tasks (the pain points we want to close)
- AI agents (the tasks will be done automatically, with AI)

Before we shape the product hypothesis in the right format, two things need to be clear:

- What do SEO agencies do?
- Which of their tasks can be considered manual and boring?

---

### b) Breaking down how SEO agencies work and what their tasks are

For the breakdown I did two things:

- Googled about 10 SEO agencies and looked at their list of services
- Asked Claude and GPT for the same information, to get the full picture.

Here is what I got:

**Overall list of tasks:**

1. **Keyword research** — collection, filtering, clustering.
2. **Technical audit** — checking pages, speed, errors, duplication.
3. **Content plan and optimization** — topic selection, meta, headings.
4. **Client reports** — monthly or per project, charts, tables.
5. **Link building / outreach** — finding donors, communication, tracking links.

Next, assume which of these tasks are boring and routine. We are only assuming. Ideally I would talk to real agencies to validate the set of services and the tasks that cause the most trouble.

**Boring and routine tasks (hypothesis):**

- Collecting and clustering keywords
- Putting together reports and visualizations
- Checking pages for errors (tech audit)
- Small content edits for SEO

---

### c) Prioritize and form JBTD

We need to define 3 key JTBD, and we have more assumed tasks than that. For prioritization (in reality) we would go to real conversations because they are more effective, but for the test we will do a simple prioritization and decide what matters most ourselves (an assumption).

For that we take our boring and routine tasks and score them:

| Task | Importance / time | AI automation | Comment |
| --- | --- | --- | --- |
| Collecting and clustering keywords | Very high | Yes | A key routine stage of a content strategy |
| Putting together reports and visualizations | High | Yes | People like to automate this, it saves hours |
| Checking pages for errors | Medium | Yes | Important when launching new pages |
| Small content edits | Low | Yes | Can be added as an extra feature, but not critical |

**Choice of 3 key JTBD:**

1. Collecting and clustering keywords
2. Automatic SEO report creation
3. Technical page audit

Now we can turn our pain points into JTBD:

**Collecting and clustering keywords**

- **JTBD:** When I run several client sites, I want to quickly collect and group keyword queries so I save time and launch the content strategy faster.

**Putting together reports and visualizations**

- **JTBD:** When I need to report to a client, I want to automatically generate an SEO report with charts and metrics so I do not spend hours on manual preparation.

**Checking pages for errors (tech audit)**

- **JTBD:** When a new page or landing goes live, I want to automatically check technical SEO errors so I minimize indexing problems.

---

After describing the JTBD we can describe the specific use cases where our AI agent will be used.

### d) Forming use cases

### 1. Collecting and clustering keywords

**Use Case:**

- The SEO agent connects the AI agent to GSC/SEMrush/Ahrefs.
- The agent collects a list of keyword queries for the project.
- Keywords are automatically grouped by intent, search volume, and competition.
- The agent returns a ready list for copywriters and the content plan.

**Example scenario:**

“An agency launches a new client site in the coffee-shop niche. Instead of a manual search for 500+ keywords, the AI agent collects all queries, splits them into categories: informational, commercial, local, and immediately returns a table with content priority.”

---

### 2. Automatic SEO report creation

**Use Case:**

- The AI agent connects to GA4/GSC and collects data on traffic, positions, and CTR.
- It automatically builds charts and KPI tables.
- It produces a PDF report for the client with insights and recommendations.

**Example scenario:**

“Every month the agency prepares a report for an e-commerce client. The AI agent collects data on keyword positions, traffic, and CTR and builds a PDF with charts that can be sent to the client right away.”

---

### 3. Technical page audit

**Use Case:**

- The agent runs new landings and site pages through a checklist: load speed, meta tags, H1/H2, canonical, robots.txt.
- It automatically finds errors and returns recommendations on how to fix them.

**Example scenario:**

“The agency launches a promo page for a campaign. The AI agent checks the page for technical SEO errors, reports that canonical is not set, H1 is missing, and load speed is low, and also returns instructions on how to fix it.”

What is left is to describe how we will validate that the market pain is real.

### e) Checking market pains. A short description of the methods.

I would go two ways and choose between them depending on how many resources we have. Interviews can give higher accuracy, but they take more time and cost more. A simple prototype takes less, but gives less understanding of the audience and their problems, and only shows the reaction in numbers.

**Qualitative check (interviews and surveys)**

- Run 5–10 short interviews with SEO specialists and agencies.
- Ask:
    - “Which task takes the most of your time?”
    - “What annoys you most in routine work?”
    - “Which processes would you like to automate right now?”
- Listen for which JTBD cause the most pain.

**Quantitative check (a minimal test)**

- Create a simple landing that describes an AI agent for a specific use case.
- Bring the audience in through LinkedIn/Twitter/Reddit.
- Collect clicks, signups, or requests for beta access.
- A high response → confirmation of the market pain.

After the JTBD is confirmed through interviews or a minimal test, we can move on to a product hypothesis in the “If X, then Y” format for each key use case.

---

## **2. AI Tools & SEO AI**

### a) Find 3 competing products and break down their positioning

1. The first thing I will do is pick the tool I will use to collect information: it will be Perplexity. Why? In a Harvard study the model showed itself as the most accurate (I could not quickly find the science paper)
2. I will write a prompt. I need to find 3 competing products and break down their positioning (name, audience, key features, user pains, market positioning). I will use this combination:

**"Find 3 modern AI-first SEO tools (AI agents) that automate routine SEO tasks such as keyword research, content planning, SEO reporting, and technical audits. For each tool, provide:**

1. **Name**
2. **Key features / functions**
3. **Target audience (SEO agencies, SMBs, freelancers)**
4. **User pain points it solves**
5. **Market positioning – how the tool is marketed, the main value proposition, and what differentiates it from competitors"**

And here are the results the LLM gave me:

| **Name** | **Key Features / Functions** | **Target Audience** | **User Pain Points Solved** | **Market Positioning & Differentiators** |
| --- | --- | --- | --- | --- |
| SEO.ai | AI-driven content creation in 50+ languages, predictive keyword intelligence, dynamic content gap analysis, AI-powered internal linking, real-time SEO optimization, interactive AI chat assistant. | Content teams, SEO professionals, SMBs | Automates complex SEO tasks, predictive trend spotting, seamless content creation with SEO, internal linking automation. | AI-first tool built from ground up for SEO with deep automation; positioned as a futuristic, comprehensive AI SEO solution for efficiency and scale. |
| Nightwatch SEO AI Agent | AI chatbot for keyword research, clustering, competitor analysis, SEO-friendly content generation, technical SEO issue identification, integration with Google tools. | SEO professionals, agencies | Automates keyword and content organization, detects technical issues, supports hands-off SEO task execution. | Positioned as a 24/7 AI SEO assistant linked to Google data for accuracy; stands out by interactive AI chatbot format explicitly tailored for SEO. |
| Chatsonic SEO AI Agent | AI-powered workflow combining keyword research, content creation, on-page SEO optimization, real-time rank data analysis, competitor difficulty assessment, detailed keyword reports. | SEO agencies, freelancers, SMBs | Reduces SEO workload by automating research and content optimization, improves ranking efficiency, integrates live Google Search Console data. | Marketed as an all-rounder AI SEO agent with comprehensive automated workflows; differentiates by combining real-time data and AI insight generation. |

### b) Learn the 5 pains of users of these tools

Next we need to understand which 5 main pains users of these tools feel. The AI gave us a surface-level picture, but it could have made things up, because it does not have the full context.

I see a few ways to solve this:

1. Take AI agents that analyze reviews of competitor products and return insights (expensive, and there are no trials)
2. Ask the AI separately for a kind of extract of shared pains across different tools (cheap, but accuracy may be low)
3. Analyze competitor reviews by hand (which does not match our assignment, would be expensive for the company, and would take a lot of time)

I choose the second path: get a rough temperature check and work from that. For this we write another prompt and send it to Perplexity:

**“Based on user reviews, testimonials, and comparison articles available online, summarize the 5 most common user pain points for the following AI SEO tools:**

1. **SEO.ai**
2. **Nightwatch SEO AI Agent**
3. **Chatsonic SEO AI Agent**

**For each tool, list its specific user pain points. Then, provide a short synthesis: what are the 5 most common pain points across all three tools?”**

| **Tool** | **Specific User Pain Points** |
| --- | --- |
| **SEO.ai** | - AI content sometimes sounds mechanical or robotic |
|  | - Requires human oversight and fact-checking |
|  | - Uneven performance on highly technical or niche topics |
|  | - Steep learning curve for advanced AI features like internal linking and keyword prediction |
|  | - Limited full potential without integration with other SEO/content tools |
| **Nightwatch SEO AI Agent** | - Limited advanced/custom reporting beyond keyword tracking and competitor analysis |
|  | - Complex setup and integration of Google Analytics/Search Console |
|  | - User interface can become overwhelming if more features are added |
|  | - Data refresh speed could be faster for real-time insights |
|  | - Lacks full automation coverage for all SEO tasks |
| **Chatsonic SEO AI Agent** | - AI content may require multiple revisions due to inaccuracies or lack of context |
|  | - Trial-and-error needed for prompt engineering |
|  | - Recommendations sometimes require manual fact-checking due to AI hallucinations |
|  | - Balancing automation with quality control needs frequent user intervention |
|  | - Falls short on highly specialized or technical SEO tasks without expert input |

**Synthesis: 5 Most Common Pain Points Across All Tools**

1. **Need for human oversight and fact-checking of AI outputs**
2. **AI-generated content can be mechanical, generic, or inaccurate**
3. **Steep learning curve and setup complexity with advanced AI features and integrations**
4. **Partial automation—Tools require manual intervention for complex SEO and specialized tasks**
5. **Desire for faster, real-time data updates and more comprehensive automation coverage**

We know the competitors, we know their positioning, we know their users’ pains. Now we need to design our own solution from all of this information. I suggest showing it as a pains = solutions table and then assembling a product concept from that.

### c) Forming a basic AI SEO solution

With an LLM we describe a solution for each of the 5 main pains:

| Pain | How we solve it |
| --- | --- |
| **1. Human control and fact-checking of AI results are required** | A built-in “Human-in-the-loop” module: the editor gets highlights on doubtful facts (checked against databases, news, links). The AI does not publish directly; it proposes a draft with comments. |
| **2. AI content is mechanical, generic, or inaccurate** | Personalized “SEO avatars” (AI profiles) trained on the brand history, tone, and the base of past publications. The system adapts style and depth of analysis. |
| **3. Hard to learn and set up** | “Plug&Play” scenarios: ready workflows (article generation, optimization, internal linking, publishing). UX like Notion/Trello, where setup happens through drag and drop. |
| **4. Partial automation, manual intervention is still required** | An agent model: the SEO agent takes a task end to end (write + optimize + publish). The user only approves the result. For complex tasks (for example, picking links) the agent calls specialized sub-agents. |
| **5. A wish to update data faster and in real time** | Connection to live APIs (Google Search Console, Ahrefs, Semrush, Google Trends). The AI updates the dashboard automatically and recalculates priorities in real time. |

Now we can describe our solution as a whole product. We will use ChatGPT.

Our AI SEO agent

### 1. Target audience

- SEO agencies that need to speed up work, raise content quality, and automate routine tasks.

### 2. Main pains of the audience

1. **The need for manual control and fact-checking of AI results**
2. **Content is often templated and mechanical**
3. **Complicated setup and integrations with various SEO tools**
4. **Partial automation — manual tasks remain**
5. **Slow updates / no real-time data**

### 3. How our solution solves the pains

| Pain | Solution |
| --- | --- |
| Human oversight / fact-checking | The AI agent highlights doubtful data and provides links to sources for a quick check. |
| Templated / mechanical content | Content generation that takes the agency’s style and past publications into account; varied text structures. |
| Integration complexity | Plug&Play connection to GA4/GSC; ready scenarios “analysis → optimization → recommendations”. |
| Partial automation | End-to-end agent: semantic collection → content generation → optimization → recommendations; a human steps in only at strategic stages. |
| Slow updates | Connection to a live API, automatic updates of the dashboard and recommendations in real time. |

### 4. Key features

- Automatic collection and clustering of semantics.
- Content generation with SEO optimization.
- Integration with GA4/GSC for current data.
- A fact-checking module with links to sources.
- Real-time data updates and priority recalculation.
- An end-to-end workflow for SEO agencies.
- Personalization to the agency’s style.

### 5. Positioning

**An AI SEO agent for agencies** that automates routine SEO tasks, turns data into clear business insights, and lets the team focus on strategic decisions.

**Difference:** not just content generation, but **a full SEO working cycle with minimal manual control** and current data.

### 6. Value for the client

- Less time on routine tasks.
- Higher content quality and more relevant SEO output.
- Transparency and predictable results for the agency.
- Easy to learn and to integrate with existing processes.

---

## **3. Go-to-Market & Growth Funnel**

### a) Funnel draft (LinkedIn / Twitter / Reddit)

We have $0 for marketing, so we use the channels where SEO specialists actually spend time and where we can reach them organically: LinkedIn (B2B professionals), Twitter (the SEO community), Reddit (r/SEO, r/BigSEO, professional subreddits).

The goal is **to create attention → interest → a signup / demo** without ad spend.

| Stage | Action / tool | Goal | Reasoning |
| --- | --- | --- | --- |
| **ToFu** (Top-of-Funnel) | Posts with cases: “An AI SEO agent saves 70% of time on routine”, carousels with examples of real-time insights | Attract attention | We show that the product solves real agency pains; the content builds expertise and trust |
| **MoFu** (Middle-of-Funnel) | A free guide / PDF / Notion with mini-cases “before/after using the agent” | Collect leads | We give something valuable in exchange for a contact and move the audience into a “warm lead” |
| **BoFu** (Bottom-of-Funnel) | Personal outreach via LinkedIn DM / Reddit PM / Twitter reply + an invitation to a demo | Get a beta sign-up | Show a ready prototype and collect feedback from real users |

**Result:** content educates → creates interest → moves the person into a personal contact.

---

### b) Growth-hack initiatives for the first 50 beta testers

At the start it matters more to quickly collect early users and get insights than to scale. So we need initiatives that create a sense of exclusivity and pull the audience in organically.

1. **Exclusive access + feature voting**
    - The first users can influence the roadmap: which features to add or change
    - Motivates them to take part and share with colleagues (a “founder/early-adopter” effect).
2. **Gamified sharing**
    - Shared a post about the beta test → bonus functionality (for example, +5 AI reports / month).
    - Works as organic acquisition and social proof.
3. **Beta challenge “30-minute SEO audit”**
    - The user does an SEO audit with the agent in 30 minutes → shares the results → UGC and social proof are created.
    - Motivates testers to use the product actively and create case examples for marketing.

### c) Sales pitch for outreach to an SEO specialist

**Option 1 (LinkedIn DM / email):**

> “Hi! Our AI SEO agent helps agencies automate routine SEO tasks and instantly visualize ROI through clear dashboards. I can show you a 10-minute demo — would you be interested?”

**Option 2 (Twitter / Reddit reply):**

> “Is your SEO team spending 70% of its time on repetitive tasks? Our AI SEO agent automates keyword research, competitor analysis, and content generation, so your team can focus on strategy. Want to see a quick demo?”

---

## 4. Iteration & Metrics

### a) 3 metrics for the first week

1. Active users / sessions
    - How many SEO specialists actually opened the MVP and interacted with the interface (for example, started an analysis or content generation).
2. Completed workflows
    - How many users reached the end of the mini-pipeline: “semantic collection → text generation → viewing the report”.
    - Shows that people are not only testing, they are actually trying the product.
3. Time-to-insight
    - Average time from starting an analysis to getting an actionable insight / report.
    - If it is too long, that is a signal that the UX or the AI pipeline needs to be optimized.

---

### b) Signals that the audience needs the product

- Users come back to the MVP (another 1–2 sessions per person).
- The “activity → demo” funnel converts above 20–30% (for the first beta testers).
- Users share results or ask about functionality, even if it is just screenshots / report examples.
- On custdev calls people say they feel the same pain in real work and want a solution.

---

### c) How we will change the product after the first 5 custdev calls

- We will clarify the key features: what people actually use and what they ignore → we cut the extra.
- We will optimize the UX: if users get lost, we reduce the steps or make the interface simpler.
- We will refine the pain points: for example, if fact-checking or the GSC integration raises questions, we add hints or ready-made settings.
- Prioritize automation vs control: we check where users want more automation and where control stays critical.
