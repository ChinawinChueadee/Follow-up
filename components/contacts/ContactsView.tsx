"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  addContactNote,
  assignContactsOwner,
  createContact,
  deleteContacts,
  importContacts,
  updateContact,
  updateContactsStatus,
} from "@/app/(main)/contacts/actions";
import { Icon } from "@/components/ui/Icon";
import { contactsToCsv, csvToContacts } from "@/lib/contacts/csv";
import { diffDays, splitDateTime } from "@/lib/contacts/date";
import { getStatus, PAGE_SIZE } from "@/lib/contacts/options";
import type {
  Contact,
  ContactChannel,
  ContactInput,
  ContactStatus,
  DueFilter,
  ViewMode,
} from "@/lib/contacts/types";
import { currentUser } from "@/lib/mock-data";
import { BulkActionBar } from "./BulkActionBar";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { ContactDrawer } from "./ContactDrawer";
import { ContactFormModal } from "./ContactFormModal";
import { ContactsBoard } from "./ContactsBoard";
import { ContactsFilters } from "./ContactsFilters";
import { ContactsHeader } from "./ContactsHeader";
import { ContactsTable } from "./ContactsTable";
import { ContactStats } from "./ContactStats";
import { Pagination } from "./Pagination";

type FormState = { mode: "add" } | { mode: "edit"; contact: Contact } | null;

type Notice = { text: string; tone: "success" | "error" };

const FAILED = "บันทึกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง";

function matchesSearch(contact: Contact, query: string) {
  if (!query) return true;
  const digits = query.replace(/\D/g, "");
  const haystack = [
    contact.name,
    contact.company,
    contact.email,
    contact.phone,
    contact.lineId,
    contact.interest,
    contact.note,
    contact.owner,
  ]
    .join(" ")
    .toLowerCase();
  return (
    haystack.includes(query) ||
    (digits.length >= 3 && contact.phone.replace(/\D/g, "").includes(digits))
  );
}

function matchesDue(contact: Contact, due: DueFilter, today: string) {
  if (due === "all") return true;
  const date = splitDateTime(contact.followUpAt).date;
  if (!date) return false;
  const diff = diffDays(today, date);
  if (due === "today") return diff === 0;
  if (due === "overdue") return diff < 0 && contact.status !== "closed";
  return diff >= 0 && diff <= 7;
}

type ContactsViewProps = {
  initialContacts: Contact[];
  today: string;
};

