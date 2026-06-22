import supabase from "@/services/supabase";

export async function getCurrentUser() {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) throw sessionError;
  // if not logged in
  if (!session?.user) return null;

  // fetch profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, full_name, role, avatar_url")
    .eq("id", session.user.id)
    .single();

  if (profileError) throw profileError;

  return { user: session.user, profile };
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}
