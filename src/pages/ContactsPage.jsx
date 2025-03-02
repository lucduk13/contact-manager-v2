import { createSignal, onMount } from "solid-js";
import { supabase } from "../supabaseClient";

export default function ContactsPage({ userId }) {
  const [contacts, setContacts] = createSignal([]);
  const [search, setSearch] = createSignal("");
  const [newContact, setNewContact] = createSignal({ name: "", email: "", phone: "" });

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .eq("user_id", userId);
    if (!error) setContacts(data);
  };

  const addContact = async () => {
    const { error } = await supabase.from("contacts").insert({
      ...newContact(),
      user_id: userId,
    });
    if (!error) {
      setNewContact({ name: "", email: "", phone: "" });
      fetchContacts();
    }
  };

  const deleteContact = async (id) => {
    const { error } = await supabase.from("contacts").delete().eq("id", id);
    if (!error) fetchContacts();
  };

  onMount(() => {
    fetchContacts();
  });

  return (
    <div>
      <h2 class="text-xl font-bold mb-4">Vaši kontakti</h2>
      <input
        type="text"
        placeholder="Pretražite po imenu"
        class="input input-bordered mb-4 w-full"
        value={search()}
        onInput={(e) => setSearch(e.target.value)}
      />
      <ul class="space-y-4">
        {contacts()
          .filter((contact) =>
            contact.name.toLowerCase().includes(search().toLowerCase())
          )
          .map((contact) => (
            <li key={contact.id} class="p-4 bg-white rounded shadow flex justify-between">
              <div>
                <p class="font-bold">{contact.name}</p>
                <p>{contact.email}</p>
                <p>{contact.phone}</p>
              </div>
              <button class="btn btn-error" onClick={() => deleteContact(contact.id)}>
                Izbriši
              </button>
            </li>
          ))}
      </ul>
      <div class="mt-6">
        <h3 class="text-lg font-bold mb-2">Dodajte novi kontakt</h3>
        <input
          type="text"
          placeholder="Ime"
          class="input input-bordered w-full mb-2"
          value={newContact().name}
          onInput={(e) => setNewContact({ ...newContact(), name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          class="input input-bordered w-full mb-2"
          value={newContact().email}
          onInput={(e) => setNewContact({ ...newContact(), email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Telefon"
          class="input input-bordered w-full mb-2"
          value={newContact().phone}
          onInput={(e) => setNewContact({ ...newContact(), phone: e.target.value })}
        />
        <button class="btn btn-primary" onClick={addContact}>
          Dodajte kontakt
        </button>
      </div>
    </div>
  );
}
