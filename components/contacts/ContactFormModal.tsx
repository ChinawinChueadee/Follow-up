"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { channelOptions, owners, statusOptions } from "@/lib/contacts/options";
import type { ContactInput } from "@/lib/contacts/types";

type ContactFormModalProps = {
  mode: "add" | "edit";
  initialValues: ContactInput;
  onSubmit: (values: ContactInput) => void;
  submitting: boolean;
  onClose: () => void;
};

const fieldClass =
  "neu-inset w-full rounded-xl px-4 py-2.5 text-body-sm placeholder:text-on-surface-variant focus:outline-none";

function Field({
  label,
  required,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="text-label-md font-semibold">
        {label}
        {required && <span className="text-error"> *</span>}
      </span>
      {children}
    </label>
  );
}

export function ContactFormModal({
  mode,
  initialValues,
  onSubmit,
  submitting,
  onClose,
}: ContactFormModalProps) {
  const [values, setValues] = useState<ContactInput>(initialValues);

  const set = <K extends keyof ContactInput>(key: K, value: ContactInput[K]) =>
    setValues((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      ...values,
      name: values.name.trim(),
      company: values.company.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      lineId: values.lineId.trim().replace(/^@/, ""),
      interest: values.interest.trim(),
      note: values.note.trim(),
    });
  };

  return (
    <Modal
      title={mode === "add" ? "เพิ่มผู้ติดต่อใหม่" : "แก้ไขข้อมูลผู้ติดต่อ"}
      icon={mode === "add" ? "person_add" : "edit"}
      size="lg"
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="ชื่อ" required className="sm:col-span-2">
          <input
            autoFocus
            required
            value={values.name}
            onChange={(event) => set("name", event.target.value)}
            placeholder="เช่น คุณวิเชียร สมใจนึก"
            className={fieldClass}
          />
        </Field>
        <Field label="บริษัทหรือองค์กร">
          <input
            value={values.company}
            onChange={(event) => set("company", event.target.value)}
            placeholder="เช่น บริษัท เอสซีจี จำกัด"
            className={fieldClass}
          />
        </Field>
        <Field label="สิ่งที่สนใจ">
          <input
            value={values.interest}
            onChange={(event) => set("interest", event.target.value)}
            placeholder="เช่น แพ็กเกจ Enterprise"
            className={fieldClass}
          />
        </Field>
        <Field label="อีเมล">
          <input
            type="email"
            value={values.email}
            onChange={(event) => set("email", event.target.value)}
            placeholder="name@company.com"
            className={fieldClass}
          />
        </Field>
        <Field label="เบอร์โทรศัพท์">
          <input
            type="tel"
            value={values.phone}
            onChange={(event) => set("phone", event.target.value)}
            placeholder="08x-xxx-xxxx"
            pattern="[0-9+\-\s\(\)#]*"
            title="ใส่ได้เฉพาะตัวเลขและเครื่องหมาย + - ( ) #"
            className={fieldClass}
          />
        </Field>
        <Field label="ช่องทางการติดต่อ">
          <select
            value={values.channel}
            onChange={(event) => set("channel", event.target.value as ContactInput["channel"])}
            className={fieldClass}
          >
            {channelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="LINE ID">
          <input
            value={values.lineId}
            onChange={(event) => set("lineId", event.target.value)}
            placeholder="เช่น @company_line"
            className={fieldClass}
          />
        </Field>
        <Field label="สถานะ">
          <select
            value={values.status}
            onChange={(event) => set("status", event.target.value as ContactInput["status"])}
            className={fieldClass}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="วันที่ต้อง Follow-up" required>
          <input
            type="datetime-local"
            required
            value={values.followUpAt}
            onChange={(event) => set("followUpAt", event.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field label="ผู้ดูแล">
          <select
            value={values.owner}
            onChange={(event) => set("owner", event.target.value)}
            className={fieldClass}
          >
            {owners.map((owner) => (
              <option key={owner} value={owner}>
                {owner}
              </option>
            ))}
          </select>
        </Field>
        <Field label="หมายเหตุ" className="sm:col-span-2">
          <textarea
            rows={3}
            value={values.note}
            onChange={(event) => set("note", event.target.value)}
            placeholder="ระบุสิ่งที่ต้องติดตาม เช่น ส่งใบเสนอราคา, สรุปความคืบหน้า..."
            className={`${fieldClass} resize-none`}
          />
        </Field>
        <div className="flex items-center justify-end gap-2 pt-1 sm:col-span-2">
          <button
            type="button"
            onClick={onClose}
            className="neu-btn rounded-xl px-4 py-2 text-label-md text-on-surface-variant hover:text-on-surface"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="neu-btn-primary rounded-xl px-6 py-2 text-label-md font-semibold text-white disabled:cursor-wait disabled:opacity-70"
          >
            {submitting ? "กำลังบันทึก..." : mode === "add" ? "เพิ่มผู้ติดต่อ" : "บันทึกการแก้ไข"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
