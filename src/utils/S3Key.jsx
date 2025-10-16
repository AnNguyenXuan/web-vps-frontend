export function downloadJson(obj, filename = "s3-credentials.json") {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function validateKeyfileShape(data) {
  if (typeof data !== "object" || data === null) return "Invalid JSON";
  const required = ["access_key", "secret_key", "default_placement"];
  for (const k of required) {
    if (!(k in data)) return `Missing field: ${k}`;
  }
  if (!["hdd", "ssd"].includes(String(data.default_placement))) {
    return "default_placement must be 'hdd' or 'ssd'";
  }
  return null; // ok
}
