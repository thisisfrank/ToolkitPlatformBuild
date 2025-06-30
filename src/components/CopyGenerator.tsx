import React, { useState, useCallback, useEffect } from 'react';
import { Copy, RefreshCw, Eye, Code, Mail, MessageSquare } from 'lucide-react';

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

interface EmailTemplate {
  subject: string;
  opening: string;
  body: string;
  cta: string;
}

const industries = [
  'Tech', 'Finance', 'Healthcare', 'Marketing', 'Sales', 'Consulting', 
  'Manufacturing', 'Education', 'Real Estate', 'Legal'
];

const tones = ['Professional', 'Casual', 'Direct', 'Friendly'];
const experienceLevels = ['Junior', 'Mid-Level', 'Senior', 'Executive'];

// Simplified template data
const subjectTemplates = [
  "{company_name} is hiring - your {role_title} expertise?",
  "Quick question about your {skill} background",
  "{role_title} opportunity at {company_name}",
  "Impressed by your work at {current_company}",
  "Perfect {role_title} role for someone with your background"
];

const openingTemplates = {
  default: [
    "Hi {first_name}, your experience at {current_company} caught my attention.",
    "Hi {first_name}, saw your background in {industry} and was impressed.",
    "Hi {first_name}, your {skill} expertise at {current_company} is exactly what we're looking for.",
    "Hi {first_name}, your professional background aligns perfectly with an opportunity I have."
  ]
};

const bodyTemplates = {
  Professional: [
    "I'm working with {company_name}, a {industry} company that's scaling rapidly. They're looking for a {role_title} who can {skill} and drive results.\n\nThe role offers competitive compensation, equity upside, and the opportunity to shape the direction of a growing team.\n\nWould you be open to a brief conversation to learn more?"
  ],
  Casual: [
    "Hope you're doing well! I came across your profile and thought you might be interested in what {company_name} is building in the {industry} space.\n\nThey're looking for a {role_title} and your {skill} experience at {current_company} seems like a perfect fit.\n\nWant to hop on a quick call to chat about it?"
  ],
  Direct: [
    "{company_name} needs a {role_title}. Your {skill} experience at {current_company} makes you an ideal candidate.\n\nCompensation: Competitive base + equity\nStart date: Flexible\n\nInterested in learning more?"
  ],
  Friendly: [
    "I hope this message finds you well! I've been following your career journey and I'm really impressed by what you've accomplished at {current_company}.\n\n{company_name} is building something special in the {industry} space, and they're looking for a {role_title} who shares their vision.\n\nI'd love to connect you with the team if you're open to exploring new opportunities!"
  ]
};

const ctaTemplates = [
  "Are you available for a brief 15-minute call this week?",
  "Would you be open to a quick conversation?",
  "Can we schedule a brief call to discuss?",
  "Interested in learning more? Let's connect."
];

export default function CopyGenerator() {
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

  const [template, setTemplate] = useState<EmailTemplate>({
    subject: '',
    opening: '',
    body: '',
    cta: ''
  });

  const [viewMode, setViewMode] = useState<'preview' | 'template'>('preview');
  const [copied, setCopied] = useState<string | null>(null);
  const [platform, setPlatform] = useState<'email' | 'linkedin'>('email');

  const getRandomItem = (array: string[]) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const generateTemplate = useCallback(() => {
    const industryOpenings = openingTemplates.default;
    const toneBodyTemplates = bodyTemplates[formData.tone as keyof typeof bodyTemplates] || bodyTemplates.Professional;

    setTemplate({
      subject: getRandomItem(subjectTemplates),
      opening: getRandomItem(industryOpenings),
      body: getRandomItem(toneBodyTemplates),
      cta: getRandomItem(ctaTemplates)
    });
  }, [formData]);

  const refreshSection = (section: keyof EmailTemplate) => {
    const industryOpenings = openingTemplates.default;
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

  const getFullEmail = () => {
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
          Create personalized recruiting outreach messages for email and LinkedIn
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form Section */}
        <div className="space-y-8">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-anton text-2xl text-white">CUSTOMIZE MESSAGE</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => setPlatform('email')}
                  className={`px-4 py-2 rounded-lg font-jakarta font-bold transition-all duration-200 flex items-center ${
                    platform === 'email'
                      ? 'bg-supernova text-shadowforce'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </button>
                <button
                  onClick={() => setPlatform('linkedin')}
                  className={`px-4 py-2 rounded-lg font-jakarta font-bold transition-all duration-200 flex items-center ${
                    platform === 'linkedin'
                      ? 'bg-supernova text-shadowforce'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
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
              <h2 className="font-anton text-2xl text-white">MESSAGE PREVIEW</h2>
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
              {/* Subject Line - Only show for email */}
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
                  onClick={() => copyToClipboard(getFullEmail(), 'full')}
                  className="flex-1 bg-supernova hover:bg-yellow-400 text-shadowforce font-jakarta font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copied === 'full' ? 'Copied!' : 'Copy Full Message'}
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

          {/* Template Variables Info */}
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-600/30 p-6">
            <h3 className="font-jakarta font-bold text-white mb-4">Template Variables</h3>
            <p className="text-gray-300 font-jakarta text-sm mb-4">
              Switch to "Template" mode to copy the raw template with variables for reuse.
            </p>
            <div className="bg-gray-800/50 rounded-lg p-3">
              <p className="text-gray-400 font-jakarta text-xs">
                Variables: {'{company_name}'}, {'{role_title}'}, {'{first_name}'}, {'{current_company}'}, {'{skill}'}, {'{industry}'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}