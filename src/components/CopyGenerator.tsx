import React, { useState, useCallback, useEffect } from 'react';
import { Copy, RefreshCw, Shuffle, Eye, Code, Mail, MessageSquare, Zap, Calendar } from 'lucide-react';

interface CopyTemplate {
  subject: string;
  opening: string;
  body: string;
  cta: string;
}

interface FormData {
  candidateName: string;
  companyName: string;
  roleTitle: string;
  skillTechnology: string;
  industry: string;
  tone: string;
  experienceLevel: string;
  currentCompany: string;
  sequenceType: string;
}

const industries = [
  'Tech', 'Finance', 'Healthcare', 'Marketing', 'Sales', 'Consulting', 
  'Manufacturing', 'Education', 'Real Estate', 'Legal', 'Media', 'Retail'
];

const tones = ['Professional', 'Casual', 'Direct', 'Friendly'];
const experienceLevels = ['Junior', 'Mid-Level', 'Senior', 'Executive'];
const sequenceTypes = ['Initial Outreach', 'Follow-up 1', 'Follow-up 2', 'Final Follow-up', 'Breakup Email'];

// Email Templates
const emailSubjectTemplates = {
  "Initial Outreach": [
    "{company_name} is hiring - your {role_title} expertise?",
    "Quick question about your {skill} background",
    "{role_title} opportunity at fast-growing {company_name}",
    "Impressed by your work at {current_company}",
    "30 seconds to discuss your {industry} experience?",
    "Perfect {role_title} role for someone with your background",
    "{first_name}, interested in a {role_title} conversation?",
    "Your {skill} expertise caught our attention",
    "Confidential {role_title} opportunity - {company_name}",
    "{company_name} needs your {industry} expertise",
    "Quick chat about your {role_title} career?",
    "Exciting {role_title} role at {company_name}",
    "{first_name}, 2 minutes to discuss your future?",
    "Your {current_company} experience is exactly what we need",
    "{role_title} position that matches your background",
    "Confidential opportunity in {industry}",
    "{company_name} - Perfect fit for your {skill} skills",
    "Quick question about your {role_title} goals",
    "Impressive {industry} background - let's connect",
    "{first_name}, interested in hearing about {company_name}?",
    "$150K+ {role_title} role - interested?",
    "{company_name} offering $120K-180K for {skill} expert",
    "High-paying {role_title} opportunity ($140K+)",
    "{first_name}, $160K+ role using your {skill} skills",
    "Confidential $200K+ {role_title} position",
    "{company_name} budget: $130K-200K for right {role_title}",
    "$175K {role_title} role - perfect for your background",
    "Six-figure {role_title} opportunity at {company_name}",
    "{first_name}, $180K+ role in {industry}",
    "Premium compensation: $150K-220K {role_title} role"
  ],
  "Follow-up 1": [
    "Following up: {role_title} opportunity at {company_name}",
    "Re: {role_title} position - quick update",
    "Checking in about {company_name} opportunity",
    "{first_name}, still interested in discussing {role_title} role?",
    "Quick follow-up: {skill} opportunity",
    "In case you missed my previous email - {role_title} role",
    "Following up on {company_name} opportunity",
    "Second attempt: {role_title} position for you?",
    "Re: Your {skill} expertise and our {role_title} opening",
    "Circling back about {company_name} opportunity"
  ],
  "Follow-up 2": [
    "One more attempt: {role_title} at {company_name}",
    "Third time's a charm? {role_title} opportunity",
    "Still interested in hearing about this {role_title} role?",
    "Final follow-up: {company_name} {role_title} position",
    "Last check: {skill} opportunity at {company_name}",
    "One last attempt: {role_title} role with great compensation",
    "Third outreach: {role_title} opportunity for you",
    "Re: {role_title} position - still available for you"
  ],
  "Final Follow-up": [
    "Final note: {role_title} opportunity at {company_name}",
    "Last chance: {role_title} position closing soon",
    "Closing this {role_title} opportunity soon",
    "Final outreach: {skill} opportunity at {company_name}",
    "Last attempt: {role_title} role with {company_name}",
    "Wrapping up: {role_title} opportunity",
    "Final check-in: {role_title} position"
  ],
  "Breakup Email": [
    "Closing the loop on {role_title} opportunity",
    "Moving on: {role_title} position at {company_name}",
    "Closing your file: {role_title} opportunity",
    "Wrapping up: {company_name} {role_title} position",
    "Closing this conversation: {role_title} opportunity",
    "Moving forward with other candidates: {role_title} role"
  ]
};

// LinkedIn Message Templates (shorter, more conversational)
const linkedinSubjectTemplates = {
  "Initial Outreach": [
    "Quick question about your {skill} background",
    "{role_title} opportunity at {company_name}",
    "Impressed by your {current_company} experience",
    "Your {skill} expertise caught my attention",
    "{first_name}, quick {role_title} question",
    "Love your {industry} background",
    "Perfect {role_title} role for you",
    "{company_name} is looking for someone like you",
    "Your {current_company} work is impressive",
    "Quick chat about your career?",
    "Exciting {role_title} opportunity",
    "{first_name}, interested in {company_name}?",
    "Your {skill} skills are exactly what we need",
    "Confidential {role_title} role",
    "{industry} opportunity at {company_name}"
  ],
  "Follow-up 1": [
    "Following up: {role_title} opportunity",
    "Checking in about {company_name}",
    "Still interested in discussing {role_title}?",
    "Quick follow-up about {skill} opportunity",
    "In case you missed my message - {role_title} role"
  ],
  "Follow-up 2": [
    "One more attempt: {role_title} at {company_name}",
    "Still interested in this {role_title} role?",
    "Last check: {skill} opportunity",
    "One last attempt: {role_title} role"
  ],
  "Final Follow-up": [
    "Final note: {role_title} opportunity",
    "Last chance: {role_title} position",
    "Closing this {role_title} opportunity soon"
  ],
  "Breakup Email": [
    "Closing the loop on {role_title} opportunity",
    "Moving on: {role_title} position",
    "Closing your file: {role_title} opportunity"
  ]
};

