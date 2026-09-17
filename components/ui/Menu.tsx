"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export type MenuItem = {
  label: string;
  icon?: string;
  active?: boolean;
  danger?: boolean;
  onSelect: () => void;
};

type MenuProps = {
  label: React.ReactNode;
  items: MenuItem[];
  buttonClassName: string;
  ariaLabel?: string;
  align?: "start" | "end";
};

type Position = { top: number; left?: number; right?: number };

// ใช้ position: fixed เพื่อไม่ให้เมนูถูกตัดโดยกล่องที่ scroll ได้ (เช่นตาราง)
export function Menu({ label, items, buttonClassName, ariaLabel, align = "start" }: MenuProps) {
  const [position, setPosition] = useState<Position | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!position) return;
    const close = () => setPosition(null);
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!menuRef.current?.contains(target) && !buttonRef.current?.contains(target)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [position]);

  const toggle = () => {
    if (position) {
      setPosition(null);
      return;
    }
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition(
      align === "end"
        ? { top: rect.bottom + 8, right: window.innerWidth - rect.right }
        : { top: rect.bottom + 8, left: rect.left },
    );
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={position !== null}
        aria-label={ariaLabel}
        onClick={(event) => {
          event.stopPropagation();
          toggle();
        }}
        className={buttonClassName}
      >
        {label}
      </button>
      {position && (
        <div
          ref={menuRef}
          role="menu"
          style={position}
          onClick={(event) => event.stopPropagation()}
          className="neu-card fixed z-[60] flex min-w-44 flex-col gap-1 rounded-2xl p-2"
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              onClick={() => {
                setPosition(null);
                item.onSelect();
              }}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-left text-label-md whitespace-nowrap transition-colors ${
                item.active ? "neu-inset-sm font-semibold text-primary" : "hover:bg-surface-container"
              } ${item.danger ? "text-error" : ""}`}
            >
              {item.icon && <Icon name={item.icon} size={16} />}
              <span className="flex-1">{item.label}</span>
              {item.active && <Icon name="check" size={14} />}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
