import React from 'react';
import { ArrowRight, Star, CheckCircle, Zap, Crown, Users } from 'lucide-react';

export default function MoreHelp() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-supernova to-yellow-400 rounded-2xl p-8 text-shadowforce text-center">
        <Crown className="w-16 h-16 mx-auto mb-4" />
        <h1 className="font-anton text-4xl mb-2">MORE HELP</h1>
        <p className="font-jakarta text-lg opacity-80">
          Take your recruiting to the next level with our premium services
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Candidate Sourcing Service */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-anton text-2xl mb-2">Candidates on Calendar</h3>
                <p className="font-jakarta opacity-90">We find the candidates, you close the deals</p>
              </div>
              <Zap className="w-12 h-12 opacity-60" />
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-white font-jakarta">$999</span>
                <span className="text-gray-400 font-jakarta ml-2">/month + 5%</span>
              </div>
              <p className="text-sm text-gray-400 font-jakarta mt-1">Plus 5% of successful placements</p>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                '50+ qualified candidates per month',
                'Multi-channel sourcing (LinkedIn, GitHub, etc.)',
                'Pre-screened and qualified prospects',
                'Detailed candidate profiles and contact info',
                'Weekly delivery reports',
                'Dedicated sourcing specialist'
              ].map((feature, index) => (
                <li key={index} className="flex items-center font-jakarta text-sm text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <a 
              href="https://calendly.com/superrecruiter/outboundcandidatepipelines" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-jakarta font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
            >
              Upgrade to Sourcing Service
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>

        {/* Done-For-You Consulting */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden relative">
          {/* Popular Badge */}
          <div className="absolute top-4 right-4 bg-supernova text-shadowforce px-3 py-1 rounded-full text-xs font-bold z-10">
            MOST POPULAR
          </div>
          
          <div className="bg-gradient-to-r from-supernova to-yellow-400 p-6 text-shadowforce">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-anton text-2xl mb-2">Candidates Screened & Verified</h3>
                <p className="font-jakarta opacity-90">We handle everything</p>
              </div>
              <Crown className="w-12 h-12 opacity-60" />
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-white font-jakarta">$5,500</span>
                <span className="text-gray-400 font-jakarta ml-2">/month + 5%</span>
              </div>
              <p className="text-sm text-gray-400 font-jakarta mt-1">Plus 5% of successful placements</p>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                'Full-service recruitment management',
                'End-to-end hiring process handling',
                'Direct client communication',
                'Interview coordination and scheduling',
                'Offer negotiation and closing',
                'White-label service under your brand'
              ].map((feature, index) => (
                <li key={index} className="flex items-center font-jakarta text-sm text-gray-300">
                  <Star className="w-5 h-5 text-supernova mr-3 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <a 
              href="https://calendly.com/superrecruiter/outboundcandidatepipelines" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-supernova hover:bg-yellow-400 text-shadowforce font-jakarta font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
            >
              Apply for Done-For-You
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8">
        <h2 className="font-anton text-2xl text-center mb-8 text-white">Success Stories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/30">
            <div className="flex flex-col">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-supernova mr-1" fill="#FFCF00" />
                ))}
              </div>
              <p className="font-jakarta text-sm text-gray-300 italic mb-6">
                "We filled two roles in five weeks – without ever touching a staffing agency. Total game-changer for an early startup like ours."
              </p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 bg-supernova rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-shadowforce" />
                </div>
                <div>
                  <h4 className="font-jakarta font-bold text-white">Leo Fernandez</h4>
                  <p className="text-gray-400 text-sm">COO</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/30">
            <div className="flex flex-col">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-supernova mr-1" fill="#FFCF00" />
                ))}
              </div>
              <p className="font-jakarta text-sm text-gray-300 italic mb-6">
                "We used the scorecard and interview bot to hire people we were actually excited about. The toolkit gave us structure we didn't even realize we were missing."
              </p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 bg-supernova rounded-full flex items-center justify-center mr-4">
                  <Crown className="w-6 h-6 text-shadowforce" />
                </div>
                <div>
                  <h4 className="font-jakarta font-bold text-white">Jamie Patel</h4>
                  <p className="text-gray-400 text-sm">Co-Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8">
        <h2 className="font-anton text-2xl text-white mb-6 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-jakarta font-bold text-white mb-2">How quickly can I see results?</h3>
            <p className="text-gray-400 font-jakarta text-sm">
              Sourcing service: First candidates within 48 hours. Done-for-you: First placements within 2-3 weeks.
            </p>
          </div>
          
          <div>
            <h3 className="font-jakarta font-bold text-white mb-2">Can I cancel anytime?</h3>
            <p className="text-gray-400 font-jakarta text-sm">
              Yes, both services are month-to-month with no long-term contracts. Cancel with 30 days notice.
            </p>
          </div>
          
          <div>
            <h3 className="font-jakarta font-bold text-white mb-2">What industries do you specialize in?</h3>
            <p className="text-gray-400 font-jakarta text-sm">
              We focus on tech, sales, marketing, and executive roles across all industries. Custom specialization available.
            </p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center py-12">
        <h2 className="font-anton text-2xl text-white mb-3">Ready to Scale Your Recruiting?</h2>
        <p className="font-jakarta text-gray-400 mb-8 text-lg">
          Let's discuss which service is the best fit for your business goals
        </p>
        <a 
          href="https://calendly.com/superrecruiter/outboundcandidatepipelines" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-supernova hover:bg-yellow-400 text-shadowforce font-jakarta font-bold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg inline-block"
        >
          Schedule Free Consultation
        </a>
      </div>
    </div>
  );
}