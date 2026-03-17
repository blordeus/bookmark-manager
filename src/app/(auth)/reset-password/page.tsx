"use client";

import Link from "next/link";
import { useActionState } from "react";
import { resetPasswordAction } from "@/actions/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthFormMessage } from "@/components/auth/auth-form-message";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthInput } from "@/components/auth/auth-input";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";

const initialState = {
  success: false,
  error: null,
};

export default function ResetPasswordPage() {
  const [state, formAction] = useActionState(resetPasswordAction, initialState);

  return (
    <AuthCard>
      <AuthHeader
        title="Reset your password"
        description="Choose a new password for your account."
      />

      <form action={formAction} className="space-y-250">
        <AuthInput label="New password *" name="password" type="password" />
        <AuthInput
          label="Confirm password *"
          name="confirmPassword"
          type="password"
        />

        <AuthFormMessage message={state.error} />

        <AuthSubmitButton>Reset password</AuthSubmitButton>
      </form>

      <p className="mt-300 text-center text-[14px] font-medium text-muted">
        <Link
          href="/login"
          className="font-semibold text-teal-800 hover:underline"
        >
          Back to login
        </Link>
      </p>
    </AuthCard>
  );
}
