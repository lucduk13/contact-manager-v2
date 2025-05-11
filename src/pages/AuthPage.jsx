import { createSignal } from "solid-js";
import { supabase } from "../supabaseClient";

export default function AuthPage() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");

  const handleLogin = async () => {
    try {
      await pocketbase.collection('users').authWithPassword(email(), password());
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async () => {
    try {
      await pocketbase.collection('users').create({ email: email(), password: password() });
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="p-6 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl mb-4">Prijava / Registracija</h1>
        {error() && <p class="text-red-500">{error()}</p>}
        <input
          type="email"
          placeholder="Email"
          class="input input-bordered w-full mb-2"
          value={email()}
          onInput={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          class="input input-bordered w-full mb-2"
          value={password()}
          onInput={(e) => setPassword(e.target.value)}
        />
        <div class="flex justify-between">
          <button class="btn btn-primary" onClick={handleLogin}>
            Prijava
          </button>
          <button class="btn btn-secondary" onClick={handleRegister}>
            Registracija
          </button>
        </div>
      </div>
    </div>
  );
}
