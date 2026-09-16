"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { TextInput } from "@/components/ui/input";
import { ButtonPrimary, ButtonSoft } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 py-12 sm:py-20 flex flex-col items-center">
      <div className="w-12 h-12 rounded-[14px] bg-ink text-white flex items-center justify-center font-bold text-lg mb-6">
        W
      </div>

      <h1 className="text-h3 font-bold text-ink mb-2 text-center">
        Reset your password.
      </h1>
      <p className="text-body-sm text-muted text-center mb-8">
        Enter the email associated with your account and we’ll send you a recovery link.
      </p>

      <div className="w-full bg-canvas-soft rounded-md p-6 sm:p-8 border border-hairline-soft">
        {submitted ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 rounded-full bg-white text-ink flex items-center justify-center mx-auto border border-hairline">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="text-body font-bold text-ink">Check your inbox.</h3>
            <p className="text-body-sm text-muted">
              We sent a password recovery link to{" "}
              <span className="font-semibold text-ink">{email}</span>.
            </p>
            <div className="pt-2">
              <Link href="/auth/signin">
                <ButtonSoft size="md" className="w-full">
                  Return to sign in
                </ButtonSoft>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-label uppercase tracking-wider text-muted font-semibold block mb-1.5">
                Account email
              </label>
              <TextInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="bg-white"
                required
              />
            </div>

            <div className="pt-2">
              <ButtonPrimary type="submit" size="md" className="w-full">
                Send recovery link
              </ButtonPrimary>
            </div>
          </form>
        )}
      </div>

      <div className="mt-6">
        <Link
          href="/auth/signin"
          className="inline-flex items-center gap-2 text-body-sm font-semibold text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to sign in</span>
        </Link>
      </div>
    </div>
  );
}
