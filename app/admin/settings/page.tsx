"use client";

import { useState } from "react";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [retryDays, setRetryDays] = useState(30);
  const [otpExpiry, setOtpExpiry] = useState(5);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Configure platform-wide settings and defaults.</p>
      </div>

      {[
        {
          title: "Session Management",
          description: "Control user session behavior and security timeouts.",
          fields: [
            { label: "Session Timeout (minutes)", description: "Auto-logout after inactivity", value: sessionTimeout, onChange: setSessionTimeout, min: 5, max: 120 },
            { label: "OTP Expiry (minutes)", description: "Time before OTP becomes invalid", value: otpExpiry, onChange: setOtpExpiry, min: 1, max: 15 },
          ],
        },
        {
          title: "Exam Configuration",
          description: "Default settings applied to all courses unless overridden.",
          fields: [
            { label: "Default Retry Cooldown (days)", description: "Days to wait before next attempt", value: retryDays, onChange: setRetryDays, min: 1, max: 90 },
          ],
        },
      ].map((section) => (
        <div key={section.title} className="rounded-xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="px-6 py-4 border-b" style={{ borderColor: "var(--border)" }}>
            <h2 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{section.title}</h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{section.description}</p>
          </div>
          <div className="p-6 space-y-6">
            {section.fields.map((field) => (
              <div key={field.label} className="flex items-center justify-between gap-8">
                <div>
                  <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{field.label}</label>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{field.description}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <input
                    type="range"
                    min={field.min}
                    max={field.max}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="w-32 accent-[var(--primary)]"
                  />
                  <span className="w-12 text-right text-sm font-semibold tabular-nums" style={{ color: "var(--foreground)" }}>
                    {field.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Security Section */}
      <div className="rounded-xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="px-6 py-4 border-b" style={{ borderColor: "var(--border)" }}>
          <h2 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Security</h2>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Authentication and access control settings.</p>
        </div>
        <div className="p-6 space-y-4">
          {[
            { label: "Require reCAPTCHA on login", description: "Bot protection for login form" },
            { label: "Enforce OTP verification", description: "2FA via mobile OTP" },
            { label: "Lock account after 5 failures", description: "Brute-force protection" },
            { label: "HTTPS only mode", description: "Enforce secure connections" },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{item.label}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-9 h-5 rounded-full peer transition-colors peer-checked:bg-[var(--primary)] peer-focus:outline-none" style={{ background: "var(--muted)" }}>
                  <div className="absolute top-0.5 left-0.5 bg-white rounded-full h-4 w-4 transition-transform peer-checked:translate-x-4" />
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity" style={{ background: "var(--primary)" }}>
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>
    </div>
  );
}
