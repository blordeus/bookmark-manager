"use client";

import Link from "next/link";
import { useActionState } from "react";
import { forgotPasswordAction } from "@/actions/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthFormMessage } from "@/components/auth/auth-form-message";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthInput } from "@/components/auth/auth-input";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";

const initialState = {
  success: false,
  error: null,
};

export default function ForgotPasswordPage() {
  const [state, formAction] = useActionState(forgotPasswordAction, initialState);

  return (
    <AuthCard>
      <AuthHeader
        title="Forgot your password?"
        description="Enter the email address you used when you joined and we’ll send you instructions to reset your password."
      />

      <form action={formAction} className="space-y-250">
        <AuthInput label="Email address *" name="email" type="email" />

        <AuthFormMessage
          message={
            state.success
              ? "Password reset link sent. Check your email."
              : state.error
          }
          success={state.success}
        />

        <AuthSubmitButton>Send reset link</AuthSubmitButton>
      </form>

      <p className="mt-300 text-center text-[14px] font-medium text-neutral-800 dark:text-darkneutral-100">
        <Link
          href="/login"
          className="font-semibold text-teal-800 hover:underline dark:text-white"
        >
          Back to login
        </Link>
      </p>
    </AuthCard>
  );
}