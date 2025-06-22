'use client';
import React, { useEffect, useState, ReactNode } from 'react';

type Contact = {
  phone?: string;
  email?: string;
  hours?: string;
};

type Pricing = {
  headline: string;
  description: string;
  defaultContacts?: number;
  pricePerContact: number; // Add this to your JSON
};

type ConnectMoreData = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  contact?: Contact;
  pricing?: Pricing;
};

type TopSectionProps = {
  jsonPath: string;
  customButton?: ReactNode;
};

function TopSectionPages({ jsonPath, customButton }: TopSectionProps) {
  const [data, setData] = useState<ConnectMoreData | null>(null);
  const [contactCount, setContactCount] = useState(1);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    fetch(jsonPath)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        if (json?.pricing?.defaultContacts) {
          setContactCount(json.pricing.defaultContacts);
        }
      })
      .catch((err) => console.error('Failed to fetch section data:', err));
  }, [jsonPath]);

  if (!data) return null;

  const { title, subtitle, buttonText, buttonLink, contact, pricing } = data;

  const unitPrice = pricing?.pricePerContact || 0;
  const monthlyPrice = contactCount * unitPrice;
  const yearlyPrice = monthlyPrice * 12 * 0.9; // 10% discount

  return (
    <section className="w-full py-20 bg-white flex justify-center">
      <div className="w-full max-w-4xl px-6 space-y-10 text-center">

        {/* Title */}
        {title && (
          <div>
            <h2 className="text-[40px] font-medium text-[#020318] whitespace-pre-line">{title}</h2>
            {subtitle && <p className="mt-2 text-[#020318] text-[18px]">{subtitle}</p>}
            {buttonText && buttonLink && (
              <a
                href={buttonLink}
                className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                {buttonText}
              </a>
            )}
          </div>
        )}

        {/* Custom Button */}
        {customButton && <div className="mt-6">{customButton}</div>}

        {/* Contact Section */}
        {contact && (
          <div className="flex flex-col md:flex-row justify-center gap-6 mt-6">
            {contact.phone && (
              <div className="flex items-center gap-3 px-6 py-3 border rounded-md shadow-sm cursor-pointer">
                <span className="text-green-600 text-xl">📞</span>
                <span className="text-base text-green-600">{contact.phone}</span>
              </div>
            )}
            {contact.email && (
              <div className="flex items-center gap-3 px-6 py-3 border rounded-md shadow-sm cursor-pointer">
                <span className="text-green-600 text-xl">📧</span>
                <span className="text-base text-green-600">{contact.email}</span>
              </div>
            )}
          </div>
        )}
        {contact?.hours && (
          <p className="text-center text-black mt-4">{contact.hours}</p>
        )}

        {/* Pricing Section */}
        {pricing && (
          <div className="w-full max-w-4xl mx-auto space-y-6 text-left">

            {/* Headline + Description */}
            <div className="text-center flex justify-between">
               <label className="text-sm font-medium text-gray-800 mb-1 ">
                 Pricing
                </label>
              <label className="text-sm font-medium text-gray-800 mb-1 ">
                 How many contacts do you have?
                </label>
            </div>

            {/* Slider & Value */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-6">
              <div className="w-full md:w-1/2">
               
                <input
                  type="range"
                  min={1}
                  max={10000}
                  value={contactCount}
                  onChange={(e) => setContactCount(Number(e.target.value))}
                  className="w-full h-2 appearance-none rounded-lg accent-green-600"
                />
              </div>
              <div className="w-full md:w-1/2 text-right">
                <p className="text-sm font-medium text-gray-800 mb-1">
                  Contacts: <span className="text-black font-semibold">{contactCount}</span>
                </p>
                <p className="text-lg font-semibold text-green-700">
                  ₹{billingCycle === 'monthly'
                    ? monthlyPrice.toFixed(2)
                    : yearlyPrice.toFixed(2)}{' '}
                  / {billingCycle}
                </p>
              </div>
            </div>


            {/* Free Trial Button */}
            <div className="flex justify-center mt-6">
              <button className="bg-green-600 text-white px-8 py-3 rounded-md font-medium hover:bg-green-700 transition w-full md:w-auto">
                {buttonText || 'Start Your Free Trial'}
              </button>
            </div>

            {/* Billing Cycle Toggle */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  billingCycle === 'monthly'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Pay Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-full font-medium flex items-center gap-2 transition ${
                  billingCycle === 'yearly'
                    ? 'bg-green-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700'
                }`}
              >
                Pay Yearly
                <span className="bg-gray-100 text-green-600 text-xs px-2 py-0.5 rounded-full">Save 10%</span>
              </button>
            </div>

            
          </div>
        )}
      </div>
    </section>
  );
}

export default TopSectionPages;
