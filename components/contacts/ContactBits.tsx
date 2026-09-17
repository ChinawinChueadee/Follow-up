import { Icon } from "@/components/ui/Icon";
import { formatThaiDate, getDueInfo, type DueInfo } from "@/lib/contacts/date";
import { getStatus } from "@/lib/contacts/options";
import type { Contact, ContactStatus } from "@/lib/contacts/types";

const LEADING_VOWELS = "เแโใไ";

function initialOf(word: string) {
  return LEADING_VOWELS.includes(word[0]) ? (word[1] ?? word[0]) : word[0];
}

export function getInitials(name: string) {
  const words = name
    .replace(/^(คุณ|ดร\.?|นาย|นางสาว|นาง)\s*/, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "?";
  const first = initialOf(words[0]);
  const last = words.length > 1 ? initialOf(words[words.length - 1]) : "";
  return `${first}${last}`.toUpperCase();
}

const avatarText: Record<ContactStatus, string> = {
  new: "text-amber-700",
  talking: "text-primary",
  closed: "text-tertiary",
};

export function ContactAvatar({ contact, size = "md" }: { contact: Contact; size?: "md" | "lg" }) {
  const status = getStatus(contact.status);
  const box = size === "lg" ? "h-20 w-20 text-headline-md" : "h-10 w-10 text-label-md";
  return (
    <div className="neu-btn relative shrink-0 rounded-full p-0.5">
      <div
        className={`flex items-center justify-center rounded-full font-bold ${box} ${avatarText[contact.status]}`}
      >
        {getInitials(contact.name)}
      </div>
      <span
        className={`absolute right-0 bottom-0 rounded-full border-2 border-surface ${status.dot} ${
          size === "lg" ? "h-4 w-4" : "h-3.5 w-3.5"
        }`}
      />
    </div>
  );
}

export function StatusBadge({ status, inset = false }: { status: ContactStatus; inset?: boolean }) {
  const option = getStatus(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-label-sm whitespace-nowrap ${
        inset ? "neu-inset-sm font-semibold" : "neu-pill"
      } ${option.text}`}
    >
      <span className={`h-2 w-2 rounded-full ${option.dot}`} />
      {option.label}
    </span>
  );
}

export const dueToneText: Record<DueInfo["tone"], string> = {
  error: "text-error",
  primary: "text-primary",
  tertiary: "text-tertiary",
  default: "text-on-surface",
};

export function DueLabel({ contact, today }: { contact: Contact; today: string }) {
  const due = getDueInfo(contact, today);
  return (
    <div className="flex flex-col">
      <span
        className={`inline-flex items-center gap-1 text-label-md font-semibold whitespace-nowrap ${dueToneText[due.tone]}`}
      >
        <Icon name={due.icon} size={14} />
        {due.label}
      </span>
      <span className="text-body-sm whitespace-nowrap text-on-surface-variant">
        {formatThaiDate(contact.followUpAt, today)}
      </span>
    </div>
  );
}

export function Checkbox({
  checked,
  indeterminate = false,
  onChange,
  label,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <input
      type="checkbox"
      aria-label={label}
      className="neu-checkbox"
      checked={checked}
      ref={(element) => {
        if (element) element.indeterminate = indeterminate;
      }}
      onClick={(event) => event.stopPropagation()}
      onChange={(event) => onChange(event.target.checked)}
    />
  );
}
