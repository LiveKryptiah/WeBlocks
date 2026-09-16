"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLibrary } from "@/context/library-context";
import { TextInput } from "@/components/ui/input";
import { ButtonPrimary } from "@/components/ui/button";

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useLibrary();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, name || "Designer");
    router.push("/explore");
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 py-12 sm:py-20 flex flex-col items-center">
      <div className="w-12 h-12 rounded-[14px] bg-ink text-white flex items-center justify-center font-bold text-lg mb-6">
        W
      </div>

      <h1 className="text-h3 font-bold text-ink mb-2 text-center">
        Create your account.
      </h1>
      <p className="text-body-sm text-muted text-center mb-8">
        Start discovering, saving, and organizing real-world interface references.
      </p>

      <div className="w-full bg-canvas-soft rounded-md p-6 sm:p-8 border border-hairline-soft">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-label uppercase tracking-wider text-muted font-semibold block mb-1.5">
              Full name
            </label>
            <TextInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Maya Lin"
              className="bg-white"
              required
            />
          </div>

          <div>
            <label className="text-label uppercase tracking-wider text-muted font-semibold block mb-1.5">
              Work email
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
            <label className="text-label uppercase tracking-wider text-muted font-semibold block mb-1.5">
              Choose password
            </label>
            <TextInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="bg-white"
              required
            />
          </div>

          <div className="pt-2">
            <ButtonPrimary type="submit" size="md" className="w-full">
              Create account
            </ButtonPrimary>
          </div>
        </form>
      </div>

      <p className="text-body-sm text-muted mt-6 text-center">
        Already have an account?{" "}
        <Link href="/auth/signin" className="text-ink font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