const emailOpeningTemplates = {
  "Initial Outreach": {
    Tech: [
      "Hi {first_name}, saw your {skill} background at {current_company} and was impressed by your technical depth.",
      "Hi {first_name}, your experience with {skill} at {current_company} caught my attention.",
      "Hi {first_name}, I've been following your work in {industry} and your {skill} expertise is exactly what we're looking for.",
      "Hi {first_name}, your technical background at {current_company} aligns perfectly with what we're building."
    ],
    Finance: [
      "Hi {first_name}, your financial expertise at {current_company} is impressive.",
      "Hi {first_name}, saw your background in {industry} and your analytical skills stand out.",
      "Hi {first_name}, your experience managing {skill} at {current_company} caught our attention.",
      "Hi {first_name}, your track record in {industry} speaks for itself."
    ],
    Healthcare: [
      "Hi {first_name}, your healthcare experience at {current_company} is exactly what we need.",
      "Hi {first_name}, your background in {industry} and patient care expertise is impressive.",
      "Hi {first_name}, saw your work at {current_company} and your {skill} experience is perfect.",
      "Hi {first_name}, your healthcare leadership at {current_company} caught our attention."
    ],
    default: [
      "Hi {first_name}, your experience at {current_company} caught my attention.",
      "Hi {first_name}, saw your background in {industry} and was impressed.",
      "Hi {first_name}, your {skill} expertise at {current_company} is exactly what we're looking for.",
      "Hi {first_name}, your professional background aligns perfectly with an opportunity I have."
    ]
  },
  "Follow-up 1": {
    default: [
      "Hi {first_name}, I reached out last week about a {role_title} opportunity at {company_name} and wanted to follow up.",
      "Hi {first_name}, I sent you a message about a {role_title} role that matches your {skill} background. Just checking if you saw it.",
      "Hi {first_name}, I'm following up on my previous message about a {role_title} position that aligns with your experience at {current_company}.",
      "Hi {first_name}, I wanted to circle back regarding the {role_title} opportunity I mentioned. Your {skill} expertise would be valuable to our team."
    ]
  },
  "Follow-up 2": {
    default: [
      "Hi {first_name}, I've reached out a couple times about a {role_title} opportunity at {company_name} that matches your {skill} background.",
      "Hi {first_name}, I'm making one more attempt to connect about a {role_title} role that seems perfect for someone with your experience at {current_company}.",
      "Hi {first_name}, I've tried to reach you about an exciting {role_title} opportunity. Your {skill} expertise is exactly what {company_name} is looking for."
    ]
  },
  "Final Follow-up": {
    default: [
      "Hi {first_name}, this will be my final outreach regarding the {role_title} position at {company_name}.",
      "Hi {first_name}, I wanted to make one final attempt to connect about the {role_title} role that matches your {skill} background.",
      "Hi {first_name}, I'm sending this last note about the {role_title} opportunity at {company_name}. Your experience at {current_company} makes you an ideal candidate."
    ]
  },
  "Breakup Email": {
    default: [
      "Hi {first_name}, I've tried to reach you a few times about a {role_title} opportunity at {company_name}.",
      "Hi {first_name}, I wanted to close the loop on the {role_title} position I mentioned previously.",
      "Hi {first_name}, I've made several attempts to connect about a {role_title} role that matches your {skill} background."
    ]
  }
};

// LinkedIn openings (more casual, shorter)
const linkedinOpeningTemplates = {
  "Initial Outreach": {
    Tech: [
      "Love your {skill} work at {current_company}!",
      "Your {skill} background caught my eye.",
      "Impressive tech work at {current_company}.",
      "Your {industry} expertise is exactly what we need."
    ],
    Finance: [
      "Your financial expertise at {current_company} is impressive.",
      "Love your {industry} background.",
      "Your analytical skills really stand out.",
      "Impressive track record in {industry}."
    ],
    Healthcare: [
      "Your healthcare experience is exactly what we need.",
      "Love your {industry} background.",
      "Impressive work at {current_company}.",
      "Your healthcare expertise caught my attention."
    ],
    default: [
      "Your experience at {current_company} caught my eye.",
      "Love your {industry} background.",
      "Your {skill} expertise is impressive.",
      "Your professional background is exactly what we're looking for."
    ]
  },
  "Follow-up 1": {
    default: [
      "Following up on my message about a {role_title} opportunity.",
      "Just checking if you saw my message about {company_name}.",
      "Wanted to circle back about the {role_title} role I mentioned.",
      "Checking if you're interested in the {role_title} position I shared."
    ]
  },
  "Follow-up 2": {
    default: [
      "Making one more attempt about the {role_title} role.",
      "Still think you'd be perfect for this {role_title} position.",
      "One more try - your {skill} skills would be perfect for this role.",
      "Third time's a charm? Great {role_title} opportunity here."
    ]
  },
  "Final Follow-up": {
    default: [
      "Final note about the {role_title} opportunity.",
      "Last attempt to connect about this {role_title} role.",
      "One final message about the {role_title} position."
    ]
  },
  "Breakup Email": {
    default: [
      "Closing the loop on the {role_title} opportunity.",
      "Moving on with other candidates for the {role_title} role.",
      "Wrapping up my outreach about the {role_title} position."
    ]
  }
};

