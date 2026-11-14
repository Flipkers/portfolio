### Disclaimer

This is all simulation, to show my thinking process. Most things are assumptions, aren’t real, just for demonstration.

### Product Definition

We’re building a **mobile-first crypto wallet** designed for emerging markets. It enables users to:

- Onboard easily using email (no seed phrase at signup)
- Store and swap major tokens (ETH, BTC, USDT)
- Withdraw crypto to fiat (local bank or card) with minimal friction
- Earn through staking and rewards — once trust is built

The product targets **crypto-curious and light users** in regions like LATAM, India, and Southeast Asia — people who want practical financial tools, not DeFi complexity.

### Before Roadmap

Roadmap starts not from features, but from company’s goals. So our first step is to understand our current OKRs. These assumptions, pretend they’re real.

### Objective 1: Launch compliant fiat off-ramp

- 1000+ users complete KYC
- $100k+ in fiat withdrawal volume
- 95% regulatory compliance (no violations)

**Objective 2: Deliver core wallet experience**

- 80% onboarding completion (without seed phrase friction)
- 30% of users complete at least one swap
- <5% support tickets on basic wallet operations

**Objective 3: Early growth signals**

- 200+ successful referrals
- 15% week-over-week user growth
- 20% MAU engage with educational content

Our OKR is answer to “WHAT” question. After knowing “WHAT” we need to understand “HOW”. Our “HOW” is what we’re going to build to accomplish these goals. Before our feature planning, we need to build a context, in which product gonna exist.

It means understand the needs of the market, its users, and stakeholders.

---

### Product Discovery

To understand the market, we need to conduct competitive intelligence among competitors and screen them by specific criteria. Competitive intelligence itself isnt’ a goal. The point is to formate hypotheses for the product: feature map, differentiation, behavioral patterns, what not to build.

Let’s start from brief competitive analysis (demonstration also)

### Competitive analysis

I compared the most popular crypto wallets among each other. Here is the result: 

| Wallet | Swap | Staking | Crypto to Fiat | No seed first | Educational UX | Friendly UI |
| --- | --- | --- | --- | --- | --- | --- |
| MetaMask | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Trust Wallet | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Zerion | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| Exodus | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ |

**Competitive analysis shows us several things:**

- All wallets provide swaps → it’s table stakes
- Staking is common, but **not universal** → opportunity for retention
- **Crypto-to-fiat is completely missing** → massive gap we can address
- Only a couple of wallets avoid immediate seed setup → onboarding is a major barrier
- Educational UX is rare, despite complexity of crypto
- UI is usually designed for pros, not beginners

### Stakeholder input

Since this is a demonstration, I asume the input from crypto stakeholders based on my previous experience.

| Stakeholder | Simulated Insight | Impact on Roadmap |
| --- | --- | --- |
| Founder | “Our priority is fast user growth and visible traction. Revenue can wait.” | Push referral system and user acquisition tools to Q3–Q4 |
| Legal | “KYC is mandatory only before fiat withdrawal. Let users explore before that.” | KYC is triggered, not required at signup |
| CTO | “We have limited backend team, staking infra not ready until Q4.” | Delay staking features to Q4, avoid complex infra early |
| Growth | “Our users share mostly via Telegram and WhatsApp, not email.” | Build mobile-optimized referral UX |
| Finance | “Eventually we need staking and swap fee revenue, but don’t block MVP on that.” | Monetization starts in Q4, not MVP |

### Users

We also talked to the users, and created 2 personas as a result.

| **Persona** | **Maria (27, Argentina)** | **Ravi (33, India)** |
| --- | --- | --- |
| **Background** | Freelance designer, receives USDT | Tech support worker, crypto-curious |
| **Motivations** | Protect savings from inflation, convert to fiat | Explore staking, try token swapping |
| **Pains** | Afraid of seed phrase loss, confused by technical UX | Doesn’t understand staking/gas, dislikes upfront KYC |
| **Behaviors** | Mobile-first, uses WhatsApp/Telegram, tried Binance | Has Trust Wallet, doesn’t use it, prefers messenger-based sharing |

---

### Product Hypotheses

Our product hypotheses based on what users said, stakeholder requirements, and market analysis.

