### 1. Front matter

- Automation of Music Usage Tracking for TikTok Videos
- Leonid Mikhalev
- Product Development Team
- Reviewer(s): Leonid Mikhalev
- Created on 2025-06-30
- Last updated 2025-06-30

### 2. Introduction

a. Overview, Problem Description, Summary, or Abstract

- The problem is to create a system that automates the tracking of music usage in TikTok videos created by partnered creators, and calculates payouts based on the number of views these videos generate. The solution will involve collecting data on video views, matching it with distributor revenue report, and calculating creator payouts for the month. Currently the process is manual, which isn’t efficient and could lead to errors and delay. The goal is to automate the entire process for increased accuracy and speed.

b. Glossary or Terminology

- Music Usage: When TikTok creator selects a track for their video.
- TikTok API: API that provides access to TikTok”s video data.
- Automation: The process of tracking and processing video and music usage w/o human intervention.
- Distributor Report: Monthly report from the distributor detailing earning from each track used in TikTok videos.
- Creator Payout: The amount of money a TikTok creator receives based on the views their video generates with licensed music.
- Revenue share: The portion of the revenue generated from video views that is shared with creators.

c. Context or Background

- **Reasons why the problem is worth solving:** Managing music usage tracking and payout calculations manually is time-consuming, and inefficient. Automating this process will save time, reduce errors, and provide timely payouts for creators.
- **Origin of the problem: The need to streamline and automate the tracking of TikTok video views and the associated payouts has emerged due to the manual nature of current workflows.**
- **How the problem affects users and company goals:** Automating this process will improve operational efficiency, increase the speed of payouts to creators, and provide accurate and transparent data, which will foster better relationships with creators and the distributor.

d. Goals or Product and Technical Requirements

Product requirements:

1) Automatically track how many TikTok videos used tracks from our music library.

2) Calculate the views for these videos based on TikTok’s data.

3) Match this data with the monthly distributor revenue report to determine the earnings for each creator

4) Generate accurate payouts for creators.

Technical requirements

1) Integration with TikTok’s API for video and view data.

2) Data storage to track video uses and calculate payouts

3) Algorithm to process views data and match with distributor earnings.

e. Non-Goals or Out of Scope

- Designing payout solution itself
- Expansion to other platforms beyond TikTok

f. Future Goals

- Extend the solution to include additional data points like geographic data, video engagement metrics, etc.

g. Assumptions

- TikTok’s API will provide reliable data regarding video views and usage.
- The distributor will continue to provide accurate monthly revenue reports.
- The distributor will be able to provide information on the music in the form of music_id according to TikTok’s API.

### **a. Current or Existing Solution / Design**

- **Current solution description**: Currently, tracking music usage and calculating payouts is done manually, requiring cross-referencing of TikTok video data with distributor reports.
- **Pros and cons**:
    - Pros: Easy to manage on a small scale.
    - Cons: Inefficient, prone to human error, difficult to scale.

### **b. Suggested or Proposed Solution / Design**

- **External components**: TikTok API (for video data and views), Distributor’s revenue report.
- **Dependencies**:
    - Access to TikTok’s API for video data.
    - Distributor’s timely monthly report with accurate earnings per track.
- **Data Models/Schema Changes**:
    - A new table in the database to store video usage data, including creator ID, video ID, track ID, view count, and payout amount.
    - Integration of this new data with the distributor’s revenue report.
- **Business Logic**:
    - Pull video data (track used, views) from TikTok API.
    - Match the data with distributor revenue report.
    - Calculate the creator’s payout based on the view count and the distributor’s revenue share.
- **API Changes**: New endpoints for fetching video and view data, as well as the payout calculation logic.
- **UI/UX**: A dashboard for creators to view their video usage and payout details.
    - Wireframes: Dashboard view showing video usage statistics, total views, and payout details for the month.

### **c. Test Plan**

- **Unit tests**: Verify the accuracy of data retrieved from TikTok’s API and the correctness of payout calculations.
- **Integration tests**: Test the integration of TikTok API data with distributor reports and the payout system.
- **QA**: Perform manual testing to ensure the accuracy of payouts and proper data flow.

### **d. Monitoring and Alerting Plan**

- **Logging**: Log every instance of music usage and payout calculation for auditing.
- **Monitoring**: Use monitoring tools to ensure the system is processing data correctly and that API calls are successful.
- **Metrics**: Track the number of videos processed, views calculated, and payouts made.
- **Alerting**: Set alerts for failed API calls or discrepancies in payout calculations.