const emailBodyTemplates = {
  "Initial Outreach": {
    Professional: [
      "I'm working with {company_name}, a {industry} company that's scaling rapidly. They're looking for a {role_title} who can {skill} and drive results.\n\nThe role offers competitive compensation, equity upside, and the opportunity to shape the direction of a growing team.\n\nWould you be open to a brief conversation to learn more?",
      "I represent {company_name}, a leading {industry} organization seeking a {role_title}. Your background at {current_company} demonstrates the exact expertise they need.\n\nThis is a senior-level position with significant growth potential and competitive compensation.\n\nWould you be interested in exploring this opportunity?",
      "{company_name} is expanding their {industry} team and looking for someone with your {skill} background. The {role_title} position offers excellent growth potential and the chance to work with cutting-edge technology.\n\nI'd love to share more details about the role and compensation package."
    ],
    Casual: [
      "Hope you're doing well! I came across your profile and thought you might be interested in what {company_name} is building in the {industry} space.\n\nThey're looking for a {role_title} and your {skill} experience at {current_company} seems like a perfect fit.\n\nWant to hop on a quick call to chat about it?",
      "Hey! Saw your background at {current_company} and had to reach out. {company_name} is doing some really cool stuff in {industry} and they need someone with your {skill} expertise.\n\nInterested in hearing more? It's a pretty exciting opportunity.",
      "Hi there! Your work at {current_company} caught my eye. I'm working with {company_name} on finding their next {role_title} and your background is exactly what they're looking for.\n\nWould love to tell you more about what they're building!"
    ],
    Direct: [
      "{company_name} needs a {role_title}. Your {skill} experience at {current_company} makes you an ideal candidate.\n\nCompensation: Competitive base + equity\nStart date: Flexible\nLocation: [Location/Remote]\n\nInterested in learning more?",
      "Straight to the point: {company_name} is hiring a {role_title}. Your background fits perfectly.\n\nWhat they offer:\n- Competitive salary\n- Equity package\n- Growth opportunities\n- Strong team culture\n\nWorth a conversation?",
      "{company_name} is looking for a {role_title} with {skill} experience. You have exactly what they need.\n\nThis is a senior role with significant impact and compensation to match.\n\nCan we schedule 15 minutes to discuss?"
    ],
    Friendly: [
      "I hope this message finds you well! I've been following your career journey and I'm really impressed by what you've accomplished at {current_company}.\n\n{company_name} is building something special in the {industry} space, and they're looking for a {role_title} who shares their vision.\n\nI'd love to connect you with the team if you're open to exploring new opportunities!",
      "Hi {first_name}! I hope you're having a great week. I came across your profile and was really impressed by your {skill} work at {current_company}.\n\n{company_name} is growing fast and looking for talented people like you to join their {industry} team.\n\nWould you be interested in learning more about what they're building?",
      "Hello! I hope you don't mind me reaching out. I've been researching top talent in {industry} and your name keeps coming up.\n\n{company_name} is doing some really innovative work and they're looking for a {role_title} to help lead their next phase of growth.\n\nI'd love to share more about this opportunity with you!"
    ]
  },
  "Follow-up 1": {
    Professional: [
      "I wanted to follow up on my previous message about the {role_title} opportunity at {company_name}. Your {skill} experience would be a great fit for this role.\n\nThe team is moving forward with interviews, and I'd love to include you in the process if you're interested.",
      "I'm following up regarding the {role_title} position at {company_name} that I mentioned last week. Your background at {current_company} aligns well with what they're looking for.\n\nAre you open to a quick conversation to learn more about this opportunity?",
      "I wanted to check if you received my previous message about the {role_title} role at {company_name}. Your {skill} expertise is exactly what they need, and I believe this could be a great next step in your career."
    ],
    Casual: [
      "Just floating this to the top of your inbox! I reached out last week about a {role_title} role at {company_name} that would be perfect for someone with your {skill} background.\n\nThought I'd check if you're interested in learning more?",
      "Hey {first_name}, just following up on my previous message about the {role_title} opportunity. {company_name} is still very interested in someone with your background.\n\nWould you be open to a quick chat about it?",
      "Just checking in! I sent you a note about a {role_title} position at {company_name} that matches your experience. Let me know if you'd like to hear more about it."
    ],
    Direct: [
      "Following up on the {role_title} opportunity at {company_name}. Your {skill} background is a strong match.\n\nThe hiring team is reviewing candidates this week. Are you interested in being considered?",
      "Quick follow-up: {company_name} is still looking for a {role_title}. Your experience at {current_company} is exactly what they need.\n\nInterested in a conversation?",
      "Following up on my previous message. {company_name} is hiring a {role_title} with {skill} expertise. The position offers competitive compensation and growth opportunities.\n\nWould you like to discuss?"
    ],
    Friendly: [
      "I hope you're having a great week! I just wanted to follow up on my previous message about the {role_title} opportunity at {company_name}.\n\nI really think your background would be a great fit, and I'd love to tell you more about it if you're interested.",
      "Hi again, {first_name}! I hope I'm not bothering you, but I wanted to make sure you saw my previous message about the {role_title} role at {company_name}.\n\nYour {skill} expertise would be so valuable to their team, and I'd love to connect you if you're open to new opportunities.",
      "Hello again! I just wanted to check if you received my previous message about the {role_title} opportunity at {company_name}. I really believe your experience at {current_company} makes you an ideal candidate, and I'd love to tell you more about it."
    ]
  },
  "Follow-up 2": {
    Professional: [
      "I've reached out a couple times regarding a {role_title} opportunity at {company_name}. Your {skill} background makes you an excellent candidate for this position.\n\nThe hiring team is finalizing their interview schedule soon. Would you be interested in being included?",
      "This is my third attempt to connect regarding a {role_title} position at {company_name}. Your experience at {current_company} is exactly what they're looking for.\n\nIf you're open to exploring this opportunity, I'd appreciate a brief response. If not, I understand and won't reach out again.",
      "I wanted to make one more attempt to connect about the {role_title} role at {company_name}. Your {skill} expertise would be highly valued, and the compensation package is very competitive."
    ],
    Casual: [
      "Third time's a charm? I've reached out a couple times about a {role_title} role at {company_name} that would be perfect for someone with your {skill} background.\n\nIf you're interested, I'd love to chat. If not, no worries at all!",
      "Hey {first_name}, just one more follow-up about the {role_title} opportunity at {company_name}. Your experience is exactly what they're looking for, and I'd hate for you to miss out if it's something you might be interested in.",
      "Last attempt! I've tried to reach you about a {role_title} position that matches your {skill} expertise. If you're even slightly curious, I'd love to share more details."
    ],
    Direct: [
      "Final follow-up: {company_name} is hiring a {role_title}. Your {skill} background is ideal.\n\nInterested in learning more? Please let me know either way.",
      "Third attempt: {company_name} needs a {role_title} with your expertise. Competitive compensation and growth opportunities available.\n\nInterested or should I close your file?",
      "One last try: {role_title} position at {company_name} matching your {skill} background. Please let me know if you'd like to discuss or if I should move on."
    ],
    Friendly: [
      "I hope you don't mind one more follow-up! I've reached out a couple times about a {role_title} opportunity at {company_name} that seems perfect for someone with your background.\n\nIf you're interested, I'd love to connect. If not, I completely understand and won't bother you again.",
      "Hi {first_name}! This is my last attempt to reach out about the {role_title} role at {company_name}. Your {skill} expertise would be such a great fit, and I'd hate for you to miss out on an opportunity you might love.\n\nEven if you're just slightly curious, I'd be happy to share more details.",
      "Hello again! I promise this is my final follow-up about the {role_title} position at {company_name}. Your experience at {current_company} makes you an ideal candidate, and I'd love to tell you more if you're interested."
    ]
  },
  "Final Follow-up": {
    Professional: [
      "This will be my final outreach regarding the {role_title} position at {company_name}. Your {skill} background would be a great fit, and the door remains open if you'd like to explore this opportunity.\n\nIf your situation changes in the future, please don't hesitate to reach out.",
      "As a final follow-up, I wanted to let you know that we're still interested in speaking with you about the {role_title} role at {company_name}. Your experience at {current_company} is exactly what we're looking for.\n\nIf timing isn't right, I understand. Feel free to connect if things change.",
      "This is my final note regarding the {role_title} opportunity at {company_name}. The position offers competitive compensation and significant growth potential for someone with your {skill} expertise.\n\nIf you'd like to discuss this or future opportunities, my door is always open."
    ],
    Casual: [
      "Last try, I promise! I've reached out a few times about a {role_title} role at {company_name} that would be perfect for someone with your background.\n\nIf you're interested, great! If not, no worries at all. Either way, I'd appreciate a quick note so I can update my records.",
      "Final follow-up on the {role_title} opportunity! Your {skill} experience would be awesome for this role, but I understand if it's not the right time or fit.\n\nJust let me know either way, and I'll stop filling up your inbox!",
      "Last message, pinky promise! The {role_title} role at {company_name} is still available, and your background at {current_company} makes you a perfect candidate.\n\nInterested or should I stop reaching out? A quick yes or no would be super helpful."
    ],
    Direct: [
      "Final outreach: {company_name} {role_title} position. Your {skill} background is ideal. Please let me know if you're interested or if I should close your file.",
      "Last attempt: {role_title} opportunity at {company_name}. Competitive compensation for your {skill} expertise. Interested or should I move on?",
      "Final follow-up: {company_name} is still interested in your {skill} background for their {role_title} role. Please let me know your decision either way."
    ],
    Friendly: [
      "I promise this is my very last message about the {role_title} opportunity at {company_name}! Your background is so perfect for this role that I wanted to give it one final try.\n\nIf you're interested, I'd be thrilled to connect you. If not, I completely understand and wish you all the best in your career!",
      "Hi {first_name}! This is absolutely my final follow-up about the {role_title} position. Your {skill} expertise would be such a great addition to {company_name}, but I understand if the timing isn't right.\n\nEither way, I wish you continued success and would love to hear from you if you're ever looking for new opportunities.",
      "Hello one last time! I wanted to give the {role_title} opportunity at {company_name} one final mention. Your experience at {current_company} is truly impressive, and I think you'd be an amazing fit.\n\nIf you're interested, great! If not, no worries at all. Wishing you all the best either way!"
    ]
  },
  "Breakup Email": {
    Professional: [
      "I've tried to reach you a few times about the {role_title} position at {company_name}. Since I haven't heard back, I'll assume the timing isn't right and close your file for this opportunity.\n\nIf your situation changes or you're interested in future opportunities that match your {skill} expertise, please don't hesitate to reach out.",
      "After several attempts to connect regarding the {role_title} role at {company_name}, I wanted to let you know that I'll be moving forward with other candidates.\n\nIf you're interested in future opportunities that align with your experience at {current_company}, my door is always open.",
      "I wanted to close the loop on the {role_title} opportunity at {company_name} that I've mentioned in previous messages. Since I haven't heard back, I'll assume you're not interested at this time.\n\nI wish you continued success, and please feel free to reach out if you're open to new opportunities in the future."
    ],
    Casual: [
      "I've tried reaching out a few times about the {role_title} role, but I know how busy life can get! I'll stop filling up your inbox and assume the timing isn't right.\n\nIf you ever want to chat about this or other opportunities in the future, my door is always open!",
      "Since I haven't heard back about the {role_title} opportunity, I'll assume you're happy where you are or the timing isn't right. No worries at all!\n\nIf things change, feel free to reach out. Wishing you all the best!",
      "I'll take the hint and stop reaching out about the {role_title} position! If you change your mind or are looking for new opportunities in the future, don't hesitate to get in touch.\n\nWishing you continued success at {current_company}!"
    ],
    Direct: [
      "After several attempts to reach you about the {role_title} position, I'll be closing your file and moving forward with other candidates. If your situation changes, feel free to reach out.",
      "Since I haven't received a response regarding the {role_title} opportunity, I'll assume you're not interested and stop reaching out. Best of luck in your career.",
      "I'll be moving forward with other candidates for the {role_title} role at {company_name}. If you're interested in future opportunities, please let me know."
    ],
    Friendly: [
      "I've tried to reach you a few times about the {role_title} opportunity, but I understand that timing isn't always right or you might be happy where you are. I'll stop reaching out for now.\n\nI wish you all the best, and if you're ever looking for new opportunities in the future, I'd be happy to reconnect!",
      "Since I haven't heard back, I'll assume you're not interested in the {role_title} position at this time, which is completely fine! We all have different paths and priorities.\n\nI wish you continued success in your career, and my door is always open if you'd like to explore opportunities in the future.",
      "I wanted to wrap up my outreach about the {role_title} role. I know how busy life can get, and I respect your time and inbox!\n\nIf you ever want to explore new opportunities that match your amazing {skill} skills, please don't hesitate to reach out. Wishing you all the best!"
    ]
  }
};