export function ContactsView({ initialContacts, today }: ContactsViewProps) {
  const [contacts, setContacts] = useState(initialContacts);
  const [search, setSearch] = useState("");
  const [channel, setChannel] = useState<ContactChannel | "all">("all");
  const [due, setDue] = useState<DueFilter>("all");
  const [status, setStatus] = useState<ContactStatus | "all">("all");
  const [view, setView] = useState<ViewMode>("table");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const [form, setForm] = useState<FormState>(null);
  const [deleteIds, setDeleteIds] = useState<string[] | null>(null);
  const [drawerId, setDrawerId] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [busy, setBusy] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // ⌘K / Ctrl+K เพื่อโฟกัสช่องค้นหา
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 3000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  // กรองทุกเงื่อนไขยกเว้นสถานะ เพื่อใช้นับจำนวนในปุ่มสถานะ
  const baseFiltered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return contacts
      .filter(
        (contact) =>
          matchesSearch(contact, query) &&
          (channel === "all" || contact.channel === channel) &&
          matchesDue(contact, due, today),
      )
      // รายการที่ยังไม่ปิดงานขึ้นก่อน แล้วเรียงตามวันที่ต้องติดตาม
      .sort(
        (a, b) =>
          Number(a.status === "closed") - Number(b.status === "closed") ||
          a.followUpAt.localeCompare(b.followUpAt),
      );
  }, [contacts, search, channel, due, today]);

  const filtered = useMemo(
    () => (status === "all" ? baseFiltered : baseFiltered.filter((c) => c.status === status)),
    [baseFiltered, status],
  );

  const statusCounts = useMemo(() => {
    const counts: Record<ContactStatus | "all", number> = {
      all: baseFiltered.length,
      new: 0,
      talking: 0,
      closed: 0,
    };
    baseFiltered.forEach((contact) => {
      counts[contact.status] += 1;
    });
    return counts;
  }, [baseFiltered]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  const selectedContacts = contacts.filter((contact) => selectedIds.has(contact.id));
  const drawerContact = contacts.find((contact) => contact.id === drawerId) ?? null;
  const deleteNames = contacts.filter((c) => deleteIds?.includes(c.id)).map((c) => c.name);

  const withResetPage =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setPage(1);
    };

  const notify = (text: string, tone: Notice["tone"] = "success") => setNotice({ text, tone });

  /** แทนที่ผู้ติดต่อในรายการด้วยข้อมูลล่าสุดจาก server */
  const mergeContacts = (updated: Contact[]) => {
    const byId = new Map(updated.map((contact) => [contact.id, contact]));
    setContacts((current) => current.map((contact) => byId.get(contact.id) ?? contact));
  };

  /** เรียก server action โดยกันการกดซ้ำ และแสดงข้อความเมื่อผิดพลาด */
  const run = async <T,>(
    action: () => Promise<{ ok: true; data: T } | { ok: false; error: string }>,
    onSuccess: (data: T) => void,
  ) => {
    if (busy) return false;
    setBusy(true);
    try {
      const result = await action();
      if (!result.ok) {
        notify(result.error, "error");
        return false;
      }
      onSuccess(result.data);
      return true;
    } catch {
      notify(FAILED, "error");
      return false;
    } finally {
      setBusy(false);
    }
  };

  const toggleSelected = (id: string, checked: boolean) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const toggleAllOnPage = (checked: boolean) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      pageItems.forEach((contact) => (checked ? next.add(contact.id) : next.delete(contact.id)));
      return next;
    });
  };

  const handleSubmit = async (values: ContactInput) => {
    if (form?.mode === "edit") {
      await run(
        () => updateContact(form.contact.id, values),
        (contact) => {
          mergeContacts([contact]);
          setForm(null);
          notify(`บันทึกการแก้ไข ${contact.name} แล้ว`);
        },
      );
      return;
    }
    await run(
      () => createContact(values),
      (contact) => {
        setContacts((current) => [contact, ...current]);
        setForm(null);
        notify(`เพิ่ม ${contact.name} แล้ว`);
      },
    );
  };

  const confirmDelete = async () => {
    if (!deleteIds) return;
    await run(
      () => deleteContacts(deleteIds),
      (deleted) => {
        setContacts((current) => current.filter((contact) => !deleted.includes(contact.id)));
        setSelectedIds((current) => new Set([...current].filter((id) => !deleted.includes(id))));
        if (drawerId && deleted.includes(drawerId)) setDrawerId(null);
        setDeleteIds(null);
        notify(`ลบผู้ติดต่อ ${deleted.length} รายการแล้ว`);
      },
    );
  };

  const handleSaveNote = (id: string, note: string) =>
    run(
      () => addContactNote(id, note),
      (contact) => {
        mergeContacts([contact]);
        notify("บันทึกโน้ตติดตามงานแล้ว");
      },
    );

  const handleBulkStatus = async (next: ContactStatus) => {
    const label = getStatus(next).label;
    await run(
      () => updateContactsStatus([...selectedIds], next),
      (updated) => {
        mergeContacts(updated);
        notify(`เปลี่ยนสถานะ ${updated.length} รายการเป็น "${label}"`);
      },
    );
  };

  const handleBulkAssign = async (owner: string) => {
    await run(
      () => assignContactsOwner([...selectedIds], owner),
      (updated) => {
        mergeContacts(updated);
        notify(`มอบหมาย ${updated.length} รายการให้ ${owner}`);
      },
    );
  };

  const handleBulkEmail = () => {
    const emails = selectedContacts.map((contact) => contact.email).filter(Boolean);
    if (emails.length === 0) {
      notify("รายการที่เลือกไม่มีอีเมล", "error");
      return;
    }
    window.location.href = `mailto:?bcc=${emails.map(encodeURIComponent).join(",")}`;
  };

  const handleExport = () => {
    const blob = new Blob([contactsToCsv(filtered)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `contacts-${today}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    notify(`ส่งออก ${filtered.length} รายการแล้ว`);
  };

  const handleImport = async (file: File) => {
    const parsed = csvToContacts(await file.text(), currentUser.name).map((values) => ({
      ...values,
      followUpAt: values.followUpAt || `${today}T09:00`,
    }));
    if (parsed.length === 0) {
      notify("ไม่พบข้อมูลที่นำเข้าได้ในไฟล์นี้", "error");
      return;
    }
    await run(
      () => importContacts(parsed, file.name),
      (imported) => {
        setContacts((current) => [...imported, ...current]);
        notify(`นำเข้า ${imported.length} รายการแล้ว`);
      },
    );
  };

  const closeDrawer = useCallback(() => setDrawerId(null), []);
  const closeForm = useCallback(() => setForm(null), []);
  const closeDelete = useCallback(() => setDeleteIds(null), []);

  const listHandlers = {
    today,
    selectedIds,
    onToggle: toggleSelected,
    onView: (contact: Contact) => setDrawerId(contact.id),
    onEdit: (contact: Contact) => setForm({ mode: "edit", contact }),
    onDelete: (contact: Contact) => setDeleteIds([contact.id]),
  };

  const emptyValues: ContactInput = {
    name: "",
    company: "",
    email: "",
    phone: "",
    lineId: "",
    channel: "phone",
    interest: "",
    status: "new",
    followUpAt: `${today}T09:00`,
    note: "",
    owner: currentUser.name,
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <ContactsHeader
        total={contacts.length}
        onImport={handleImport}
        onExport={handleExport}
        onAdd={() => setForm({ mode: "add" })}
      />

      <ContactStats contacts={contacts} today={today} />

      <ContactsFilters
        searchRef={searchRef}
        search={search}
        onSearchChange={withResetPage(setSearch)}
        channel={channel}
        onChannelChange={withResetPage(setChannel)}
        due={due}
        onDueChange={withResetPage(setDue)}
        view={view}
        onViewChange={setView}
        status={status}
        onStatusChange={withResetPage(setStatus)}
        statusCounts={statusCounts}
      />

      {selectedIds.size > 0 && (
        <BulkActionBar
          count={selectedIds.size}
          total={contacts.length}
          onChangeStatus={handleBulkStatus}
          onEmail={handleBulkEmail}
          onAssign={handleBulkAssign}
          onDelete={() => setDeleteIds([...selectedIds])}
          onClear={() => setSelectedIds(new Set())}
        />
      )}

      {view === "table" ? (
        <ContactsTable
          {...listHandlers}
          contacts={pageItems}
          onToggleAll={toggleAllOnPage}
          pagination={
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              from={pageStart + 1}
              to={pageStart + pageItems.length}
              total={filtered.length}
              onPageChange={setPage}
            />
          }
        />
      ) : (
        <ContactsBoard {...listHandlers} contacts={filtered} />
      )}

      {drawerContact && (
        <ContactDrawer
          key={drawerContact.id}
          contact={drawerContact}
          today={today}
          onClose={closeDrawer}
          onSaveNote={(note) => handleSaveNote(drawerContact.id, note)}
        />
      )}

      {form && (
        <ContactFormModal
          mode={form.mode}
          initialValues={form.mode === "edit" ? toInput(form.contact) : emptyValues}
          onSubmit={handleSubmit}
          submitting={busy}
          onClose={closeForm}
        />
      )}

      {deleteIds && (
        <ConfirmDeleteModal
          names={deleteNames}
          submitting={busy}
          onConfirm={confirmDelete}
          onClose={closeDelete}
        />
      )}

      {notice && (
        <div
          role="status"
          className="neu-card fixed right-6 bottom-6 z-[80] flex items-center gap-2 rounded-2xl px-4 py-3 text-label-md"
        >
          <Icon
            name={notice.tone === "error" ? "error" : "check_circle"}
            size={18}
            className={notice.tone === "error" ? "text-error" : "text-tertiary"}
          />
          {notice.text}
        </div>
      )}
    </div>
  );
}

function toInput(contact: Contact): ContactInput {
  return {
    name: contact.name,
    company: contact.company,
    email: contact.email,
    phone: contact.phone,
    lineId: contact.lineId,
    channel: contact.channel,
    interest: contact.interest,
    status: contact.status,
    followUpAt: contact.followUpAt,
    note: contact.note,
    owner: contact.owner,
  };
}
