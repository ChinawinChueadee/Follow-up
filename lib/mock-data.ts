// Mock data สำหรับหน้า Dashboard (ยังไม่เชื่อม Database)

export type Tone = "primary" | "secondary" | "tertiary" | "error" | "muted";

export type SummaryStat = {
  label: string;
  value: number;
  unit: string;
  icon: string;
  tone: Tone;
  valueTone?: Tone;
  badge?: { label: string; icon?: string; tone: Tone; pulse?: boolean };
  note: string;
  noteIcon?: string;
};

export type FollowUpAction = {
  label?: string;
  icon: string;
  variant: "primary" | "neutral" | "success";
};

export type FollowUp = {
  id: string;
  name: string;
  initials: string;
  company: string;
  companyIcon: string;
  channel: { label: string; icon: string; tone: Tone };
  tag: { label: string; tone: Tone; urgent?: boolean };
  time: { label: string; icon: string; tone: Tone };
  subject: string;
  note: string;
  actions: FollowUpAction[];
};

export type StatusSlice = {
  label: string;
  count: number;
  tone: Tone;
};

export type ChannelStat = {
  label: string;
  icon: string;
  percent: number;
  count: number;
  tone: Tone;
};

export type Activity = {
  id: string;
  icon: string;
  tone: Tone;
  prefix: string;
  contact: string;
  suffix?: string;
  detail?: string;
  status?: { label: string; tone: Tone };
  timeAgo: string;
};

export const currentUser = {
  name: "คุณศรัณย์ น.",
  firstName: "คุณศรัณย์",
  role: "Sales & Relations Lead",
  initials: "ศน",
};

export const todayLabel = "วันพฤหัสบดีที่ 24 ตุลาคม 2024";
export const pendingHandoffCount = 3;

export const summaryStats: SummaryStat[] = [
  {
    label: "ทั้งหมดในระบบ",
    value: 142,
    unit: "ราย",
    icon: "contacts",
    tone: "primary",
    badge: { label: "+12%", icon: "trending_up", tone: "tertiary" },
    note: "จากสัปดาห์ก่อน",
  },
  {
    label: "ต้องติดตามวันนี้",
    value: 6,
    unit: "ราย",
    icon: "alarm",
    tone: "error",
    valueTone: "error",
    badge: { label: "เร่งติดต่อด่วน", tone: "error", pulse: true },
    note: "3 รายช่วงเช้า",
  },
  {
    label: "กำลังดำเนินการ",
    value: 48,
    unit: "ราย",
    icon: "pending_actions",
    tone: "secondary",
    noteIcon: "forum",
    note: "อยู่ระหว่างเสนอราคา / รอการตอบ",
  },
  {
    label: "สำเร็จแล้ว",
    value: 82,
    unit: "ราย",
    icon: "task_alt",
    tone: "tertiary",
    valueTone: "tertiary",
    badge: { label: "ปิดการขาย 57.7%", tone: "tertiary" },
    note: "ตามเป้าหมาย",
  },
];

export const followUpBaseActions: FollowUpAction[] = [
  { label: "เช็คว่าติดต่อแล้ว", icon: "check_circle", variant: "success" },
  { label: "บันทึกโน้ต", icon: "edit_note", variant: "neutral" },
  { label: "เลื่อนนัด", icon: "event_repeat", variant: "neutral" },
];

