const DEFAULT_WHATSAPP = "5493794123456";

export function normalizeWhatsAppNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("549")) return digits;
  if (digits.startsWith("54")) return `549${digits.slice(2)}`;
  if (digits.startsWith("9")) return `54${digits}`;
  if (digits.length === 10) return `549${digits}`;
  return digits;
}

export function getWhatsAppLink(
  message: string,
  phone?: string | null
): string {
  const number = normalizeWhatsAppNumber(phone || DEFAULT_WHATSAPP);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildBudgetWhatsAppMessage(data: {
  name: string;
  businessName: string;
  rubro: string;
  serviceNeeded: string;
  budgetApprox?: string | null;
  message?: string | null;
  code: string;
}): string {
  return [
    "Hola Desarrollo Web NEA, quiero pedir presupuesto.",
    "",
    `Nombre: ${data.name}`,
    `Negocio: ${data.businessName}`,
    `Rubro: ${data.rubro}`,
    `Necesito: ${data.serviceNeeded}`,
    `Presupuesto aproximado: ${data.budgetApprox || "A definir"}`,
    `Mensaje: ${data.message || "Sin mensaje adicional"}`,
    `Código: ${data.code}`,
  ].join("\n");
}

export function buildConsultWhatsAppMessage(code: string): string {
  return `Hola Desarrollo Web NEA, quiero consultar el estado de mi solicitud. Código: ${code}`;
}