// LinkedIn body templates (much shorter)
const linkedinBodyTemplates = {
  "Initial Outreach": {
    Professional: [
      "{company_name} is looking for a {role_title} with your {skill} background. Great compensation and growth opportunity.\n\nWorth a quick chat?",
      "Working with {company_name} on a {role_title} role. Your {current_company} experience is exactly what they need.\n\nInterested in learning more?",
      "{company_name} needs someone with your {skill} expertise. Competitive package and great team.\n\nOpen to a brief conversation?"
    ],
    Casual: [
      "{company_name} is doing cool stuff in {industry} and looking for someone like you.\n\nWant to chat about it?",
      "Thought you might be interested in what {company_name} is building. Perfect fit for your background.\n\nQuick call?",
      "{company_name} needs a {role_title} and your {skill} experience is perfect.\n\nInterested in hearing more?"
    ],
    Direct: [
      "{company_name} is hiring a {role_title}. Your background fits.\n\nCompetitive salary + equity.\n\nInterested?",
      "{role_title} role at {company_name}. Your {skill} experience is exactly what they need.\n\nWorth discussing?",
      "Direct: {company_name} needs a {role_title}. You're a perfect fit.\n\nQuick chat?"
    ],
    Friendly: [
      "Hope you're doing well! {company_name} is looking for someone with your {skill} background.\n\nWould love to share more details!",
      "Your work at {current_company} is impressive! {company_name} has a great {role_title} opportunity.\n\nInterested in learning more?",
      "Hi! {company_name} is building something exciting and looking for talented {role_title}s.\n\nWould you be open to a quick chat?"
    ]
  },
  "Follow-up 1": {
    Professional: [
      "Following up on my message about the {role_title} role at {company_name}. Your {skill} background would be a great fit.\n\nInterested in learning more?",
      "Just checking if you saw my previous message about a {role_title} opportunity that matches your experience.",
      "Wanted to follow up about the {role_title} position I mentioned. Your background at {current_company} is exactly what we're looking for."
    ],
    Casual: [
      "Just bumping my previous message about a cool {role_title} role that would be perfect for you!",
      "Hey! Just checking if you saw my note about the {role_title} opportunity at {company_name}?",
      "Floating this back to the top - {company_name} is still looking for someone with your {skill} skills!"
    ],
    Direct: [
      "Following up: {role_title} position at {company_name}. Interested?",
      "Checking if you saw my message about the {role_title} opportunity. Worth a conversation?",
      "Quick follow-up: {company_name} is still looking for a {role_title}. Interested in discussing?"
    ],
    Friendly: [
      "Hope you're having a great week! Just wanted to check if you saw my message about the {role_title} opportunity?",
      "Hi again! Just making sure you didn't miss my note about the {role_title} role at {company_name}.",
      "Just a friendly follow-up about the {role_title} opportunity I mentioned. Would love to connect if you're interested!"
    ]
  },
  "Follow-up 2": {
    Professional: [
      "I've reached out a couple times about a {role_title} role that matches your {skill} background. The team is finalizing interviews soon.",
      "Making one more attempt regarding the {role_title} position at {company_name}. Your experience would be valuable to their team.",
      "Third attempt: {company_name} is still interested in your {skill} background for their {role_title} role."
    ],
    Casual: [
      "Third time's a charm? Still think you'd be perfect for this {role_title} role!",
      "One more try! This {role_title} opportunity at {company_name} is too good not to share with you.",
      "Last attempt - really think you'd be great for this {role_title} position!"
    ],
    Direct: [
      "Final check: Interested in {role_title} role at {company_name}?",
      "Third attempt: {company_name} still hiring for {role_title}. Interested?",
      "One last try: {role_title} position matching your {skill} background. Interested or should I move on?"
    ],
    Friendly: [
      "Promise this is my last follow-up about the {role_title} role! Would hate for you to miss out if it's something you'd be interested in.",
      "One final note about the {role_title} opportunity - your background is just so perfect that I had to try one more time!",
      "Last friendly nudge about the {role_title} position at {company_name}. Would love to connect if you're interested!"
    ]
  },
  "Final Follow-up": {
    Professional: [
      "This is my final outreach regarding the {role_title} position. The door remains open if you'd like to discuss this opportunity.",
      "As a final follow-up, {company_name} is still interested in your {skill} background for their {role_title} role.",
      "Final note: The {role_title} opportunity is still available if you're interested in exploring it."
    ],
    Casual: [
      "Last try, promise! Still think you'd be amazing for this {role_title} role.",
      "Final ping about the {role_title} opportunity! Let me know if you're interested.",
      "Last message about this {role_title} role - it really does seem perfect for your background!"
    ],
    Direct: [
      "Final outreach: {role_title} position at {company_name}. Interested or should I close your file?",
      "Last attempt: {company_name} {role_title} role. Please let me know your decision.",
      "Final check: Interested in {role_title} opportunity or should I move on?"
    ],
    Friendly: [
      "My absolutely final message about the {role_title} opportunity! Would love to connect if you're interested.",
      "Last friendly note about the {role_title} role at {company_name}. The door is always open!",
      "Final follow-up about the {role_title} position. Wishing you all the best either way!"
    ]
  },
  "Breakup Email": {
    Professional: [
      "Since I haven't heard back about the {role_title} position, I'll close your file for now. Feel free to reach out if your situation changes.",
      "I'll be moving forward with other candidates for the {role_title} role. Best of luck in your career.",
      "I'll stop reaching out about the {role_title} opportunity. If you're interested in future roles, please let me know."
    ],
    Casual: [
      "I'll stop filling up your inbox about the {role_title} role! If you ever want to chat in the future, my door is open.",
      "No worries about the {role_title} position - I'll assume the timing isn't right and move on.",
      "I'll take the hint and stop messaging about the {role_title} opportunity! Wishing you all the best."
    ],
    Direct: [
      "Closing your file for the {role_title} position. Best of luck in your career.",
      "Moving forward with other candidates for the {role_title} role. Reach out if your situation changes.",
      "Ending outreach about {company_name} {role_title} position. All the best."
    ],
    Friendly: [
      "I'll stop reaching out about the {role_title} opportunity. Wishing you continued success in your career!",
      "I understand timing isn't right for the {role_title} role. My door is always open if things change!",
      "I'll wrap up my messages about the {role_title} position. All the best in your career journey!"
    ]
  }
};