export const todayFollowUps: FollowUp[] = [
  {
    id: "fu-1",
    name: "คุณกวินทร์ เตชะสกุล",
    initials: "กต",
    company: "บริษัท สยาม โลจิสติกส์ จำกัด • ผู้จัดการฝ่ายจัดซื้อ",
    companyIcon: "apartment",
    channel: { label: "โทรศัพท์", icon: "call", tone: "primary" },
    tag: { label: "ด่วนมาก", tone: "error", urgent: true },
    time: { label: "10:30 น. (เลยกำหนด)", icon: "schedule", tone: "error" },
    subject: "โทรติดตามใบเสนอราคา",
    note: "สนใจแพ็กเกจ Enterprise แต่ต้องการขอส่วนลดพิเศษ 10% สำหรับการชำระเงินรายปี",
    actions: [
      { icon: "call", variant: "primary" },
      { icon: "mail", variant: "neutral" },
    ],
  },
  {
    id: "fu-2",
    name: "คุณณภัทร วัฒนพงษ์",
    initials: "ณว",
    company: "อินโนเวทีฟ ฟินเทค โซลูชั่น • CTO",
    companyIcon: "domain",
    channel: { label: "Google Meet", icon: "video_camera_front", tone: "secondary" },
    tag: { label: "นัดหมาย Demo", tone: "muted" },
    time: { label: "14:00 น. (อีก 2 ชม.)", icon: "alarm", tone: "secondary" },
    subject: "สรุปความต้องการ CRM",
    note: "เตรียมสไลด์สาธิตฟีเจอร์ Multi-pipeline และการเชื่อมต่อ Webhook สำหรับทีมวิศวกร",
    actions: [{ label: "เข้าห้องประชุม", icon: "open_in_new", variant: "primary" }],
  },
  {
    id: "fu-3",
    name: "คุณอภิสิทธิ์ จันทร์โอภาส",
    initials: "อภ",
    company: "โฮมมี่ คาเฟ่ แอนด์ เบเกอรี่ เชน • เจ้าของกิจการ",
    companyIcon: "storefront",
    channel: { label: "LINE Official", icon: "chat", tone: "tertiary" },
    tag: { label: "รอเอกสารเพิ่มเติม", tone: "muted" },
    time: { label: "15:30 น.", icon: "schedule", tone: "muted" },
    subject: "ส่งตัวอย่างแคตตาล็อกสินค้า",
    note: "ลูกค้าต้องการดูสเปกเครื่องพิมพ์ใบเสร็จและระบบ POS รองรับการขยาย 5 สาขา",
    actions: [{ label: "เปิดแชท LINE", icon: "chat", variant: "success" }],
  },
  {
    id: "fu-4",
    name: "คุณวิภาดา รัตนโชติ",
    initials: "วร",
    company: "บางกอก มีเดีย กรุ๊ป • Head of Procurement",
    companyIcon: "corporate_fare",
    channel: { label: "อีเมล", icon: "mail", tone: "primary" },
    tag: { label: "กำลังเจรจา", tone: "secondary" },
    time: { label: "16:45 น.", icon: "schedule", tone: "muted" },
    subject: "ตรวจแบบร่างสัญญาจ้าง",
    note: "ส่งเอกสาร NDA เรียบร้อย นัดทบทวนเงื่อนไข SLA ประจำปีรอบสุดท้าย",
    actions: [{ icon: "forward_to_inbox", variant: "neutral" }],
  },
  {
    id: "fu-5",
    name: "ดร.ศราวุธ สุขเกษม",
    initials: "ศก",
    company: "เฮลท์แคร์ อินโนเวชั่น เซ็นเตอร์ • Managing Director",
    companyIcon: "health_and_safety",
    channel: { label: "นัดพบ On-site", icon: "handshake", tone: "primary" },
    tag: { label: "ลงนามสัญญา", tone: "muted" },
    time: { label: "17:30 น.", icon: "schedule", tone: "muted" },
    subject: "อาคารสาทรธานี 2 ชั้น 18",
    note: "เตรียมนัดคุยพร้อมทีมกฎหมายและนำเอกสารต้นฉบับ 2 ชุดไปให้เซ็นกำกับ",
    actions: [{ label: "แผนที่", icon: "navigation", variant: "neutral" }],
  },
];

export const queueFilters = ["ทั้งหมด", "เร่งด่วน", "นัดหมาย"];

export const statusBreakdown: StatusSlice[] = [
  { label: "สำเร็จ (ปิดงาน)", count: 82, tone: "tertiary" },
  { label: "กำลังดำเนินการ", count: 48, tone: "secondary" },
  { label: "รอการติดต่อ", count: 12, tone: "error" },
];

export const channelStats: ChannelStat[] = [
  { label: "โทรศัพท์สายตรง", icon: "call", percent: 45, count: 64, tone: "primary" },
  { label: "LINE Official Account", icon: "chat", percent: 35, count: 50, tone: "tertiary" },
  { label: "จดหมายอิเล็กทรอนิกส์ (Email)", icon: "mail", percent: 15, count: 21, tone: "secondary" },
  { label: "นัดหมายพบปะ / ประชุม", icon: "handshake", percent: 5, count: 7, tone: "muted" },
];

export const recentActivities: Activity[] = [
  {
    id: "act-1",
    icon: "check",
    tone: "tertiary",
    prefix: "โทรคุยกับ",
    contact: "คุณชลธิชา",
    suffix: "เรียบร้อยแล้ว",
    status: { label: "สำเร็จ (ปิดการขาย)", tone: "tertiary" },
    timeAgo: "12 นาทีที่แล้ว",
  },
  {
    id: "act-2",
    icon: "send",
    tone: "secondary",
    prefix: "ส่งใบเสนอราคาให้",
    contact: "คุณพงศกร",
    suffix: "ทางอีเมล",
    status: { label: "กำลังดำเนินการ", tone: "secondary" },
    timeAgo: "45 นาทีที่แล้ว",
  },
  {
    id: "act-3",
    icon: "calendar_add_on",
    tone: "primary",
    prefix: "เพิ่มหมายเหตุใหม่สำหรับ",
    contact: "คุณเมธา",
    detail: "นัดหมายนำเสนอ Demo ระบบวันจันทร์หน้า 10:00 น.",
    timeAgo: "2 ชั่วโมงที่แล้ว",
  },
];