| # | Hypothesis | Backed by | What we'll build to test it | Metric |
| --- | --- | --- | --- | --- |
| 1 | Users will complete onboarding more often if seed phrase is optional at first login | Market (Zerion), Users (seed fear) | Email + magic link onboarding, seed backup later | Onboarding completion rate |
| 2 | Crypto-to-fiat withdrawal will attract users who treat crypto as cash | Market (gap), Users (Maria), Stakeholders (Legal) | Fiat withdrawal flow gated behind KYC | # of KYC completions / withdrawals |
| 3 | Educational onboarding will reduce early churn and increase trust | Market (Zerion), Users (confusion), Stakeholders (Growth) | Multi-step onboarding with tooltips and visuals | Day 1 retention |
| 4 | Telegram-based referrals will outperform email invites | Stakeholders (Growth), Users (messenger use) | Messenger-first referral UX | # of successful referrals |
| 5 | Delaying staking until Q4 will help focus on core infra | Stakeholders (CTO, Finance) | Q4 staking epic, after MVP | Feature shipped + usage |
| 6 | Users want to earn, but only if it’s explained simply | Users (Ravi), Market (Exodus) | Staking UI with APY explainer | Stake rate vs active wallets |

Now we going to convert our hypotheses into real Product Roadmap. As previously we started we’re going top-bottom approach, from themes, to epics and features.

---

### Product Themes

I derived the following five themes from earlier hypotheses, user needs, and business OKRs:

| Theme | Description | Why it matters |
| --- | --- | --- |
| **Onboarding & Simplicity** | Make it easy for new users to create and access their wallet | Most users fear seed phrases and complexity |
| **Core Wallet Experience** | Enable users to store, swap, and withdraw assets | Functional foundation of any wallet |
| **Compliance & Risk Management** | Implement KYC and safeguards for regulated actions | Required for fiat, improves trust |
| **Value & Retention** | Help users earn from their assets via staking/rewards | Needed to improve engagement and 7-day retention |
| **Growth & Virality** | Allow users to invite others and expand organically | Aligns with business priority of fast user growth |

---

## Roadmap Planning

I prioritised epics and scheduled them across Q3 and Q4 based on four inputs:

1. **User Value**

- What solves the most urgent user problems?

- What reduces friction and builds trust?

2. **Strategic Leverage** (alignment with OKRs)

- Q3 focuses on activation and usability (wallet, swap, onboarding)

- Q4 focuses on growth and monetization (staking, referral, fiat)

3. **Stakeholder Constraints**

- Backend team is limited in Q3 → no staking infrastructure until Q4

- Legal requires KYC only before fiat → onboarding stays frictionless early on

4. **Technical & Delivery Risk**

- We ship what’s feasible quickly: email auth, balance viewer, swap (via 1inch)

- We delay infra-heavy and risky items (fiat payouts, staking) to Q4

---

### Epics & Features

Once product hypotheses were defined, I grouped them into **Epics** — high-level initiatives that deliver value aligned with user needs, stakeholder input, and technical feasibility.

| Theme | Epic Name | Quarter | Description |
| --- | --- | --- | --- |
| Onboarding & Simplicity | Seedless Wallet Creation | Q3 | Email signup, magic link, optional seed backup |
| Onboarding & Simplicity | First-Time Education | Q3 | Onboarding tooltips, security explainers |
| Core Wallet Operations | Multichain Support | Q3 | ETH, BTC, USDT balances and token viewer |
| Core Wallet Operations | Token Swap | Q3 | Integration with 1inch or 0x |
| Compliance & Fiat Access | Conditional KYC Flow | Q3 | Triggered KYC on withdrawal only |
| Compliance & Fiat Access | Fiat Withdrawal | Q4 | Withdrawal flow to fiat (bank/card) |
| Compliance & Fiat Access | Sanctions & Risk Check | Q4 | OFAC / TRM blacklist integration |
| Value & Retention | Staking | Q4 | ETH / SOL staking UI and APY display |
| Value & Retention | Reward Layer | Q4 | Cashback, loyalty system |
| Growth & Virality | Referral System (part 1) | Q3 | Basic referral link generation |
| Growth & Virality | Referral Expansion | Q4 | Full flow: tracking, bonuses, messenger UX |

---

### How I Approached This Roadmap

This roadmap is not just a timeline of features — it's a layered response to market gaps, stakeholder constraints, and user needs. My goal was not to blindly build features, but to show how product thinking drives **"what"**, **"when"**, and **"why"**.

I started by simulating business OKRs — to understand what success looks like.

Then I collected market analysis and stakeholder input, and created user personas — to see **what actually matters** to users and the team.

Each hypothesis was derived from that input, and then translated into product themes and features.

I explicitly chose to:

- Delay infrastructure-heavy work (staking) in favor of a focused Q3 MVP
- Prioritize user trust and simplicity (seedless onboarding, KYC only when needed)
- Avoid building features for power users — and instead aim at first-time wallet users
- Frame everything around business value, not just functionality

---
