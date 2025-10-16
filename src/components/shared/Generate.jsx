export default function Generate(input, extras = {}) {
  let payload = {};

  if (typeof input === "string") {
    payload.placement = input;
  } else if (Array.isArray(input)) {
    if (input.length > 0) payload.placement = input[0];
    if (input.length > 1 && typeof input[1] === "object" && input[1] !== null) {
      Object.assign(payload, input[1]);
    }
  } else if (typeof input === "object" && input !== null) {
    payload = { ...input };
  } else {
    throw new Error("Invalid input for Generate()");
  }

  // Chuẩn hóa & validate
  payload.placement = String(payload.placement || "").toLowerCase();
  if (!["hdd", "ssd"].includes(payload.placement)) {
    throw new Error("placement must be 'hdd' or 'ssd'");
  }

  // Chỉ gửi các field cho phép (hiện tại chỉ placement)
  const allowed = ["placement"];
  const out = {};
  for (const k of allowed) if (k in payload) out[k] = payload[k];

  return out;
}