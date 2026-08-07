import { Compass } from "lucide-react";
import type { ReactNode } from "react";

export default function SectionLead({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <div
      className={`relative max-w-2xl overflow-hidden rounded-[1.4rem] border p-5 backdrop-blur-sm sm:p-6 ${
        dark
          ? "border-white/12 bg-white/[0.065] shadow-[0_18px_55px_rgba(2,12,24,0.16)]"
          : "border-[#d7e4e1] bg-white/80 shadow-[0_18px_55px_rgba(7,26,47,0.07)]"
      } ${className}`}
    >
      <span
        className={`absolute inset-y-5 left-0 w-1 rounded-r-full ${
          dark ? "bg-[#e7bd74]" : "bg-[linear-gradient(180deg,#0d6575,#8dc9c8)]"
        }`}
        aria-hidden="true"
      />
      <span
        className={`absolute -right-12 -top-16 h-36 w-36 rounded-full border-[24px] ${
          dark ? "border-white/[0.035]" : "border-[#0d6575]/[0.035]"
        }`}
        aria-hidden="true"
      />

      <div className="relative flex items-start gap-4">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            dark ? "bg-[#e7bd74] text-[#071a2f]" : "bg-[#e7f2ef] text-[#0d6575]"
          }`}
        >
          <Compass aria-hidden="true" size={18} />
        </span>
        <p className={`pt-1 text-base leading-7 sm:text-lg sm:leading-8 ${dark ? "text-white/72" : "text-[#526b75]"}`}>
          {children}
        </p>
      </div>
    </div>
  );
}
