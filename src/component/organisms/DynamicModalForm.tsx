"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

const steps = ["Email", "Details", "Team Size", "Discovery"];

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
    "bg-green-600 hover:bg-green-700 text-white text-[15px] font-medium py-6 cursor-pointer px-6 rounded-xs transition"
  }
>
  Start Free Trial
</Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <Dialog.Panel className="w-full max-w-md bg-green-800 text-white p-6 rounded-xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4">{steps[step]}</h2>

            {step === 0 && (
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  className="text-black"
                />
              </div>
            )}

            {step === 1 && (
              <div className="space-y-3">
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange("name")}
                  className="text-black"
                />
                <Input
                  type="text"
                  placeholder="Enter your company name"
                  value={formData.company}
                  onChange={handleInputChange("company")}
                  className="text-black"
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3">
                {formOptions.teamSizes.map((size) => (
                  <Button
                    key={size}
                    variant={formData.teamSize === size ? "default" : "outline"}
                    onClick={() => handleChange("teamSize", size)}
                    className="w-full"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3">
                {formOptions.discoveryOptions.map((option) => (
                  <Button
                    key={option}
                    variant={formData.discovery === option ? "default" : "outline"}
                    onClick={() => handleChange("discovery", option)}
                    className="w-full"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}

            <div className="flex justify-between pt-4">
              {step > 0 && (
                <Button variant="ghost" onClick={handleBack}>
                  Back
                </Button>
              )}
              {step < steps.length - 1 ? (
                <Button onClick={handleNext}>Next</Button>
              ) : (
                <Button onClick={handleSubmit}>Submit</Button>
              )}
            </div>
          </motion.div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

export default DynamicModalForm;
