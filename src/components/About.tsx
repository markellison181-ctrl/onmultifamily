'use client'

import React from 'react'
import Image from 'next/image'

const About = () => {
  return (
    <section className="section-light">
      <div className="container-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          {/* Team Photo */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <Image
                src="/images/team/team-group.jpg"
                alt="Ontario Multifamily Advisory Team"
                width={800}
                height={1000}
                className="photo-editorial rounded-none shadow-2xl"
                priority
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-8 shadow-xl max-w-xs">
                <div className="text-4xl font-serif text-colliers-blue-dark mb-2">$1.12B+</div>
                <div className="text-sm text-colliers-gray-80 uppercase tracking-wide">
                  Completed Transactions
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="gold-line mb-8"></div>
            
            <h2 className="heading-lg text-colliers-blue-dark mb-12">
              Institutional rigour meets deep market intelligence
            </h2>

            <div className="space-y-8 mb-16">
              <p className="body-xl text-colliers-gray-80 leading-relaxed">
                We are a specialist advisory team within Colliers, focused exclusively on multifamily investment sales across Ontario. Our approach combines institutional rigour with deep market intelligence to deliver exceptional outcomes for apartment building owners.
              </p>

              <p className="body-lg text-colliers-gray-80 leading-relaxed">
                Since 2018, our team has completed over $1.12 billion in multifamily transactions across 47 Ontario municipalities. We maintain an 81% closing rate by focusing on sophisticated marketing, comprehensive market analysis, and strategic buyer cultivation.
              </p>

              <p className="body-lg text-colliers-gray-80 leading-relaxed">
                Our weekly newsletter reaches 14,000+ multifamily professionals, providing market intelligence that drives informed investment decisions across the province.
              </p>
            </div>

            {/* Dayma Quote Card */}
            <div className="bg-gray-50 p-12 border-l-4 border-colliers-gold">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <Image
                    src="/images/team/dayma.png"
                    alt="Dayma Itamunoala"
                    width={80}
                    height={80}
                    className="rounded-full grayscale"
                  />
                </div>
                <div>
                  <blockquote className="body-lg text-colliers-blue-dark italic mb-4 leading-relaxed">
                    "Every building has a story. Our job is to understand that story deeply enough to present it to the right buyer at the right time. That's how we consistently exceed market expectations."
                  </blockquote>
                  <div className="text-sm text-colliers-gray-80">
                    <div className="font-semibold">Dayma Itamunoala</div>
                    <div>Vice President, Team Leader</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About