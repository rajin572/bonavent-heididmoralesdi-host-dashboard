"use client";
import { Form, Input, Typography } from "antd";
import React, { useState } from "react";
import type { Rule } from "antd/es/form";
import { IoClose } from "react-icons/io5";
import { cn } from "../../lib/utils";

type TTagInputControlProps = {
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  inputClassName?: string;
  tagClassName?: string;
};

const TagInputControl = ({
  value = [],
  onChange,
  placeholder,
  disabled,
  inputClassName,
  tagClassName,
}: TTagInputControlProps) => {
  const [draft, setDraft] = useState("");

  const addTags = (raw: string) => {
    const newTags = raw
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    if (newTags.length > 0) {
      onChange?.([...value, ...newTags]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw.includes(",")) {
      const parts = raw.split(",");
      const remainder = parts.pop() as string;
      addTags(parts.join(","));
      setDraft(remainder);
    } else {
      setDraft(raw);
    }
  };

  const commitDraft = () => {
    if (draft.trim()) {
      addTags(draft);
    }
    setDraft("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commitDraft();
    } else if (e.key === "Backspace" && !draft && value.length > 0) {
      onChange?.(value.slice(0, -1));
    }
  };

  const removeTag = (index: number) => {
    onChange?.(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Input
        value={draft}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={commitDraft}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "!py-1.5 !px-3 !text-lg !bg-input-color border !border-input-color !text-base-color rounded-lg",
          inputClassName
        )}
      />
      {value.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {value.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className={cn(
                "flex items-center gap-1.5 border border-secondary-color text-secondary-color rounded-full px-3 py-1 text-sm",
                tagClassName
              )}
            >
              {tag}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="flex items-center justify-center"
                  aria-label={`Remove ${tag}`}
                >
                  <IoClose className="size-3.5" />
                </button>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

type TTagInputProps = {
  Typolevel?: 1 | 2 | 3 | 4 | 5;
  label?: React.ReactNode;
  name: string;
  rules?: Rule[];
  placeholder?: string;
  disabled?: boolean;
  wrapperClassName?: string;
  formItemClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  tagClassName?: string;
};

const ReuseTagInput = ({
  Typolevel = 5,
  label,
  name,
  rules = [],
  placeholder = "Type a feature, press Enter or use commas",
  disabled,
  wrapperClassName,
  formItemClassName,
  labelClassName,
  inputClassName,
  tagClassName,
}: TTagInputProps) => {
  return (
    <div className={cn(wrapperClassName)}>
      {label && (
        <Typography.Title
          level={Typolevel}
          className={cn("!text-base-color !font-normal", labelClassName)}
        >
          {label}
        </Typography.Title>
      )}
      <Form.Item className={cn(formItemClassName)} name={name} rules={rules}>
        <TagInputControl
          placeholder={placeholder}
          disabled={disabled}
          inputClassName={inputClassName}
          tagClassName={tagClassName}
        />
      </Form.Item>
    </div>
  );
};

export default ReuseTagInput;