### **e. Release / Roll-out and Deployment Plan**

- **Deployment environments**: Development for testing, staging for UAT, production for live deployment.
- **Phased roll-out**: Gradual roll-out using feature flags to ensure smooth integration.
- **Communication**: Inform creators of the automated payout system and how to track their earnings through the dashboard.

### **f. Rollback Plan**

- **Liabilities**: Inaccurate payouts in case of data mismatch or API failure.
- **Mitigation**: Have manual fallback procedures to verify and correct any discrepancies in payouts.
- **Prevent other components from being affected**: Use isolated testing environments for deployment.

### **g. Alternate Solutions / Designs**

- **Manual tracking system**: Continue with the current manual tracking (not scalable and prone to error).
- **Third-party tracking services**: Use external services to track video usage and calculate payouts (additional cost and complexity).

---

### **4. Further Considerations**

### **a. Impact on other teams**

- **Finance Team**: The new system will reduce manual efforts in calculating payouts and tracking usage.
- **Support Team**: May require additional training to handle creator queries about the new system.

### **b. Third-party services and platforms considerations**

- **TikTok API**: Ensure API stability and reliability for data collection.
- **Distributor reports**: Ensure the distributor’s monthly report is accurate and timely.

### **c. Cost analysis**

- **Cost per day**: Minimal daily cost for API calls and database storage.
- **Rollout cost**: Development, testing, and deployment resources.

### **d. Security considerations**

- Ensure that all API calls are secure and that data is handled according to privacy regulations (GDPR, etc.).
- Ensure that payout information is encrypted and securely stored.

### **e. Privacy considerations**

- Personal data from creators will not be stored unless necessary for payout calculations. Ensure compliance with data privacy laws.

### **f. Regional considerations**

- The system should account for international creators and handle any regional restrictions from TikTok or the distributor.

### **g. Accessibility considerations**

- The dashboard should be accessible for creators with disabilities, following accessibility best practices.

### **h. Operational considerations**

- Ensure that the system is resilient to API downtimes and can recover from failures gracefully.

### **i. Risks**

- Potential changes in TikTok’s API could impact data retrieval.
- Errors in the distributor’s monthly reports could affect payout accuracy.

### **j. Support considerations**

- Create documentation for creators to understand how to track their payouts.
- Set up a support system to handle payout-related queries.

---

### **5. Success Evaluation**

### **a. Impact**

- **Security impact**: Low, as the solution focuses on tracking and payout calculations.
- **Performance impact**: Should improve operational efficiency.
- **Cost impact**: Minimal ongoing costs after implementation.

### **b. Metrics**

- Accuracy of payout calculations.
- Number of successful API calls and data retrievals.
- User satisfaction from creators regarding payouts.

---

### **6. Work**

### **a. Work estimates and timelines**

- **Development**: 4 weeks for API integration, payout calculation logic, and database setup.
- **Testing**: 2 weeks for unit and integration testing.
- **Deployment**: 1 week for staging and full deployment.

### **b. Prioritization**

- TikTok API integration and payout calculation logic are top priorities.
- Dashboard design and integration come next.

### **c. Milestones**

- **Week 1**: API integration complete.
- **Week 2**: Payout calculation logic implemented.
- **Week 3**: Testing and adjustments.
- **Week 4**: Full deployment.

### **d. Future work**

- Extend system to other platforms (Instagram, YouTube).
- Introduce advanced analytics for optimizing creator payouts.

---

### **7. Deliberation**

### **a. Discussion**

- Should we extend the system to include other video platforms right away or focus solely on TikTok for now?

### **b. Open Questions**

- Will the TikTok API provide all necessary data for accurate view tracking?
- What should be the handling procedure for discrepancies in distributor reports?

---

### **8. End Matter**

### **a. Related Work**

- Other automated payout systems used by platforms like YouTube and Instagram.

### **b. References**

- TikTok API documentation — https://developers.tiktok.com/doc/research-api-specs-query-videos
- Music distributor’s revenue reporting guidelines — https://bulkoid.com/blog/tiktok-monetization-how-much-does-tiktok-pay

## Out of scope but interesting

I played around vibecoding tools and created prototype (MVP) of upcoming solution —https://incomparable-quokka-098cc8.netlify.app/creators
