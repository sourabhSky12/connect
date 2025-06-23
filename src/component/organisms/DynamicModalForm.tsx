"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
interface FormData {
  email: string;
  name: string;
  company: string;
  teamSize: string;
  discovery: string;
}

interface FormOptions {
  teamSizes: string[];
  discoveryOptions: string[];
}
interface DynamicModalFormProps {
  buttonClassName?: string;
}

const steps = ["Try dolnsights for Free", "Welcome to dolnsights!", "How Big is Your Team?", "How Did YOU Discover dolnsights?"];

function DynamicModalForm({ buttonClassName }: DynamicModalFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    company: "",
    teamSize: "",
    discovery: "",
  });

  const [formOptions, setFormOptions] = useState<FormOptions>({
    teamSizes: [],
    discoveryOptions: [],
  });

  useEffect(() => {
    fetch("/data/formOptions.json")
      .then((res) => res.json())
      .then((data: FormOptions) => setFormOptions(data))
      .catch((err) => console.error("Failed to fetch form options:", err));
  }, []);

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleInputChange =
    (key: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => {
      handleChange(key, e.target.value);
    };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = () => {
    console.log("Submitted: ", formData);
    setIsOpen(false);
    setStep(0);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={
          buttonClassName ??
          "bg-green-700 hover:bg-green-900 text-white text-[15px] font-medium py-6 px-6 rounded transition cursor-pointer"
        }
      >
        Start Free Trial
      </Button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5 md:px-0 "
      >
        <Dialog.Panel className="w-full max-w-xl bg-green-800 text-white p-8 md:p-12 rounded-2xl   space-y-6 h-[660px]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Pagination dots */}
            <div className="flex justify-start mb-4 space-x-2">
              {steps.map((_, index) => (
                <span
                  key={index}
                  className={`h-3 w-3 rounded-full ${
                    index === step ? "bg-white" : "bg-white/40"
                  }`}
                ></span>
              ))}
            </div>

            {/* <h2 className="text-2xl font-bold mb-4 text-center">{steps[step]}</h2> */}

            {/* Step 0 */}
        {step === 0 && (
  <div className="space-y-4 text-center  ">
    
     <div className="mx-auto w-fit md:pb-10 pt-5 pb-5">
    <Image
      src="/connectfooter.png"
      alt="Example Image"
      width={150}
      height={120}
    />
  </div>
    
    <h1 className="text-3xl font-bold">Try doInsights now for 14 days free of charge!</h1>
    <div className="flex flex-col md:flex-row justify-center items-center gap-4">
    <Input
      type="email"
      placeholder="E-mail address"
      value={formData.email}
      onChange={handleInputChange("email")}
      className="text-black bg-white "
    />
    <Button
  onClick={() => {
    if (formData.email.trim() === "") {
      alert("Please enter your email address.");
      return;
    }
    handleNext();
  }}
  className="w-full cursor-pointer md:w-auto bg-green-700 hover:bg-green-400"
>
  Test Now
</Button>
</div>
    <p className="text-xs text-white/70 mt-2">
      By submitting this form you accept our{" "}
      <span className="underline">terms</span> and{" "}
      <span className="underline">privacy policy</span>.and you confirm that you will use doInsights as a commercial user.
    </p>
    <p className="text-sm font-semibold pt-10">1,000+ clients trust dolnsights</p>
  </div>
)}




            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-6 text-start">
                 <h1 className="text-3xl pt-10 font-bold">Welcome to dolnsights! Lets Get Started.</h1>
                <p className="text-[16px] opacity-90">
                  We are excited to have you on board! To tailor your experience, please provide us with a few details about yourself and your company.
                </p>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange("name")}
                  className="text-black bg-white"
                />
                <Input
                  type="text"
                  placeholder="Enter your company name"
                  value={formData.company}
                  onChange={handleInputChange("company")}
                  className="text-black bg-white"
                />
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-4 text-center">
                 <h1 className="text-3xl pt-4 font-bold text-start">How Big is Your Team?</h1>
                <p className="text-[16px] opacity-90 text-start">
                 Understanding the size of your team helps us optimize dolnsights to meet your needs.
                </p>
                
              
                {formOptions.teamSizes.map((size) => (
  <label
    key={size}
    className={`flex items-center justify-between w-full px-4 py-2 rounded border cursor-pointer
      ${formData.teamSize === size
        ? 'bg-green-600 text-white border-white'
        : 'bg-green-800 text-white border-[#142236]'}
      hover:bg-[#142236] hover:border-white transition`}
  >
    <span className="text-start">{size}</span>

    <input
      type="radio"
      name="teamSize"
      value={size}
      checked={formData.teamSize === size}
      onChange={() => handleChange("teamSize", size)}
      className="hidden"
    />

    {/* Checkbox Circle */}
    <span
      className={`w-5 h-5 rounded-full border-2 ${
        formData.teamSize === size
          ? 'border-white bg-white'
          : 'border-white'
      } flex items-center justify-center`}
    >
      {formData.teamSize === size && (
        <span className="w-2 h-2 rounded-full bg-green-600" />
      )}
    </span>
  </label>
))}

              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-3 text-center">
                 <h1 className="text-3xl pt-4 font-bold text-start">One last thing. How Did YOU Discover dolnsights?</h1>
                <p className="text-[16px] opacity-90 text-start">
                We love to know how you found us! This helps us improve and reach more people like you.
                </p>
               {formOptions.discoveryOptions.map((option) => (
  <label
    key={option}
    className={`flex items-center justify-between w-full px-4 py-2 rounded border cursor-pointer
      ${formData.discovery === option
        ? 'bg-green-600 text-white border-white'
        : 'bg-green-800 text-white border-[#142236]'}
      hover:bg-[#142236] hover:border-white transition`}
  >
    <span className="text-start">{option}</span>

    <input
      type="radio"
      name="discovery"
      value={option}
      checked={formData.discovery === option}
      onChange={() => handleChange("discovery", option)}
      className="hidden"
    />

    {/* Custom radio/check visual */}
    <span
      className={`w-5 h-5 rounded-full border-2 ${
        formData.discovery === option
          ? 'border-white bg-white'
          : 'border-white'
      } flex items-center justify-center`}
    >
      {formData.discovery === option && (
        <span className="w-2 h-2 rounded-full bg-green-600" />
      )}
    </span>
  </label>
))}

              </div>
            )}

           {/* Navigation Buttons */}
{step !== 0 && (
  <div className="flex justify-between pt-4">
    {step > 0 && (
      <Button variant="ghost" className="bg-white text-black px-6 cursor-pointer hover:text-green-700 py-4" onClick={handleBack}>
        Back
      </Button>
    )}
    {step < steps.length - 1 ? (
      <Button onClick={handleNext} className="bg-green-600 hover:bg-[#D6FFE7] text-white hover:text-green-600 px-6 py-4 cursor-pointer">
        Next
      </Button>
    ) : (
      <Button onClick={handleSubmit} className="bg-green-600 hover:bg-[#D6FFE7] text-white px-6 hover:text-green-600 cursor-pointer  py-4">
        Submit 
      </Button>
    )}
  </div>
)}

          </motion.div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

export default DynamicModalForm;
