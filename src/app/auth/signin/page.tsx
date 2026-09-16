"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLibrary } from "@/context/library-context";
import { TextInput } from "@/components/ui/input";
import { ButtonPrimary } from "@/components/ui/button";

export default function SignInPage() {
  const router = useRouter();
  const { login } = useLibrary();
  const [email, setEmail] = useState("alex@weblocks.design");
  const [password, setPassword] = useState("••••••••••••");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, "Alex Designer");
    router.push("/explore");
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 py-12 sm:py-20 flex flex-col items-center">
      {/* Brand Icon */}
      <div className="w-12 h-12 rounded-[14px] bg-ink text-white flex items-center justify-center font-bold text-lg mb-6">
        W
      </div>

      <h1 className="text-h3 font-bold text-ink mb-2 text-center">
        Sign in to Weblocks.
      </h1>
      <p className="text-body-sm text-muted text-center mb-8">
        Access your saved reference library, collections, and team research.
      </p>

      {/* Auth Card */}
      <div className="w-full bg-canvas-soft rounded-md p-6 sm:p-8 border border-hairline-soft">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-label uppercase tracking-wider text-muted font-semibold block mb-1.5">
              Email address
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

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-label uppercase tracking-wider text-muted font-semibold">
                Password
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-caption text-muted hover:text-ink transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <TextInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="bg-white"
              required
            />
          </div>

          <div className="pt-2">
            <ButtonPrimary type="submit" size="md" className="w-full">
              Sign in
            </ButtonPrimary>
          </div>
        </form>
      </div>

      <p className="text-body-sm text-muted mt-6 text-center">
        Don&apos;t have an account yet?{" "}
        <Link href="/auth/signup" className="text-ink font-semibold hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
