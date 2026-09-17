type IconProps = {
  name: string;
  size?: number;
  className?: string;
};

// กำหนดขนาดผ่าน style เพราะ stylesheet ของ Material Symbols ไม่ได้อยู่ใน layer ของ Tailwind
export function Icon({ name, size = 20, className = "" }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined select-none ${className}`}
      style={{ fontSize: size }}
    >
      {name}
    </span>
  );
}
