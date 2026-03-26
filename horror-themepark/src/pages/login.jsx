import { useAuth } from "../context/authContext";

export default function Login() {
  const { login } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Select Role</h2>

      <button onClick={() => login("visitor")}>Visitor</button>
      <button onClick={() => login("employee")}>Employee</button>
      <button onClick={() => login("manager")}>Manager</button>
      <button onClick={() => login("admin")}>Admin</button>
    </div>
  );
}