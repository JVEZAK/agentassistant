// Agent Assistant site data — v1.1 · Oct 15, 2026
// Plain-English AI agents for small businesses. Time-saved figures are clearly labeled estimates.
const VERSION = "v1.1";
const DATA_DATE = "Oct 15, 2026";

// Agents we set up. hours = estimated hours saved per week for a typical small business (shown as an estimate).
const AGENTS = [
  { id: "missed-call", noun: "missed-call text-back", name: "Missed-call text-back", short: "Never lose a job to a missed call",
    pains: ["calls"], hours: [3, 6],
    what: "When you can't pick up, it texts the caller back within seconds, answers common questions, and books the job or a callback on your calendar.",
    steps: ["A customer calls while you're on a job or after hours.", "Within seconds they get a friendly text from your business number.", "The assistant answers simple questions (hours, service area, rough prices) and offers times from your calendar.", "You get a summary text: who called, what they need, and when they're booked."],
    needs: ["Your business phone number (or a new text-enabled number)", "Your calendar or booking link", "A short list of your services, hours and service area"] },
  { id: "website-chat", noun: "a website chat assistant", name: "Website chat assistant", short: "Answers questions and captures leads 24/7",
    pains: ["questions", "leads"], hours: [2, 5],
    what: "A chat box on your website that answers customer questions in your words, day or night, and collects name, phone and job details for you.",
    steps: ["A visitor asks a question on your website at 10 pm.", "The assistant answers from your own FAQ, prices and policies.", "If they're interested, it collects their contact details and what they need.", "The lead lands in your inbox or phone, ready for you to call back."],
    needs: ["Access to add a small code snippet to your website", "Your FAQs, services and policies", "Where you want leads sent (email or text)"] },
  { id: "reviews", noun: "automatic review requests", name: "Review request assistant", short: "More 5-star Google reviews on autopilot",
    pains: ["reviews"], hours: [1, 3],
    what: "After each finished job or visit, it sends a polite, well-timed text asking happy customers for a Google review, and flags unhappy ones to you privately first.",
    steps: ["You mark a job done (or it's logged in your booking or invoicing tool).", "The customer gets a short thank-you text with a one-tap review link.", "If they reply with a problem, you're alerted so you can fix it before they post.", "A gentle reminder goes out once if they don't respond."],
    needs: ["Your Google Business Profile review link", "A way to know when a job is done (booking tool, invoice tool, or a quick text from you)"] },
  { id: "quotes", noun: "quote drafting", name: "Quote and estimate drafter", short: "Turn job notes into a quote in minutes",
    pains: ["quotes", "paperwork"], hours: [2, 6],
    what: "Send it a few notes or photos from a site visit and it drafts a clean, itemized quote in your format and prices, ready for you to check and send.",
    steps: ["After a visit, text or email your notes, measurements or photos.", "It drafts an itemized quote using your price list and wording.", "You review, tweak if needed, and approve.", "It sends the quote and follows up if the customer hasn't replied."],
    needs: ["Your price list or a few past quotes", "Your quote template or logo", "Your email or invoicing tool"] },
  { id: "follow-up", noun: "follow-up and payment reminders", name: "Follow-up and payment reminders", short: "Chase old leads and unpaid invoices for you",
    pains: ["followup", "payments"], hours: [2, 4],
    what: "It politely follows up on quotes that went quiet and invoices that are overdue, on a schedule you choose, so money and jobs don't slip through the cracks.",
    steps: ["A quote goes unanswered or an invoice passes its due date.", "It sends a friendly reminder by text or email in your voice.", "Replies come straight to you; paid invoices stop the reminders automatically.", "You get a weekly list of what's still open."],
    needs: ["Your invoicing or quoting tool (or a simple list)", "How firm you want reminders to be"] }
];

// Pain points shown in the finder.
const PAINS = [
  ["calls", "I miss calls while I'm working or after hours"],
  ["questions", "I answer the same customer questions over and over"],
  ["leads", "Website visitors leave without contacting me"],
  ["reviews", "I don't get enough online reviews"],
  ["quotes", "Writing quotes and estimates takes too long"],
  ["followup", "I forget to follow up on quotes and leads"],
  ["payments", "Customers pay late and I hate chasing them"],
  ["paperwork", "Paperwork eats my evenings"]
];

// Industries. top = agent ids in order of usefulness for this industry; pains = typical problems in their words.
const INDUSTRIES = [
  { id: "plumbers", name: "Plumbers", one: "plumbing business", top: ["missed-call", "quotes", "reviews"],
    pains: ["Calls come in while you're under a sink", "Emergency calls after hours go to voicemail", "Quotes get written late at night"] },
  { id: "hvac", name: "HVAC companies", one: "HVAC company", top: ["missed-call", "follow-up", "reviews"],
    pains: ["Call volume spikes on the hottest and coldest days", "Maintenance plan renewals get forgotten", "Techs are on jobs, not by the phone"] },
  { id: "electricians", name: "Electricians", one: "electrical contracting business", top: ["missed-call", "quotes", "follow-up"],
    pains: ["Missed calls while on a job site", "Estimates pile up", "Quotes go quiet with no follow-up"] },
  { id: "landscapers", name: "Landscapers and lawn care", one: "landscaping or lawn care business", top: ["quotes", "follow-up", "missed-call"],
    pains: ["Lots of small quotes to write in spring", "Customers forget to pay recurring invoices", "Calls come in while the mower is running"] },
  { id: "roofers", name: "Roofers", one: "roofing company", top: ["missed-call", "quotes", "reviews"],
    pains: ["Storm season floods the phone", "Big quotes take hours to prepare", "Reviews matter a lot for trust"] },
  { id: "cleaning", name: "Cleaning services", one: "cleaning business", top: ["website-chat", "reviews", "follow-up"],
    pains: ["Endless pricing questions", "Recurring clients need reminders", "Reviews drive new bookings"] },
  { id: "dental", name: "Dental offices", one: "dental office", top: ["missed-call", "website-chat", "reviews"],
    pains: ["Front desk can't answer every call", "Patients ask the same insurance questions", "Reviews decide which office new patients pick"] },
  { id: "auto-repair", name: "Auto repair shops", one: "auto repair shop", top: ["missed-call", "website-chat", "reviews"],
    pains: ["Phone rings while you're under a car", "Customers call for status updates", "Trust and reviews win new customers"] },
  { id: "salons", name: "Hair salons and barbers", one: "salon or barbershop", top: ["missed-call", "website-chat", "reviews"],
    pains: ["Can't answer the phone mid-cut", "Booking questions all day", "No-shows and last-minute gaps"] },
  { id: "restaurants", name: "Restaurants", one: "restaurant", top: ["website-chat", "missed-call", "reviews"],
    pains: ["Calls about hours, menu and reservations during rush", "Catering and large-party inquiries get lost", "Reviews shape where people eat"] },
  { id: "pest-control", name: "Pest control companies", one: "pest control business", top: ["missed-call", "follow-up", "reviews"],
    pains: ["Urgent calls about wasps, mice or bed bugs come in while techs are treating a home", "Quarterly service renewals and unpaid invoices slip through the cracks", "Homeowners pick the company with the most recent good reviews"] }
];

const D = { VERSION, DATA_DATE, AGENTS, PAINS, INDUSTRIES };
if (typeof module !== "undefined") module.exports = D;
if (typeof window !== "undefined") window.AA = D;
