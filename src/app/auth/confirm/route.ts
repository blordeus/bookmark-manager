import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next");
  const nextPath = next?.startsWith("/") ? next : null;
  const defaultPath = nextPath ?? "/dashboard";

  const redirectToPath = () => {
    if (nextPath) {
      redirect(nextPath);
    }

    redirect(type === "recovery" ? "/reset-password" : defaultPath);
  };

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      redirectToPath();
    }
  }

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      redirectToPath();
    }
  }

  redirect("/login");
}
