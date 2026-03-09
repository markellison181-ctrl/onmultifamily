'use client'

import React, { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Building2, TrendingUp, Users } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    propertyType: '',
    timeline: '',
    message: '',
    interests: [] as string[]
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const interests = [
    'Selling my property',
    'Market valuation',
    'Buying opportunities', 
    'Market intelligence',
    'CMHC financing',
    'Portfolio optimization'
  ]

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our team',
      value: 'Available through Colliers Toronto',
      action: 'tel:+14165559999'
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Get a response within 24 hours',
      value: 'dayma.itamunoala@colliers.com',
      action: 'mailto:dayma.itamunoala@colliers.com'
    },
    {
      icon: MapPin,
      title: 'Visit Our Office',
      description: 'Meet us in person',
      value: 'Colliers Toronto Office',
      action: '#'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      description: 'When we\'re available',
      value: 'Monday - Friday, 9:00 AM - 6:00 PM ET',
      action: '#'
    }
  ]

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-colliers-pale-blue to-white">
      <div className="container-width">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-colliers-blue/10 px-4 py-2 rounded-full mb-6">
            <Mail className="w-5 h-5 text-colliers-blue" />
            <span className="text-colliers-blue font-medium text-sm">Get in Touch</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-colliers-blue-dark mb-6">
            Let's Discuss Your Multifamily Goals
          </h2>
          
          <p className="text-xl text-colliers-gray-80 max-w-4xl mx-auto mb-12 leading-relaxed">
            Whether you're looking to sell, buy, or simply understand your property's value in today's market, 
            our team is here to provide expert guidance and actionable insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-colliers-blue-dark mb-4">
                Schedule Your Consultation
              </h3>
              <p className="text-colliers-gray-80">
                Tell us about your property and goals. We'll respond within 24 hours with next steps.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-colliers-blue-dark mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-colliers-gray-10 rounded-lg focus:ring-2 focus:ring-colliers-blue focus:border-transparent"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-colliers-blue-dark mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-colliers-gray-10 rounded-lg focus:ring-2 focus:ring-colliers-blue focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-colliers-blue-dark mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-colliers-gray-10 rounded-lg focus:ring-2 focus:ring-colliers-blue focus:border-transparent"
                    placeholder="(416) 555-0123"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-colliers-blue-dark mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-colliers-gray-10 rounded-lg focus:ring-2 focus:ring-colliers-blue focus:border-transparent"
                    placeholder="ABC Holdings Inc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-colliers-blue-dark mb-2">
                    Property Type
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-colliers-gray-10 rounded-lg focus:ring-2 focus:ring-colliers-blue focus:border-transparent"
                  >
                    <option value="">Select property type</option>
                    <option value="apartment-building">Apartment Building</option>
                    <option value="seniors-housing">Seniors Housing</option>
                    <option value="student-housing">Student Housing</option>
                    <option value="portfolio">Portfolio (Multiple Properties)</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-colliers-blue-dark mb-2">
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-colliers-gray-10 rounded-lg focus:ring-2 focus:ring-colliers-blue focus:border-transparent"
                  >
                    <option value="">Select timeline</option>
                    <option value="immediate">Ready now</option>
                    <option value="3-months">Within 3 months</option>
                    <option value="6-months">Within 6 months</option>
                    <option value="1-year">Within 1 year</option>
                    <option value="exploring">Just exploring</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-colliers-blue-dark mb-3">
                  I'm interested in: (check all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {interests.map((interest, index) => (
                    <label key={index} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        className="rounded border-colliers-gray-10 text-colliers-blue focus:ring-colliers-blue"
                      />
                      <span className="text-sm text-colliers-blue-dark">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-colliers-blue-dark mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-colliers-gray-10 rounded-lg focus:ring-2 focus:ring-colliers-blue focus:border-transparent"
                  placeholder="Tell us about your property, goals, or any specific questions you have..."
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center space-x-2 py-4"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>

              {submitted && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <div className="flex items-center justify-center space-x-2 text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Message sent successfully! We'll be in touch within 24 hours.</span>
                  </div>
                </div>
              )}

              <p className="text-xs text-colliers-gray-80 text-center leading-relaxed">
                By submitting this form, you consent to receive communications from our team. 
                You can unsubscribe at any time. We respect your privacy and will never share your information.
              </p>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div>
              <h3 className="text-2xl font-bold text-colliers-blue-dark mb-6">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl shadow-lg p-6 card-hover"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-colliers-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-colliers-blue" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-colliers-blue-dark mb-1">{method.title}</h4>
                          <p className="text-colliers-gray-80 text-sm mb-2">{method.description}</p>
                          {method.action.startsWith('mailto:') || method.action.startsWith('tel:') ? (
                            <a
                              href={method.action}
                              className="text-colliers-blue hover:text-colliers-blue-dark font-semibold transition-colors duration-200"
                            >
                              {method.value}
                            </a>
                          ) : (
                            <span className="text-colliers-blue-dark font-semibold">{method.value}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-colliers-blue-dark mb-6">
                Why Choose Our Team?
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-colliers-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-colliers-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold text-colliers-blue-dark mb-1">Proven Track Record</h4>
                    <p className="text-colliers-gray-80 text-sm">Over $1.12B in transactions with 81% closing success rate across Ontario.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-colliers-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-colliers-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold text-colliers-blue-dark mb-1">Institutional Networks</h4>
                    <p className="text-colliers-gray-80 text-sm">Direct access to REITs, pension funds, and qualified private investors.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-colliers-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-colliers-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold text-colliers-blue-dark mb-1">Market Leadership</h4>
                    <p className="text-colliers-gray-80 text-sm">Ontario's most active multifamily team with comprehensive market intelligence.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick CTA */}
            <div className="bg-gradient-to-r from-colliers-blue to-colliers-light-blue rounded-2xl p-8 text-white text-center">
              <h3 className="text-xl font-bold mb-3">
                Ready for a Quick Chat?
              </h3>
              <p className="text-colliers-gray-10 mb-6">
                Sometimes a 5-minute conversation can answer all your questions.
              </p>
              <a
                href="#valuation-form"
                className="bg-white text-colliers-blue hover:bg-colliers-gray-10 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-block"
              >
                Get Free Property Valuation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact