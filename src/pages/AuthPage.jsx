import { createSignal } from "solid-js";
import { supabase } from "../supabaseClient";

export default function AuthPage() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email(),
      password: password(),
    });
    if (error) setError(error.message);
  };

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({
      email: email(),
      password: password(),
    });
    if (error) setError(error.message);
  };

  return (
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="p-6 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl mb-4">Login / Register</h1>
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
            Login
          </button>
          <button class="btn btn-secondary" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
