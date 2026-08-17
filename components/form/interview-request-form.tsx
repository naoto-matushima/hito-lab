"use client";

import { useActionState } from "react";
import { submitInterviewRequest } from "@/lib/actions/lead-actions";
import { INITIAL_LEAD_ACTION_STATE } from "@/lib/actions/lead-action-state";
import { CommonLeadFields, FormStatusBanner, SubmitButton, TrackingFields } from "@/components/form";
import type { IndustryOption } from "@/components/form/common-lead-fields";

export function InterviewRequestForm({ industries }: { industries: IndustryOption[] }) {
  const [state, formAction] = useActionState(submitInterviewRequest, INITIAL_LEAD_ACTION_STATE);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {state.status === "error" && state.message && <FormStatusBanner message={state.message} />}
      <TrackingFields />
      <CommonLeadFields industries={industries} fieldErrors={state.fieldErrors} />
      <SubmitButton>取材に応募する</SubmitButton>
    </form>
  );
}
