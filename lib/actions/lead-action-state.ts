/**
 * "use server"ファイル（lead-actions.ts）は非同期関数以外をexportできないため、
 * 型と初期値はこの別ファイルに分離する。
 */
export type LeadActionState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Record<string, string>;
};

export const INITIAL_LEAD_ACTION_STATE: LeadActionState = { status: "idle" };
