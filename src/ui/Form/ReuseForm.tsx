"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { ReactNode } from "react";
import { cn } from "../../lib/utils";

type ReusableFormProps = {
  form?: any;
  children: ReactNode;
  defaultValues?: any;
  className?: string;
  handleFinish: (values: Record<string, any>) => void;
  onValuesChange?: (changedValues: any, allValues: any) => void; // ✅ new
  preserve?: boolean;
};

const ReusableForm = ({
  form,
  children,
  defaultValues,
  className,
  handleFinish,
  onValuesChange, // ✅ new
  preserve = true,
}: ReusableFormProps) => {
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={defaultValues}
      onFinish={handleFinish}
      onValuesChange={onValuesChange} // ✅ allow value tracking
      className={cn("space-y-1", className)}
      preserve={preserve}
    >
      {children}
    </Form>
  );
};

export default ReusableForm;
