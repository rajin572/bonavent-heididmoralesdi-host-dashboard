/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

type Tab<T extends string> = {
  label: string | React.ReactNode;
  value: T;
  content: React.ReactNode;
};

type ReusableTabsProps<T extends string> = {
  tabs: Tab<T>[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  align?: "left" | "center" | "right";
  variant?: "outline" | "filled";
};

const ReusableTabs = <T extends string>({
  tabs,
  activeTab,
  onTabChange,
  align = "center",
  variant = "outline",
}: ReusableTabsProps<T>) => {
  const justifyClass =
    align === "left"
      ? "justify-start"
      : align === "right"
      ? "justify-end"
      : "justify-center";

  const outline = (tab: any) => {
    return activeTab === tab.value
      ? "bg-transparent border !border-secondary-color text-secondary-color"
      : "bg-transparent text-base-color";
  };
  const filled = (tab: any) => {
    return activeTab === tab.value
      ? "bg-secondary-color border !border-secondary-color text-white"
      : "bg-transparent text-base-color";
  };

  return (
    <div>
      <div className={`w-full flex ${justifyClass}`}>
        <div
          className={`rounded-full flex gap-1 ${
            variant === "outline" ? "bg-transparent" : "bg-[#E4E4E4] p-1"
          }`}
        >
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              className={`px-4 py-1.5 text-sm sm:text-base rounded-full font-semibold cursor-pointer border border-transparent
                ${variant === "outline" ? outline(tab) : filled(tab)}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10">
        {tabs.find((tab) => tab.value === activeTab)?.content}
      </div>
    </div>
  );
};

export default ReusableTabs;
