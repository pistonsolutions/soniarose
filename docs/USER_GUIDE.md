# Sonia Rose CRM — User Guide

Welcome to your personal CRM. This guide covers everything you need to manage your contacts, send messages, and automate your real estate business.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Setting Up Telnyx (Text Messaging)](#setting-up-telnyx)
3. [Setting Up Tally (Lead Capture Forms)](#setting-up-tally)
4. [Dashboard Overview](#dashboard)
5. [Managing Contacts](#contacts)
6. [Inbox and Messaging](#inbox)
7. [Automated Workflows](#workflows)
8. [Media Library](#media)
9. [Form Submissions](#forms)
10. [Compliance and Opt-Outs](#compliance)
11. [Settings](#settings)

---

## Getting Started

### Accessing the CRM

1. Open your web browser (Chrome, Safari, or Edge recommended)
2. Go to your CRM URL (provided by your administrator)
3. Sign in with your email address
4. You will be taken to your Dashboard

### Navigation

The left sidebar contains all your main sections:
- **Dashboard** — Overview of your activity
- **Contacts** — Your client database
- **Inbox** — Text message conversations
- **Workflows** — Automated message sequences
- **Media** — Videos and images
- **Forms** — Lead capture form submissions
- **Compliance** — Opt-out tracking
- **Settings** — Account configuration

---

## Setting Up Telnyx (Text Messaging)

Telnyx is the service that powers your text messaging. You need to create an account and connect it to the CRM.

### Step 1: Create a Telnyx Account

1. Go to [telnyx.com/sign-up](https://telnyx.com/sign-up)
2. Enter your email address and create a password
3. Verify your email address by clicking the link Telnyx sends you
4. Complete your business profile information

### Step 2: Add Billing Information

1. Log into [Telnyx Portal](https://portal.telnyx.com/)
2. Go to [Billing > Payment Methods](https://portal.telnyx.com/#/billing/payment-methods)
3. Add a credit card or bank account
4. Add at least $20 to your account balance (this will last a long time)

### Step 3: Get a Phone Number

1. In the Telnyx Portal, go to [Numbers > Search and Buy](https://portal.telnyx.com/#/numbers/buy-numbers)
2. Search for a number in your preferred area code (e.g., 514 for Montreal)
3. Look for numbers with SMS capability (most have it)
4. Click "Buy" on the number you want (approximately $1/month)
5. Wait a few minutes for the number to activate

### Step 4: Create a Messaging Profile

1. Go to [Messaging > Messaging Profiles](https://portal.telnyx.com/#/app/messaging)
2. Click "Add Messaging Profile"
3. Give it a name like "Sonia Rose CRM"
4. Leave other settings as default
5. Click "Save"
6. Note down your Messaging Profile ID — you will need it

### Step 5: Assign Your Number to the Profile

1. Go to [Numbers > My Numbers](https://portal.telnyx.com/#/numbers/my-numbers)
2. Find your new phone number
3. Click on it to open settings
4. Under "Messaging Profile", select the profile you just created
5. Click "Save"

### Step 6: Get Your API Keys

1. Go to [Auth > API Keys](https://portal.telnyx.com/#/app/api-keys)
2. Click "Create API Key"
3. Give it a name like "CRM Production"
4. Copy the API Key — you will only see it once
5. Also note down your Public Key from the same page

### Step 7: Configure Webhooks

1. Go back to [Messaging > Messaging Profiles](https://portal.telnyx.com/#/app/messaging)
2. Click on your profile
3. Scroll to "Inbound Settings"
4. Set Webhook URL to: `https://YOUR-CRM-URL/api/telnyx/webhook` (replace YOUR-CRM-URL with your actual CRM address)
5. Click "Save"

### Step 8: Add Keys to CRM

1. In your CRM, go to Settings
2. Find the Telnyx Configuration section
3. Enter:
   - API Key: The key you copied in Step 6
   - Public Key: From your Telnyx dashboard
   - Phone Number: Your new Telnyx number (format: +15145551234)
4. Click Save

### Cost Estimate

- Phone number: Approximately $1/month
- Outgoing SMS: Approximately $0.01 per message
- Incoming SMS: Approximately $0.007 per message
- A typical month might cost $10-30 depending on volume

---

## Setting Up Tally (Lead Capture Forms)

Tally lets you create forms that automatically add leads to your CRM.

### Step 1: Create a Tally Account

1. Go to [tally.so](https://tally.so)
2. Click "Get started — it's free"
3. Sign up with your email or Google account

### Step 2: Create Your First Form

1. Click "Create form"
2. Choose a template or start from scratch
3. Add your questions:
   - First Name (Short text)
   - Last Name (Short text)
   - Phone Number (Phone)
   - Email (Email)
   - Add any other questions you need
4. Customize the design to match your brand
5. Click "Publish" when ready

### Step 3: Get Your Tally API Key

1. Click your profile icon in the top right
2. Go to Settings > API
3. Click "Generate API Key"
4. Copy the key

### Step 4: Connect to CRM

1. In your CRM, go to Settings
2. Find the Tally Configuration section
3. Paste your Tally API Key
4. Click Save
5. Click "Sync Forms" to automatically configure all your forms

### Step 5: Share Your Forms

1. In Tally, click "Share" on your form
2. Copy the link
3. Share it on your website, social media, or email signatures

When someone fills out your form, they will automatically appear in your CRM as a new contact.

---

## Dashboard

Your dashboard gives you a quick overview of your business:

- **Total Contacts** — How many people are in your database
- **Messages Sent** — How many texts you have sent
- **Active Workflows** — Automated sequences currently running
- **Recent Activity** — Latest actions in your CRM

---

## Managing Contacts

### Viewing Contacts

1. Click Contacts in the sidebar
2. You will see a list of all your contacts
3. Use the search bar to find specific people

### Adding a New Contact

1. Click the "Add Contact" button
2. Fill in the details:
   - First Name (required)
   - Last Name
   - Phone Number (required, format: +15145551234)
   - Email
   - Birthday — The CRM will send automatic greetings
   - Lead Source — Where did they come from?
   - Pipeline Stage — Where are they in your sales process?
   - Tags — Add labels like "Buyer", "Seller", "Hot Lead"
3. Click Save

### Contact Details

Click on any contact to see:
- Profile Information — Edit their details
- Message History — All your text conversations
- Timeline — Activity history
- Workflow Runs — Automated sequences they are enrolled in
- Compliance Events — Opt-in/opt-out history

### Editing a Contact

1. Click on the contact
2. Click Edit
3. Make your changes
4. Click Save

### Deleting a Contact

1. Click on the contact
2. Click Delete
3. Confirm the deletion

**Warning:** Deleting a contact removes all their message history.

---

## Inbox and Messaging

The Inbox is where you manage all your text message conversations.

### Viewing Conversations

1. Click Inbox in the sidebar
2. On the left, you will see all your conversations sorted by most recent
3. Click on a conversation to view it

### Sending a Message

1. Select a conversation
2. Type your message in the text box at the bottom
3. Click Send or press Enter

### Starting a New Conversation

1. Go to Contacts
2. Click on the contact you want to message
3. Click Send Message
4. Type and send your message

### Message Status Indicators

- **Queued** — Message is waiting to be sent
- **Sent** — Message was sent successfully
- **Delivered** — Message reached their phone
- **Failed** — Message could not be sent (check the number)

---

## Automated Workflows

Workflows automatically send messages to your contacts on a schedule. Each workflow is designed for a specific purpose and follows a defined sequence.

### Available Workflows

#### Seller Lead Start
**Purpose:** Nurture potential sellers who have shown interest.
**Sequence:** 5 messages over 5 days (1 message per day)
- Day 1: Welcome message with downloadable guide ("7 Signs You're Ready to Sell")
- Day 2: Information about home value estimates and offer for custom report
- Day 3: Staging tip about lighting and flow
- Day 4: Timeline inquiry about moving plans
- Day 5: Follow-up on guide and offer to answer questions

#### Buyer Lead Start
**Purpose:** Nurture potential buyers and qualify their needs.
**Sequence:** 5 steps over 5 days
- Step 1: Create a task to validate buyer with UBEE (pre-approval check)
- Day 1: Ask about their non-negotiable home feature
- Day 2: Inquiry about mortgage pre-approval status
- Day 3: Offer to send matching property listings
- Day 4: Check-in on search status

#### Five Days of Joy (10 Days of Joy)
**Purpose:** Welcome sequence for new contacts with uplifting content.
**Sequence:** 5 messages over 10 days
- Day 0: Welcome with "Joy of Living" guide
- Day 2: Inspirational quote and reflection prompt
- Day 4: Home tip (scent and mood)
- Day 7: Encouragement and self-care reminder
- Day 10: Thank you and closing message

#### Post-Transaction Sequence
**Purpose:** Maintain relationship with clients after closing.
**Sequence:** 4 messages over 12 months
- Month 1: Check-in on settling in, offer tradesperson recommendations
- Month 3: 3-month anniversary greeting
- Month 6: 6-month check-in
- Month 12: 1-year "house-versary" celebration

#### Birthday Greeting
**Purpose:** Send automatic birthday wishes.
**Sequence:** Single message on birthday, reschedules for next year
- Personalized birthday message with well-wishes

#### Holiday Greeting
**Purpose:** Send seasonal holiday messages.
**Sequence:** Single message, reschedules for next year
- Christmas and holiday greeting with warm wishes

#### Expired Listing Sequence
**Purpose:** Re-engage homeowners whose listing has expired.
**Sequence:** 3 messages over 9 days (every 3 days)
- Message 1: Acknowledge expiration, ask if still planning to sell
- Message 2: Offer re-listing strategy
- Message 3: Soft follow-up with offer for second opinion

#### FSBO Sequence (For Sale By Owner)
**Purpose:** Offer assistance to homeowners selling independently.
**Sequence:** 3 messages over 12 days (every 4 days)
- Message 1: Offer contract review and friendly advice
- Message 2: Tip about professional photography
- Message 3: Check on sale progress, offer backup plan

#### Call Pipeline
**Purpose:** Create a task for agent to call a lead.
**Sequence:** Single step
- Creates a high-priority task to call the lead

#### Signs of Life
**Purpose:** Re-engage inactive contacts.
**Sequence:** Single message
- Friendly check-in message to see how they are doing

#### Monthly Newsletter
**Purpose:** Send monthly market updates.
**Sequence:** Recurring monthly
- Link to monthly market update, reschedules for 30 days

#### Long-Term Nurture
**Purpose:** Keep in touch with contacts over extended periods.
**Sequence:** Recurring quarterly (every 90 days)
- Rotating messages: general check-in, article share, seasonal greeting, hello

#### Social Lead Import
**Purpose:** Welcome leads from social media connections.
**Sequence:** Single message
- Thank you for connecting, inquiry about real estate goals

### Viewing Workflow Activity

1. Click Workflows in the sidebar
2. See the status of all running workflows:
   - Pending — Waiting to start
   - Running — Currently active
   - Completed — Finished successfully
   - Failed — Had an error

### Stopping a Workflow

If you need to stop a workflow:
1. Find the workflow run in the list
2. Click Cancel

---

## Media Library

Store and manage your videos and images.

### Uploading Media

1. Click Media in the sidebar
2. Click Upload
3. Select your file (MP4, JPG, PNG)
4. Wait for the upload to complete

### Using Media in Messages

1. When composing a message, click the attachment icon
2. Select media from your library
3. Send

---

## Form Submissions

View all leads that came through your Tally forms.

### Viewing Submissions

1. Click Forms in the sidebar
2. See all form submissions with:
   - Form name
   - Contact created
   - Submission date
   - All form data

### What Happens When Someone Submits

1. A new contact is created (or existing one is updated)
2. They are automatically enrolled in the appropriate workflow
3. You get a notification (if enabled)

---

## Compliance and Opt-Outs

Stay compliant with messaging laws by tracking opt-ins and opt-outs.

### Understanding Opt-In Status

- **Opted In** — They have agreed to receive messages
- **Opted Out** — They have asked to stop receiving messages
- **Unknown** — Status not yet determined

### Automatic Opt-Out Handling

If someone texts STOP, UNSUBSCRIBE, or similar:
1. They are automatically marked as opted out
2. They receive a confirmation message
3. All workflows are stopped
4. No more messages will be sent to them

### Viewing Compliance Events

1. Click Compliance in the sidebar
2. See all opt-in/opt-out events
3. Filter by date or type

---

## Settings

Configure your CRM settings.

### Telnyx Settings

- **API Key** — Your Telnyx API key for sending messages
- **Public Key** — Your Telnyx public key for webhooks
- **Phone Number** — Your Telnyx phone number

### Tally Settings

- **API Key** — Your Tally API key for form integration
- **Sync Forms** — Automatically configure webhooks for all forms

---

## Getting Help

If you encounter any issues:

1. **Message not sending?**
   - Check the contact's phone number format (+1XXXXXXXXXX)
   - Make sure they have not opted out
   - Verify your Telnyx account has balance

2. **Form submissions not appearing?**
   - Verify your Tally API key is correct
   - Click "Sync Forms" in settings
   - Check the form has a phone number field

3. **Workflow not running?**
   - Check the contact's opt-in status
   - Verify the workflow is not cancelled
   - Look for error messages in the workflow details

For additional support, contact your administrator.

---

## Quick Tips

1. Always include country code in phone numbers: +1 for US/Canada
2. Personalize your messages — The CRM can insert first names automatically
3. Monitor your opt-outs — High opt-out rates might mean adjusting your messaging
4. Check your Telnyx balance monthly to avoid service interruption
5. Use tags to organize contacts (Buyer, Seller, Hot Lead, Past Client)
