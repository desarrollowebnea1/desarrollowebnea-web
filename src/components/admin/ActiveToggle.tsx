"use client";

type ActiveToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
};

export function ActiveToggle({
  checked,
  onChange,
  label = "Registro activo (visible en el sitio)",
}: ActiveToggleProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-700/80 bg-slate-900/50 px-4 py-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-sky-500"
      />
      <span className="text-sm text-slate-300">{label}</span>
    </label>
  );
}
