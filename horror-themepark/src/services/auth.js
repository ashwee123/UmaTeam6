export function login(email, password) {
  // Simulated roles
  if (email.includes("admin")) return { role: "admin" };
  if (email.includes("manager")) return { role: "manager" };
  if (email.includes("employee")) return { role: "employee" };
  return { role: "visitor" };
}