"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "@/actions/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthFormMessage } from "@/components/auth/auth-form-message";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthInput } from "@/components/auth/auth-input";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";

const initialState = {
  success: false,
  error: null,
};

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <AuthCard>
      <AuthHeader
        title="Log in to your account"
        description="Welcome back. Enter your details to continue managing your bookmarks."
      />

      <form action={formAction} className="space-y-250">
        <AuthInput label="Email address" name="email" type="email" />
        <AuthInput label="Password" name="password" type="password" />

        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-[14px] font-medium text-teal-800 hover:underline dark:text-white"
          >
            Forgot password?
          </Link>
        </div>

        <AuthFormMessage message={state.error} />

        <AuthSubmitButton>Log in</AuthSubmitButton>
      </form>

      <p className="mt-300 text-center text-[14px] font-medium text-neutral-800 dark:text-darkneutral-100">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-teal-800 hover:underline dark:text-white"
        >
          Sign up
        </Link>
      </p>
    </AuthCard>
  );
}