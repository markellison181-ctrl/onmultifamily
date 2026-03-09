'use client'

import React from 'react'
import { Mail, Linkedin, Award, Users } from 'lucide-react'
import teamData from '@/data/team.json'

interface TeamMember {
  id: string
  name: string
  title: string
  company: string
  bio: string
  email: string
  linkedin: string
  image: string
  order: number
}

const Team = () => {
  const teamMembers = (teamData as TeamMember[]).sort((a, b) => a.order - b.order)

  const generateAvatar = (name: string) => {
    const initials = name.split(' ').map(n => n[0]).join('')
    const colors = [
      'bg-gradient-to-br from-colliers-blue to-colliers-light-blue',
      'bg-gradient-to-br from-colliers-light-blue to-colliers-blue',
      'bg-gradient-to-br from-colliers-blue-dark to-colliers-blue',
      'bg-gradient-to-br from-colliers-blue to-blue-400',
      'bg-gradient-to-br from-blue-500 to-colliers-light-blue'
    ]
    const colorIndex = name.length % colors.length
    return { initials, colorClass: colors[colorIndex] }
  }

  return (
    <section id="team" className="section-padding bg-white">
      <div className="container-width">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-colliers-blue/10 px-4 py-2 rounded-full mb-6">
            <Users className="w-5 h-5 text-colliers-blue" />
            <span className="text-colliers-blue font-medium text-sm">Our Team</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-colliers-blue-dark mb-6">
            Meet Ontario's Leading Multifamily Team
          </h2>
          
          <p className="text-xl text-colliers-gray-80 max-w-4xl mx-auto mb-12 leading-relaxed">
            Our institutional approach to multifamily advisory combines deep market knowledge, 
            extensive buyer networks, and proven transaction execution. Every team member brings 
            specialized expertise to deliver exceptional outcomes for our clients.
          </p>

          {/* Team Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-colliers-blue mb-2">$1.12B+</div>
              <div className="text-colliers-gray-80 text-sm">Transactions Closed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-colliers-blue mb-2">81%</div>
              <div className="text-colliers-gray-80 text-sm">Closing Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-colliers-blue mb-2">3,000+</div>
              <div className="text-colliers-gray-80 text-sm">Units Sold</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-colliers-blue mb-2">14,000+</div>
              <div className="text-colliers-gray-80 text-sm">Newsletter Subscribers</div>
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => {
            const avatar = generateAvatar(member.name)
            return (
              <div
                key={member.id}
                className="bg-white rounded-2xl shadow-lg border border-colliers-gray-10 overflow-hidden card-hover"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Member Header */}
                <div className="p-8 pb-6">
                  <div className="flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className={`w-24 h-24 rounded-full ${avatar.colorClass} flex items-center justify-center mb-6`}>
                      <span className="text-white text-2xl font-bold">{avatar.initials}</span>
                    </div>
                    
                    {/* Name and Title */}
                    <h3 className="text-2xl font-bold text-colliers-blue-dark mb-2">
                      {member.name}
                    </h3>
                    <div className="text-colliers-blue font-semibold mb-1">
                      {member.title}
                    </div>
                    <div className="text-colliers-gray-80 text-sm mb-6">
                      {member.company}
                    </div>

                    {/* Leader Badge for Dayma */}
                    {member.order === 1 && (
                      <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                        <Award className="w-4 h-4" />
                        <span>Team Leader</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Member Bio */}
                <div className="px-8 pb-6">
                  <p className="text-colliers-gray-80 text-sm leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  {/* Contact Links */}
                  <div className="flex items-center justify-center space-x-4">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center space-x-2 text-colliers-blue hover:text-colliers-blue-dark transition-colors duration-200"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-sm font-medium">Email</span>
                    </a>
                    <a
                      href={member.linkedin}
                      className="flex items-center space-x-2 text-colliers-blue hover:text-colliers-blue-dark transition-colors duration-200"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span className="text-sm font-medium">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Institutional Approach Section */}
        <div className="bg-gradient-to-r from-colliers-pale-blue to-white rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-colliers-blue-dark mb-6">
              Our Institutional Approach
            </h3>
            
            <p className="text-lg text-colliers-gray-80 mb-8 leading-relaxed">
              We don't just list properties—we provide comprehensive advisory services that maximize 
              value for multifamily owners and investors across Ontario. Our approach combines 
              institutional-grade marketing, extensive buyer networks, and sophisticated transaction management.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="text-center">
                <div className="w-16 h-16 bg-colliers-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-colliers-blue" />
                </div>
                <h4 className="text-xl font-bold text-colliers-blue-dark mb-3">Market Leadership</h4>
                <p className="text-colliers-gray-80 text-sm leading-relaxed">
                  Ontario's most active multifamily team with unmatched transaction volume and market intelligence.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-colliers-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-colliers-blue" />
                </div>
                <h4 className="text-xl font-bold text-colliers-blue-dark mb-3">Institutional Networks</h4>
                <p className="text-colliers-gray-80 text-sm leading-relaxed">
                  Direct relationships with REITs, pension funds, private equity, and high-net-worth investors.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-colliers-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-colliers-blue" />
                </div>
                <h4 className="text-xl font-bold text-colliers-blue-dark mb-3">Market Intelligence</h4>
                <p className="text-colliers-gray-80 text-sm leading-relaxed">
                  Weekly market briefings to 14,000+ professionals and exclusive research and analysis.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-colliers-gray-10">
              <blockquote className="text-lg text-colliers-blue-dark italic mb-4 leading-relaxed">
                "Our success isn't measured just by transactions closed, but by the long-term relationships 
                we build with multifamily owners and investors across Ontario. We're committed to being 
                your trusted advisor for every stage of your multifamily investment journey."
              </blockquote>
              <div className="text-colliers-blue font-semibold">
                — Dayma Itamunoala, SVP, Head of Multifamily (Ontario)
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-colliers-blue-dark mb-4">
            Ready to Work with Ontario's Leading Team?
          </h3>
          <p className="text-colliers-gray-80 mb-8">
            Whether you're buying, selling, or looking for market intelligence, 
            our team is here to provide expert guidance and exceptional results.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#valuation-form" className="btn-primary">
              Get Free Property Valuation
            </a>
            <a href="#contact" className="btn-secondary">
              Schedule a Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team