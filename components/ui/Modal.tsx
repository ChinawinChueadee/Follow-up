"use client";

import { useEffect } from "react";
import { Icon } from "@/components/ui/Icon";

type ModalProps = {
  title: string;
  icon: string;
  onClose: () => void;
  children: React.ReactNode;
  size?: "md" | "lg";
};

export function Modal({ title, icon, onClose, children, size = "md" }: ModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-slate-900/30 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`neu-card my-auto w-full rounded-3xl p-6 ${size === "lg" ? "max-w-2xl" : "max-w-md"}`}
      >
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-1">
            <div className="neu-flat flex h-9 w-9 items-center justify-center rounded-xl text-primary">
              <Icon name={icon} size={18} />
            </div>
            <h3 className="ml-1 text-title-lg font-bold">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="ปิด"
            className="neu-btn flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant"
          >
            <Icon name="close" size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
