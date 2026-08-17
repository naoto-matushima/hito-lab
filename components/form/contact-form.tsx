"use client";

import { useActionState } from "react";
import { submitContact } from "@/lib/actions/lead-actions";
import { INITIAL_LEAD_ACTION_STATE } from "@/lib/actions/lead-action-state";
import { CommonLeadFields, FormStatusBanner, SubmitButton, TrackingFields } from "@/components/form";
import type { IndustryOption } from "@/components/form/common-lead-fields";

export function ContactForm({ industries }: { industries: IndustryOption[] }) {
  const [state, formAction] = useActionState(submitContact, INITIAL_LEAD_ACTION_STATE);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {state.status === "error" && state.message && <FormStatusBanner message={state.message} />}
      <TrackingFields />
      <CommonLeadFields industries={industries} fieldErrors={state.fieldErrors} />
      <SubmitButton>送信する</SubmitButton>
    </form>
  );
}
