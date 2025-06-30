import React, { useState, useCallback } from 'react';
import { Copy, RefreshCw, Shuffle, Eye, Code, Mail, MessageSquare, Zap } from 'lucide-react';

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
}

const industries = [
  'Tech', 'Finance', 'Healthcare', 'Marketing', 'Sales', 'Consulting', 
  'Manufacturing', 'Education', 'Real Estate', 'Legal', 'Media', 'Retail'
];

const tones = ['Professional', 'Casual', 'Direct', 'Friendly'];
const experienceLevels = ['Junior', 'Mid-Level', 'Senior', 'Executive'];

// Email Templates
const emailSubjectTemplates = [
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
];

// LinkedIn Message Templates (shorter, more conversational)
const linkedinSubjectTemplates = [
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
];

const emailOpeningTemplates = {
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
};

// LinkedIn openings (more casual, shorter)
const linkedinOpeningTemplates = {
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
};

const emailBodyTemplates = {
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
};

// LinkedIn body templates (much shorter)
const linkedinBodyTemplates = {
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
};

const emailCtaTemplates = [
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
];

const linkedinCtaTemplates = [
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
];

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
    currentCompany: ''
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
    
    const subjectTemplates = isEmail ? emailSubjectTemplates : linkedinSubjectTemplates;
    const openingTemplates = isEmail ? emailOpeningTemplates : linkedinOpeningTemplates;
    const bodyTemplates = isEmail ? emailBodyTemplates : linkedinBodyTemplates;
    const ctaTemplates = isEmail ? emailCtaTemplates : linkedinCtaTemplates;
    
    const industryOpenings = openingTemplates[formData.industry as keyof typeof openingTemplates] || openingTemplates.default;
    const toneBodyTemplates = bodyTemplates[formData.tone as keyof typeof bodyTemplates] || bodyTemplates.Professional;

    setTemplate({
      subject: getRandomItem(subjectTemplates),
      opening: getRandomItem(industryOpenings),
      body: getRandomItem(toneBodyTemplates),
      cta: getRandomItem(ctaTemplates)
    });
  }, [formData, platform]);

  const refreshSection = (section: keyof CopyTemplate) => {
    const isEmail = platform === 'email';
    
    const subjectTemplates = isEmail ? emailSubjectTemplates : linkedinSubjectTemplates;
    const openingTemplates = isEmail ? emailOpeningTemplates : linkedinOpeningTemplates;
    const bodyTemplates = isEmail ? emailBodyTemplates : linkedinBodyTemplates;
    const ctaTemplates = isEmail ? emailCtaTemplates : linkedinCtaTemplates;
    
    const industryOpenings = openingTemplates[formData.industry as keyof typeof openingTemplates] || openingTemplates.default;
    const toneBodyTemplates = bodyTemplates[formData.tone as keyof typeof bodyTemplates] || bodyTemplates.Professional;

    const newTemplate = { ...template };
    
    switch (section) {
      case 'subject':
        newTemplate.subject = getRandomItem(subjectTemplates);
        break;
      case 'opening':
        newTemplate.opening = getRandomItem(industryOpenings);
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

  React.useEffect(() => {
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
                {platform === 'email' ? 'Email Integration' : 'LinkedIn Tips'}
              </h3>
            </div>
            {platform === 'email' ? (
              <>
                <p className="text-gray-300 font-jakarta text-sm mb-4">
                  Switch to "Template" mode to copy the raw template with variables for pasting directly into email automation tools.
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
                  LinkedIn messages are optimized for brevity and engagement. Character limits apply for connection requests.
                </p>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-400 font-jakarta text-xs">
                    Tip: Connection requests have a 300-character limit. Use shorter versions for initial outreach.
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