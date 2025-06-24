'use client';
import React, { useEffect, useState, ReactNode } from 'react';

 import Image from 'next/image';
type Contact = {
  phone?: string;
  phoneIcon?: string; // now a URL
  email?: string;
  emailIcon?: string; // now a URL
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
    <section className="relative w-full py-20  flex justify-center my-5 bg-white ">
        {/*background animation  */}
       <div
              className="absolute pointer-events-none inset-0 bg-[url('/bodyicon.png')] bg-repeat opacity-5 "
              style={{ backgroundSize: '30px 30px' }}
            />  

      <div className="w-full max-w-4xl px-6 space-y-10 text-center">
     
        {/* Title */}
        {title && (
          <div>
            <h2 className="text-[40px] font-medium text-[#020318] whitespace-pre-line">{title}</h2>
            {subtitle && <p className="mt-2 text-[#020318] text-[18px]">{subtitle}</p>}
            {buttonText && buttonLink && (
              <a
                href={buttonLink}
                className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 cursor-pointer"
              >
                {buttonText}
              </a>
            )}
          </div>
        )}

        {/* Custom Button */}
        {customButton && !pricing && <div className="mt-6">{customButton}</div>}

        {/* Contact Section */}
    

{contact && (
  <div className="flex flex-col md:flex-row justify-center gap-6 mt-6">
    {contact.phone && (
      <div className="group flex items-center gap-3 px-6 py-3 border rounded-md shadow-sm  transition hover:bg-gray-50 cursor-pointer">
        {contact.phoneIcon && (
          <div className="p-1 rounded group-hover:bg-[#D6FFE7] transition ">
            <Image
              src={contact.phoneIcon}
              alt="Phone"
              width={17}
              height={18}
              className="text-green-600"
            />
          </div>
        )}
        <span className="text-base text-green-600">{contact.phone}</span>
      </div>
    )}
    {contact.email && (
      <div className="group flex items-center gap-3 px-6 py-3 border rounded-md shadow-sm cursor-pointer transition hover:bg-gray-50">
        {contact.emailIcon && (
          <div className="p-1 rounded group-hover:bg-[#D6FFE7] transition">
            <Image
              src={contact.emailIcon}
              alt="Email"
              width={17}
              height={18}
              className="text-green-600"
            />
          </div>
        )}
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
    <div className="flex justify-between items-center">
      <label className="text-sm font-semibold text-gray-800">
        Pricing
      </label>
      <label className="text-sm font-semibold text-gray-800">
        How many contacts do you have?
      </label>
    </div>

    {/* Slider & Price Display */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-2">
        <div className="w-full md:w-1/2 relative">
    {/* Slider */}
    <input
      type="range"
      min={1}
      max={1000}
      value={contactCount}
      onChange={(e) => setContactCount(Number(e.target.value))}
      className="w-full h-2 appearance-none rounded-lg accent-green-600 bg-gray-300"
      id="contact-slider"
    />

    {/* Floating Tooltip above slider thumb */}
    <div
      className="absolute -top-7 transform -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-md"
      style={{
        left: `${(contactCount / 1000) * 100}%`,
        transition: 'left 0.1s ease-out',
      }}
    >
      {contactCount}
    </div>
  </div>

      <div className="w-full md:w-1/2 text-right">
        <p className="text-sm font-medium text-gray-800 mb-1">
          Contacts: <span className="text-black font-semibold">{contactCount}</span>
        </p>
        <p className="text-lg font-semibold text-green-700">
          ₹
          {billingCycle === 'monthly'
            ? Math.round(monthlyPrice)
            : Math.round(yearlyPrice)}{' '}
          / {billingCycle}
        </p>
      </div>
    </div>

    {/* CTA Button */}
   {/* Custom Button shown only when pricing is present and centered */}
{customButton && (
  <div className="mt-6 flex justify-center">
    {customButton}
  </div>
)}




    {/* Billing Cycle Toggle */}
    <div className="flex justify-center gap-4 mt-4">
      <button
        onClick={() => setBillingCycle('monthly')}
        className={`px-6 py-2 rounded-full font-medium transition ${
          billingCycle === 'monthly'
            ? 'bg-green-600 text-white'
            : 'bg-white border border-gray-300 text-gray-700'
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
        <span className="bg-gray-100 text-green-600 text-xs px-2 py-0.5 rounded-full">
          Save 10%
        </span>
      </button>
    </div>

  </div>
)}

      </div>
    </section>
  );
}

export default TopSectionPages;
