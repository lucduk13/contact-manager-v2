import { createSignal, onMount, createEffect } from "solid-js";
import { supabase } from "./supabaseClient";
import HomePage from "./pages/HomePage";
import ContactsPage from "./pages/ContactsPage";
import AuthPage from "./pages/AuthPage";

export default function App() {
  const [session, setSession] = createSignal(null);

  onMount(async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    setSession(sessionData.session);

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  });

  return (
    <div class="min-h-screen bg-pink-100">
      {!session() ? (
        <AuthPage />
      ) : (
        <div>
          <nav class="bg-pink-500 text-white p-5 flex justify-between">
            <h1 class="text-xl">Upravitelj kontakata</h1>
            <button class="btn btn-secondary" onClick={() => supabase.auth.signOut()}>
              Odjava
            </button>
          </nav>
          <main class="p-4">
            <HomePage />
            <ContactsPage userId={session()?.user?.id} />
          </main>
        </div>
      )}
    </div>
  );
}
