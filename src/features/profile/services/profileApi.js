import supabase from "@/services/supabase";

export async function updateProfile(userId, { full_name, grade, department }) {
  const { error } = await supabase
    .from("profiles")
    .update({ full_name, grade, department })
    .eq("id", userId);

  if (error) throw new Error(error.message);
}

export async function uploadAvatar(userId, file) {
  // file extension
  const ext = file.name.split(".").pop();
  // كل يوزر عنده ملف ثابت ، لو رفع صورة جديدة
  // هيستبدل القديمة، الصورة القديمة هتتمسح يعني ، مش هيعمل ملفات كتير.
  // ex:  12345/avatar.jpg
  const path = `${userId}/avatar.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(path, file, { upsert: true, cacheControl: "3600" });

  if (uploadError) throw new Error(uploadError.message);

  const { data } = supabase.storage.from("avatars").getPublicUrl(path);
  // ⚠️ بما إن الاسم ثابت (upsert)، الرابط العام مش هيتغيّر شكلياً حتى
  // لو الصورة اتغيّرت، فالمتصفح ممكن يورّي نسخة قديمة من الـ cache.
  // بنضيف timestamp في الآخر (query param وهمي) عشان نجبر تحديث فعلي
  const publicUrl = `${data.publicUrl}?t=${Date.now()}`;

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", userId);

  if (updateError) throw new Error(updateError.message);

  return publicUrl;
}

export async function updatePassword({ email, currentPassword, newPassword }) {
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
  });

  if (signInError) throw new Error("Current password is incorrect");

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (updateError) throw new Error(updateError.message);
}

export async function setPassword(newPassword) {
  const {
    data: { user },
    error,
  } = await supabase.auth.updateUser({ password: newPassword });

  if (error) throw new Error(error.message);

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ has_password: true })
    .eq("id", user.id);

  if (profileError) throw new Error(profileError.message);
}
