"use client";

import { useActionState } from "react";
import { submitServiceLead } from "@/lib/actions/lead-actions";
import { INITIAL_LEAD_ACTION_STATE } from "@/lib/actions/lead-action-state";
import { CommonLeadFields, FormField, FormStatusBanner, Select, SubmitButton, TrackingFields } from "@/components/form";
import type { IndustryOption } from "@/components/form/common-lead-fields";
import { ServiceCategorySchema } from "@/lib/validation";

export function ServiceLeadForm({ industries }: { industries: IndustryOption[] }) {
  const [state, formAction] = useActionState(submitServiceLead, INITIAL_LEAD_ACTION_STATE);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {state.status === "error" && state.message && <FormStatusBanner message={state.message} />}
      <TrackingFields />
      <FormField label="相談カテゴリ" htmlFor="serviceCategory" required error={state.fieldErrors?.serviceCategory}>
        <Select id="serviceCategory" name="serviceCategory" required defaultValue="">
          <option value="" disabled>
            選択してください
          </option>
          {ServiceCategorySchema.options.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </FormField>
      <CommonLeadFields industries={industries} fieldErrors={state.fieldErrors} />
      <SubmitButton>相談する</SubmitButton>
    </form>
  );
}
