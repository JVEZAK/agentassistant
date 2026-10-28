// Agent Assistant site data — v1.4 · Oct 18, 2026
// Plain-English AI agents for small businesses. Time-saved figures are clearly labeled estimates.
const VERSION = "v1.14";
const DATA_DATE = "Oct 28, 2026";

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
    pains: ["Urgent calls about wasps, mice or bed bugs come in while techs are treating a home", "Quarterly service renewals and unpaid invoices slip through the cracks", "Homeowners pick the company with the most recent good reviews"] },
  { id: "chiropractors", name: "Chiropractors", one: "chiropractic office", top: ["missed-call", "website-chat", "reviews"],
    pains: ["Calls go unanswered while you're adjusting a patient", "New patients ask the same questions about insurance, first visits and pricing", "People in pain book with whichever office replies first"] },
  { id: "movers", name: "Moving companies", one: "moving company", top: ["missed-call", "quotes", "follow-up"],
    pains: ["Customers call several movers and book whoever answers first, while your crew is mid-move", "Every estimate needs room counts, stairs and distance written up", "Estimates go quiet and deposits or final payments get chased by hand"] },
  { id: "painters", name: "Painting contractors", one: "painting business", top: ["quotes", "follow-up", "missed-call"],
    pains: ["Every estimate means measuring rooms, counting coats and writing it up at night", "Homeowners collect several bids and quotes go quiet without a follow-up", "Calls come in while you're on a ladder with a brush in hand"] },
  { id: "pet-groomers", name: "Pet groomers", one: "pet grooming business", top: ["missed-call", "website-chat", "reviews"],
    pains: ["The phone rings while you're mid-groom with a wet dog on the table", "Owners ask the same questions about prices, breeds, vaccines and drop-off times", "Pet owners trust the groomer with the most recent good reviews"] },
  { id: "pool-services", name: "Pool service companies", one: "pool service business", top: ["missed-call", "follow-up", "reviews"],
    pains: ["Calls about green pools and broken pumps come in while you're on a route, hands wet", "Monthly service invoices go unpaid and chasing them eats your evenings", "Homeowners choose the pool company with the most recent good reviews"] },
  { id: "photographers", name: "Photographers", one: "photography business", top: ["website-chat", "quotes", "follow-up"],
    pains: ["Couples and families send the same questions about packages, availability and turnaround", "Custom package quotes take an evening to write and inquiries go cold while you shoot", "Deposits and final balances need chasing before and after every session"] },
  { id: "law-firms", name: "Law firms", one: "small law firm", top: ["missed-call", "website-chat", "follow-up"],
    pains: ["Potential clients call while you're in court or with another client, then call the next firm", "Intake questions about practice areas, consultations and fees take up staff time every day", "Retainer balances and unpaid invoices need chasing between client matters"] },
  { id: "gyms", name: "Gyms and fitness studios", one: "gym or fitness studio", top: ["website-chat", "missed-call", "follow-up"],
    pains: ["Prospects ask the same questions about memberships, class times and free trials", "Calls go unanswered while you're coaching a class or on the floor", "Failed membership payments and trial sign-ups that never convert need follow-up by hand"] },
  { id: "real-estate", name: "Real estate offices", one: "real estate office", top: ["missed-call", "website-chat", "follow-up"],
    pains: ["Buyer and seller calls come in during showings and closings, and the caller tries the next agent", "Website visitors ask the same questions about listings, showings and the buying process at all hours", "Past clients and cold leads go months without a follow-up while you work active deals"] },
  { id: "accountants", name: "Accountants and bookkeepers", one: "accounting or bookkeeping practice", top: ["website-chat", "follow-up", "missed-call"],
    pains: ["Tax season brings the same questions about deadlines, documents and fees, over and over", "Clients need reminders to send receipts and paperwork, and invoices for finished work go unpaid", "Calls from prospective clients go unanswered while you're deep in a return"] },
  { id: "locksmiths", name: "Locksmiths", one: "locksmith business", top: ["missed-call", "reviews", "quotes"],
    pains: ["Locked-out callers need help now, and if you're on another job they call the next locksmith", "Customers ask for a price before you can arrive, and writing up rekey or lock-change estimates takes time", "Happy customers rarely leave a review unless someone asks them right after the job"] },
  { id: "garage-doors", name: "Garage door companies", one: "garage door repair and installation company", top: ["missed-call", "quotes", "reviews"],
    pains: ["A stuck or broken garage door is urgent, and callers who reach voicemail usually try the next company", "Homeowners want a ballpark for springs, openers or a new door before booking, and writing estimates eats evenings", "Customers are happy when the door works again but rarely leave a review unless asked right away"] },
  { id: "veterinarians", name: "Veterinary clinics", one: "veterinary clinic", top: ["missed-call", "website-chat", "follow-up"],
    pains: ["Front-desk phones ring nonstop, and pet owners who can't get through often book with another clinic", "Owners ask the same questions about hours, vaccines, pricing and what to bring before a visit", "Vaccine and checkup reminders, and balances after visits, need chasing by hand"] },
];

const D = { VERSION, DATA_DATE, AGENTS, PAINS, INDUSTRIES };
if (typeof module !== "undefined") module.exports = D;
if (typeof window !== "undefined") window.AA = D;