const emailCtaTemplates = {
  "Initial Outreach": [
    "Are you available for a brief 15-minute call this week?",
    "Would you be open to a quick conversation?",
    "Can we schedule a brief call to discuss?",
    "Interested in learning more? Let's connect.",
    "Would you like to hear more details?",
    "Are you available for a quick chat this week?",
    "Can we set up a brief call?",
    "Would you be interested in exploring this further?",
    "Let's schedule a quick conversation - when works best?",
    "Are you open to a brief discussion about this opportunity?"
  ],
  "Follow-up 1": [
    "Would you be open to a brief conversation this week?",
    "If you're interested, I'd love to schedule a quick call.",
    "Let me know if you'd like to learn more about this opportunity.",
    "Would a 15-minute call work for you this week?",
    "I'm happy to share more details if you're interested."
  ],
  "Follow-up 2": [
    "If you're interested, please let me know and we can schedule a call.",
    "A simple yes or no would be appreciated so I can update my records.",
    "Would you be open to a brief conversation, or should I close your file?",
    "Please let me know if you'd like to discuss or if I should move on.",
    "Even a quick 'not interested' would be helpful."
  ],
  "Final Follow-up": [
    "If you're interested, please let me know. Otherwise, I'll stop reaching out.",
    "A simple yes or no would be greatly appreciated.",
    "Please let me know if you'd like to discuss or if I should close your file.",
    "If I don't hear back, I'll assume the timing isn't right and move on.",
    "Even a brief response would be helpful for my records."
  ],
  "Breakup Email": [
    "If your situation changes in the future, please don't hesitate to reach out.",
    "Wishing you continued success in your career.",
    "My door is always open if you're interested in future opportunities.",
    "Feel free to connect if your situation changes.",
    "All the best in your career journey."
  ]
};

