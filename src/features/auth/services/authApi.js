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
    .select("id, full_name, role, avatar_url, grade, department, has_password")
    .eq("id", session.user.id)
    .single();

  if (profileError) throw profileError;

  return { user: session.user, profile };
}

export async function register(fullName, email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName.trim(),
        role: "student",
      },
      emailRedirectTo: window.location.origin + "/login",
    },
  });

  if (error) throw new Error(error.message);

  if (data?.user && data.user.identities?.length === 0) {
    throw new Error("Email already registered");
  }

  return data;
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}
export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin + "/student/dashboard",
    },
  });

  if (error) throw new Error(error.message);
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function forgotPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + "/reset-password",
  });

  if (error) throw new Error(error.message);
}

export async function resetPassword(newPassword) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw new Error(error.message);
}
