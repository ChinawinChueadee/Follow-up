import { Icon } from "@/components/ui/Icon";

type SectionCardProps = {
  icon: string;
  title: string;
  badge: React.ReactNode;
  children: React.ReactNode;
};

export function SectionCard({ icon, title, badge, children }: SectionCardProps) {
  return (
    <div className="neu-card rounded-3xl p-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="neu-flat flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-primary">
            <Icon name={icon} size={18} />
          </div>
          <h3 className="text-title-md font-bold">{title}</h3>
        </div>
        {badge}
      </div>
      {children}
    </div>
  );
}