const linkedinCtaTemplates = {
  "Initial Outreach": [
    "Quick call this week?",
    "Worth a chat?",
    "Interested in learning more?",
    "Open to a brief conversation?",
    "Want to hear more?",
    "Available for a quick call?",
    "Worth discussing?",
    "Interested in exploring this?",
    "Quick conversation?",
    "Open to chatting about this?"
  ],
  "Follow-up 1": [
    "Still interested in chatting?",
    "Quick call this week?",
    "Let me know if you'd like to learn more.",
    "Interested in hearing details?",
    "Open to a brief discussion?"
  ],
  "Follow-up 2": [
    "Interested or should I move on?",
    "Quick yes or no?",
    "Worth a conversation?",
    "Let me know either way?",
    "Still open to discussing?"
  ],
  "Final Follow-up": [
    "Last chance - interested?",
    "Quick yes or no appreciated.",
    "Interested or should I close your file?",
    "Final check - worth discussing?",
    "One word response is fine."
  ],
  "Breakup Email": [
    "All the best in your career.",
    "Door's open if things change.",
    "Wishing you continued success.",
    "Feel free to reach out later.",
    "Best of luck!"
  ]
};

export default function CopyGenerator() {
  const [platform, setPlatform] = useState<'email' | 'linkedin'>('email');
  const [formData, setFormData] = useState<FormData>({
    candidateName: '',
    companyName: '',
    roleTitle: '',
    skillTechnology: '',
    industry: 'Tech',
    tone: 'Professional',
    experienceLevel: 'Mid-Level',
    currentCompany: '',
    sequenceType: 'Initial Outreach'
  });

  const [template, setTemplate] = useState<CopyTemplate>({
    subject: '',
    opening: '',
    body: '',
    cta: ''
  });

  const [viewMode, setViewMode] = useState<'preview' | 'template'>('preview');
  const [copied, setCopied] = useState<string | null>(null);

  const getRandomItem = (array: string[]) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const generateTemplate = useCallback(() => {
    const isEmail = platform === 'email';
    
    const subjectTemplates = isEmail 
      ? emailSubjectTemplates[formData.sequenceType as keyof typeof emailSubjectTemplates] 
      : linkedinSubjectTemplates[formData.sequenceType as keyof typeof linkedinSubjectTemplates];
    
    const openingTemplates = isEmail 
      ? emailOpeningTemplates[formData.sequenceType as keyof typeof emailOpeningTemplates] 
      : linkedinOpeningTemplates[formData.sequenceType as keyof typeof linkedinOpeningTemplates];
    
    const bodyTemplates = isEmail 
      ? emailBodyTemplates[formData.sequenceType as keyof typeof emailBodyTemplates] 
      : linkedinBodyTemplates[formData.sequenceType as keyof typeof linkedinBodyTemplates];
    
    const ctaTemplates = isEmail 
      ? emailCtaTemplates[formData.sequenceType as keyof typeof emailCtaTemplates] 
      : linkedinCtaTemplates[formData.sequenceType as keyof typeof linkedinCtaTemplates];
    
    const industryOpenings = 
      (formData.sequenceType === "Initial Outreach" && openingTemplates[formData.industry as keyof typeof openingTemplates]) || 
      openingTemplates.default;
    
    const toneBodyTemplates = bodyTemplates[formData.tone as keyof typeof bodyTemplates] || bodyTemplates.Professional;

    setTemplate({
      subject: getRandomItem(subjectTemplates),
      opening: getRandomItem(Array.isArray(industryOpenings) ? industryOpenings : industryOpenings as unknown as string[]),
      body: getRandomItem(toneBodyTemplates),
      cta: getRandomItem(ctaTemplates)
    });
  }, [formData, platform]);

  const refreshSection = (section: keyof CopyTemplate) => {
    const isEmail = platform === 'email';
    
    const subjectTemplates = isEmail 
      ? emailSubjectTemplates[formData.sequenceType as keyof typeof emailSubjectTemplates] 
      : linkedinSubjectTemplates[formData.sequenceType as keyof typeof linkedinSubjectTemplates];
    
    const openingTemplates = isEmail 
      ? emailOpeningTemplates[formData.sequenceType as keyof typeof emailOpeningTemplates] 
      : linkedinOpeningTemplates[formData.sequenceType as keyof typeof linkedinOpeningTemplates];
    
    const bodyTemplates = isEmail 
      ? emailBodyTemplates[formData.sequenceType as keyof typeof emailBodyTemplates] 
      : linkedinBodyTemplates[formData.sequenceType as keyof typeof linkedinBodyTemplates];
    
    const ctaTemplates = isEmail 
      ? emailCtaTemplates[formData.sequenceType as keyof typeof emailCtaTemplates] 
      : linkedinCtaTemplates[formData.sequenceType as keyof typeof linkedinCtaTemplates];
    
    const industryOpenings = 
      (formData.sequenceType === "Initial Outreach" && openingTemplates[formData.industry as keyof typeof openingTemplates]) || 
      openingTemplates.default;
    
    const toneBodyTemplates = bodyTemplates[formData.tone as keyof typeof bodyTemplates] || bodyTemplates.Professional;

    const newTemplate = { ...template };
    
    switch (section) {
      case 'subject':
        newTemplate.subject = getRandomItem(subjectTemplates);
        break;
      case 'opening':
        newTemplate.opening = getRandomItem(Array.isArray(industryOpenings) ? industryOpenings : industryOpenings as unknown as string[]);
        break;
      case 'body':
        newTemplate.body = getRandomItem(toneBodyTemplates);
        break;
      case 'cta':
        newTemplate.cta = getRandomItem(ctaTemplates);
        break;
    }
    
    setTemplate(newTemplate);
  };

  const fillVariables = (text: string) => {
    if (viewMode === 'template') return text;
    
    return text
      .replace(/{company_name}/g, formData.companyName || '[Company Name]')
      .replace(/{role_title}/g, formData.roleTitle || '[Role Title]')
      .replace(/{industry}/g, formData.industry)
      .replace(/{current_company}/g, formData.currentCompany || '[Current Company]')
      .replace(/{first_name}/g, formData.candidateName || '[First Name]')
      .replace(/{skill}/g, formData.skillTechnology || '[Skill/Technology]');
  };

  const getFullMessage = () => {
    const subject = fillVariables(template.subject);
    const opening = fillVariables(template.opening);
    const body = fillVariables(template.body);
    const cta = fillVariables(template.cta);
    
    if (platform === 'email') {
      return `Subject: ${subject}\n\n${opening}\n\n${body}\n\n${cta}\n\nBest regards,\n[Your Name]`;
    } else {
      return `${opening}\n\n${body}\n\n${cta}`;
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getCharacterCount = (text: string) => {
    return fillVariables(text).length;
  };

  useEffect(() => {
    generateTemplate();
  }, [generateTemplate]);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-anton text-4xl text-white mb-3">COPY GENERATOR</h1>
        <p className="font-jakarta text-gray-400 text-lg">
          Create personalized recruiting outreach for email and LinkedIn
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form Section */}
        <div className="space-y-8">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-anton text-2xl text-white">CUSTOMIZE COPY</h2>
              <button
                onClick={generateTemplate}
                className="bg-supernova hover:bg-yellow-400 text-shadowforce font-jakarta font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center"
              >
                <Shuffle className="w-4 h-4 mr-2" />
                Generate New
              </button>
            </div>

            {/* Platform Toggle */}
            <div className="mb-8">
              <label className="block text-sm font-jakarta font-medium text-white mb-3">
                Platform
              </label>
              <div className="flex items-center bg-gray-800/50 rounded-lg p-1">
                <button
                  onClick={() => setPlatform('email')}
                  className={`flex-1 py-3 px-4 rounded-md font-jakarta font-bold transition-all duration-200 flex items-center justify-center ${
                    platform === 'email'
                      ? 'bg-supernova text-shadowforce'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </button>
                <button
                  onClick={() => setPlatform('linkedin')}
                  className={`flex-1 py-3 px-4 rounded-md font-jakarta font-bold transition-all duration-200 flex items-center justify-center ${
                    platform === 'linkedin'
                      ? 'bg-supernova text-shadowforce'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  LinkedIn
                </button>
              </div>
            </div>

            {/* Sequence Type */}
            <div className="mb-8">
              <label className="block text-sm font-jakarta font-medium text-white mb-3">
                Sequence Type
              </label>
              <div className="flex flex-wrap items-center bg-gray-800/50 rounded-lg p-1">
                {sequenceTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFormData({ ...formData, sequenceType: type })}
                    className={`py-2 px-3 m-1 rounded-md font-jakarta font-medium text-sm transition-all duration-200 ${
                      formData.sequenceType === type
                        ? 'bg-supernova text-shadowforce'
                        : 'text-gray-300 hover:text-white bg-gray-700/50'
                    }`}
                  >
                    {type === "Initial Outreach" && <Calendar className="w-3 h-3 mr-1 inline" />}
                    {type === "Follow-up 1" && <Calendar className="w-3 h-3 mr-1 inline" />}
                    {type === "Follow-up 2" && <Calendar className="w-3 h-3 mr-1 inline" />}
                    {type === "Final Follow-up" && <Calendar className="w-3 h-3 mr-1 inline" />}
                    {type === "Breakup Email" && <Calendar className="w-3 h-3 mr-1 inline" />}
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {/* Candidate Name */}
              <div>
                <label className="block text-sm font-jakarta font-medium text-white mb-2">
                  Candidate Name
                </label>
                <input
                  type="text"
                  value={formData.candidateName}
                  onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-supernova focus:border-transparent text-white font-jakarta"
                  placeholder="Enter candidate's first name"
                />
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-jakarta font-medium text-white mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-supernova focus:border-transparent text-white font-jakarta"
                  placeholder="Enter company name"
                />
              </div>

              {/* Role Title */}
              <div>
                <label className="block text-sm font-jakarta font-medium text-white mb-2">
                  Role Title
                </label>
                <input
                  type="text"
                  value={formData.roleTitle}
                  onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-supernova focus:border-transparent text-white font-jakarta"
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>

              {/* Skill/Technology */}
              <div>
                <label className="block text-sm font-jakarta font-medium text-white mb-2">
                  Skill/Technology
                </label>
                <input
                  type="text"
                  value={formData.skillTechnology}
                  onChange={(e) => setFormData({ ...formData, skillTechnology: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-supernova focus:border-transparent text-white font-jakarta"
                  placeholder="e.g., React, Python, Sales, Marketing"
                />
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-jakarta font-medium text-white mb-2">
                  Industry
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-supernova focus:border-transparent text-white font-jakarta"
                >
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              {/* Tone */}
              <div>
                <label className="block text-sm font-jakarta font-medium text-white mb-2">
                  Tone
                </label>
                <select
                  value={formData.tone}
                  onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-supernova focus:border-transparent text-white font-jakarta"
                >
                  {tones.map((tone) => (
                    <option key={tone} value={tone}>{tone}</option>
                  ))}
                </select>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-jakarta font-medium text-white mb-2">
                  Experience Level
                </label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-supernova focus:border-transparent text-white font-jakarta"
                >
                  {experienceLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Current Company */}
              <div>
                <label className="block text-sm font-jakarta font-medium text-white mb-2">
                  Candidate's Current Company <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.currentCompany}
                  onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-supernova focus:border-transparent text-white font-jakarta"
                  placeholder="e.g., Google, Microsoft"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="space-y-8">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-anton text-2xl text-white">
                {platform === 'email' ? 'EMAIL' : 'LINKEDIN'} PREVIEW
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('preview')}
                  className={`px-4 py-2 rounded-lg font-jakarta font-bold transition-all duration-200 flex items-center ${
                    viewMode === 'preview'
                      ? 'bg-supernova text-shadowforce'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </button>
                <button
                  onClick={() => setViewMode('template')}
                  className={`px-4 py-2 rounded-lg font-jakarta font-bold transition-all duration-200 flex items-center ${
                    viewMode === 'template'
                      ? 'bg-supernova text-shadowforce'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  <Code className="w-4 h-4 mr-2" />
                  Template
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Subject Line (Email only) */}
              {platform === 'email' && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-jakarta font-medium text-white">
                      Subject Line ({getCharacterCount(template.subject)} chars)
                    </label>
                    <button
                      onClick={() => refreshSection('subject')}
                      className="text-gray-400 hover:text-supernova transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
                    <p className="text-white font-jakarta text-sm">
                      {fillVariables(template.subject)}
                    </p>
                  </div>
                </div>
              )}

              {/* Opening */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-jakarta font-medium text-white">Opening</label>
                  <button
                    onClick={() => refreshSection('opening')}
                    className="text-gray-400 hover:text-supernova transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
                  <p className="text-white font-jakarta text-sm">
                    {fillVariables(template.opening)}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-jakarta font-medium text-white">Body</label>
                  <button
                    onClick={() => refreshSection('body')}
                    className="text-gray-400 hover:text-supernova transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
                  <p className="text-white font-jakarta text-sm whitespace-pre-line">
                    {fillVariables(template.body)}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-jakarta font-medium text-white">Call to Action</label>
                  <button
                    onClick={() => refreshSection('cta')}
                    className="text-gray-400 hover:text-supernova transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
                  <p className="text-white font-jakarta text-sm">
                    {fillVariables(template.cta)}
                  </p>
                </div>
              </div>

              {/* Copy Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => copyToClipboard(getFullMessage(), 'full')}
                  className="flex-1 bg-supernova hover:bg-yellow-400 text-shadowforce font-jakarta font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copied === 'full' ? 'Copied!' : `Copy Full ${platform === 'email' ? 'Email' : 'Message'}`}
                </button>
                {platform === 'email' && (
                  <button
                    onClick={() => copyToClipboard(fillVariables(template.subject), 'subject')}
                    className="bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white font-jakarta font-bold py-3 px-4 rounded-lg transition-colors flex items-center"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {copied === 'subject' ? 'Copied!' : 'Subject Only'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Platform-specific Integration Info */}
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-600/30 p-6">
            <div className="flex items-center mb-4">
              <Zap className="w-6 h-6 text-supernova mr-3" />
              <h3 className="font-jakarta font-bold text-white">
                {platform === 'email' ? 'Email Sequence Tips' : 'LinkedIn Tips'}
              </h3>
            </div>
            {platform === 'email' ? (
              <>
                <p className="text-gray-300 font-jakarta text-sm mb-4">
                  This email is part of a {formData.sequenceType.toLowerCase()} sequence. Switch to "Template" mode to copy the raw template with variables for pasting into email automation tools.
                </p>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-400 font-jakarta text-xs">
                    Variables: {'{company_name}'}, {'{role_title}'}, {'{first_name}'}, {'{current_company}'}, {'{skill}'}, {'{industry}'}
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-300 font-jakarta text-sm mb-4">
                  LinkedIn messages are optimized for brevity and engagement. This message is part of a {formData.sequenceType.toLowerCase()} sequence.
                </p>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-400 font-jakarta text-xs">
                    Tip: Connection requests have a 300-character limit. Initial outreach messages should be shorter for connection requests.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}