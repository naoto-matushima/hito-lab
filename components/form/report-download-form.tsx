"use client";

import { useActionState } from "react";
import { submitReportDownload } from "@/lib/actions/lead-actions";
import { INITIAL_LEAD_ACTION_STATE } from "@/lib/actions/lead-action-state";
import { Checkbox, CommonLeadFields, FormStatusBanner, SubmitButton, TrackingFields } from "@/components/form";
import type { IndustryOption } from "@/components/form/common-lead-fields";

export type ReportDownloadFormProps = {
  industries: IndustryOption[];
  reportId: string;
  reportTitle: string;
};

/** docs/07-conversion-lead.md §21・§46: Download Formはページ後半に1つだけ配置する */
export function ReportDownloadForm({ industries, reportId, reportTitle }: ReportDownloadFormProps) {
  const [state, formAction] = useActionState(submitReportDownload, INITIAL_LEAD_ACTION_STATE);

  return (
    <form id="download-form" action={formAction} className="flex flex-col gap-5 scroll-mt-24">
      {state.status === "error" && state.message && <FormStatusBanner message={state.message} />}
      <input type="hidden" name="reportId" value={reportId} />
      <input type="hidden" name="contentId" value={reportId} />
      <TrackingFields />
      <CommonLeadFields industries={industries} fieldErrors={state.fieldErrors} />
      {/* 11-open-issues.md B-4: メール配信同意 */}
      <Checkbox
        id="marketingConsent"
        name="marketingConsent"
        value="true"
        label="人手不足研究所から関連情報を受け取る"
      />
      <SubmitButton>{reportTitle}をダウンロードする</SubmitButton>
    </form>
  );
}
