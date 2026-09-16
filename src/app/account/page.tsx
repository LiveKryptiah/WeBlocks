"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Bookmark,
  FolderHeart,
  CreditCard,
  LogOut,
  Sparkles,
  Check,
} from "lucide-react";
import { useLibrary } from "@/context/library-context";
import { ButtonPrimary, ButtonOutline, ButtonSoft } from "@/components/ui/button";
import { TextInput } from "@/components/ui/input";
import { BadgePopular } from "@/components/ui/badge";

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, savedIds, collections, upgradeToPro } = useLibrary();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-h2 font-bold text-ink mb-2">Account & profile.</h1>
        <p className="text-body text-muted max-w-xl font-light">
          Manage your research preferences, subscription tier, and personal archives.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Overview Card & Quick links */}
        <div className="lg:col-span-4 space-y-6">
          {/* User badge card */}
          <div className="bg-canvas-soft rounded-md p-6 border-none flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-ink text-white flex items-center justify-center font-bold text-2xl mb-4">
              {user.avatarChar}
            </div>
            <h2 className="text-title font-bold text-ink">{user.name}</h2>
            <p className="text-body-sm text-muted mb-4">{user.email || "Guest account"}</p>

            <div className="inline-flex items-center gap-2 mb-6">
              {user.plan === "pro" ? (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink text-white text-caption font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Pro Member</span>
                </div>
              ) : (
                <div className="px-3 py-1 rounded-full bg-white border border-hairline-soft text-caption font-semibold text-muted">
                  Free Library Tier
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-body-sm text-muted hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/saved"
              className="bg-white p-4 rounded-sm border border-hairline-soft hover:border-ink transition-colors flex flex-col"
            >
              <div className="flex items-center justify-between text-muted mb-2">
                <Bookmark className="w-4 h-4" />
                <span className="text-caption font-mono">Archive</span>
              </div>
              <span className="text-h3 font-bold text-ink">{savedIds.length}</span>
              <span className="text-caption text-muted mt-1">Saved screens</span>
            </Link>

            <Link
              href="/collections"
              className="bg-white p-4 rounded-sm border border-hairline-soft hover:border-ink transition-colors flex flex-col"
            >
              <div className="flex items-center justify-between text-muted mb-2">
                <FolderHeart className="w-4 h-4" />
                <span className="text-caption font-mono">Boards</span>
              </div>
              <span className="text-h3 font-bold text-ink">{collections.length}</span>
              <span className="text-caption text-muted mt-1">Collections</span>
            </Link>
          </div>
        </div>

        {/* Right column: Settings & Subscription Details */}
        <div className="lg:col-span-8 space-y-8">
          {/* Subscription Section */}
          <div className="bg-canvas-soft rounded-md p-6 sm:p-8 border-none">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-label text-muted font-semibold">
                  Subscription & Billing
                </span>
                <h3 className="text-h4 font-bold text-ink mt-1">
                  {user.plan === "pro" ? "Weblocks Pro (Active)" : "Free Starter Plan"}
                </h3>
              </div>
              {user.plan === "pro" && <BadgePopular />}
            </div>

            <p className="text-body-sm text-muted mb-6">
              {user.plan === "pro"
                ? "You have full commercial access to all 10,000+ lossless screenshots, design patterns, and team collections."
                : "Upgrade to Weblocks Pro for unlimited high-resolution screens, flows, and Figma exports."}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {user.plan === "free" ? (
                <ButtonPrimary onClick={upgradeToPro}>
                  Upgrade to Pro ($12/mo)
                </ButtonPrimary>
              ) : (
                <Link href="/pricing">
                  <ButtonOutline size="sm">Manage Plan Details</ButtonOutline>
                </Link>
              )}
            </div>
          </div>

          {/* Profile Form */}
          <div className="bg-white rounded-md p-6 sm:p-8 border border-hairline-soft">
            <h3 className="text-h4 font-bold text-ink mb-2">Profile details.</h3>
            <p className="text-body-sm text-muted mb-6">
              Update your account details and display name.
            </p>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="text-label text-muted font-semibold block mb-1.5">
                  Display name
                </label>
                <TextInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="text-label uppercase tracking-wider text-muted font-semibold block mb-1.5">
                  Email address
                </label>
                <TextInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <ButtonPrimary type="submit" size="sm">
                  Save Changes
                </ButtonPrimary>
                {savedSuccess && (
                  <span className="text-body-sm text-emerald-600 flex items-center gap-1 font-semibold">
                    <Check className="w-4 h-4" />
                    Updated
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
