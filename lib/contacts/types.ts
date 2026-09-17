export type ContactStatus = "new" | "talking" | "closed";

export type ContactChannel = "phone" | "line" | "email" | "meeting" | "video";

export type ContactHistoryEntry = {
  id: string;
  icon: string;
  title: string;
  detail: string;
  /** รูปแบบ YYYY-MM-DDTHH:mm */
  at: string;
};

export type Contact = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  lineId: string;
  channel: ContactChannel;
  interest: string;
  status: ContactStatus;
  /** รูปแบบ YYYY-MM-DDTHH:mm */
  followUpAt: string;
  note: string;
  owner: string;
  history: ContactHistoryEntry[];
};

export type ContactInput = Omit<Contact, "id" | "history">;

export type ViewMode = "table" | "board";

export type DueFilter = "all" | "today" | "overdue" | "week";
