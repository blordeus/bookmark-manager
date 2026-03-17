"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signupAction } from "@/actions/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthFormMessage } from "@/components/auth/auth-form-message";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthInput } from "@/components/auth/auth-input";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";

const initialState = {
  success: false,
  error: null,
};

export default function SignupPage() {
  const [state, formAction] = useActionState(signupAction, initialState);

  return (
    <AuthCard>
      <AuthHeader
        title="Create your account"
        description="Join us and start saving your favorite links — organized, searchable, and always within reach."
      />

      <form action={formAction} className="space-y-250">
        <AuthInput label="Full name *" name="fullName" />
        <AuthInput label="Email address *" name="email" type="email" />
        <AuthInput label="Password *" name="password" type="password" />

        <AuthFormMessage
          message={
            state.success
              ? "Account created. Check your email to confirm your account."
              : state.error
          }
          success={state.success}
        />

        <AuthSubmitButton>Create account</AuthSubmitButton>
      </form>

      <p className="mt-300 text-center text-[14px] font-medium text-neutral-800 dark:text-darkneutral-100">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-teal-800 hover:underline dark:text-white"
        >
          Log in
        </Link>
      </p>
    </AuthCard>
  );
}