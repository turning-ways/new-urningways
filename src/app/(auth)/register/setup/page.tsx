"use client";

import AdminCreationForm from "@/components/common/churchCreationForms/form1";
import OrgProfileForm from "@/components/common/churchCreationForms/orgProfile";
import ChurchProfileForm from "@/components/common/churchCreationForms/churchInfo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Setup() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [steps, setSteps] = useState(3);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (currentStep > steps) {
      setCurrentStep(steps);
    }
    if (currentStep < 1) {
      setCurrentStep(1);
    }
  }, [currentStep, steps]);

  function nextStep() {
    setCurrentStep((prev) => Math.min(prev + 1, steps));
  }

  function prevStep() {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      {session && currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg">
          <AdminCreationForm
            firstName={session?.user?.firstName || ""}
            lastName={session?.user?.lastName || ""}
            email={session?.user?.email || ""}
            nextStep={nextStep}
          />
        </motion.div>
      )}

      {session && currentStep === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl pb-24">
          <ChurchProfileForm prevStep={prevStep} />
        </motion.div>
      )}
    </div>
  );
}
