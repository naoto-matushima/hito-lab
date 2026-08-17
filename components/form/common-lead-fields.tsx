import { Checkbox } from "./checkbox";
import { FormField } from "./form-field";
import { Input, Textarea, Select } from "./input";
import { HoneypotField } from "./honeypot-field";

export type IndustryOption = { id: string; label: string };

/** docs/07-conversion-lead.md §6・§9: 4CV共通の入力項目 */
export type CommonLeadFieldsProps = {
  industries: IndustryOption[];
  fieldErrors?: Record<string, string>;
};

export function CommonLeadFields({ industries, fieldErrors }: CommonLeadFieldsProps) {
  return (
    <>
      <FormField label="会社名" htmlFor="companyName" required error={fieldErrors?.companyName}>
        <Input id="companyName" name="companyName" required hasError={Boolean(fieldErrors?.companyName)} />
      </FormField>

      <FormField
        label="会社URL"
        htmlFor="companyUrl"
        required
        hint="https://から入力してください"
        error={fieldErrors?.companyUrl}
      >
        <Input
          id="companyUrl"
          name="companyUrl"
          type="url"
          placeholder="https://example.com/"
          required
          hasError={Boolean(fieldErrors?.companyUrl)}
        />
      </FormField>

      <FormField label="氏名" htmlFor="personName" required error={fieldErrors?.personName}>
        <Input id="personName" name="personName" required hasError={Boolean(fieldErrors?.personName)} />
      </FormField>

      <FormField label="メールアドレス" htmlFor="email" required error={fieldErrors?.email}>
        <Input id="email" name="email" type="email" required hasError={Boolean(fieldErrors?.email)} />
      </FormField>

      <FormField label="役職" htmlFor="role" required error={fieldErrors?.role}>
        <Input id="role" name="role" required hasError={Boolean(fieldErrors?.role)} />
      </FormField>

      <FormField label="業界" htmlFor="industry" required error={fieldErrors?.industry}>
        <Select id="industry" name="industry" required hasError={Boolean(fieldErrors?.industry)} defaultValue="">
          <option value="" disabled>
            選択してください
          </option>
          {industries.map((industry) => (
            <option key={industry.id} value={industry.id}>
              {industry.label}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField label="電話番号（任意）" htmlFor="phone" error={fieldErrors?.phone}>
        <Input id="phone" name="phone" type="tel" hasError={Boolean(fieldErrors?.phone)} />
      </FormField>

      <FormField label="現在の課題（任意）" htmlFor="issue" error={fieldErrors?.issue}>
        <Textarea id="issue" name="issue" rows={4} hasError={Boolean(fieldErrors?.issue)} />
      </FormField>

      <Checkbox
        id="privacyPolicyAgreed"
        name="privacyPolicyAgreed"
        value="true"
        required
        error={fieldErrors?.privacyPolicyAgreed}
        label={
          <>
            <a href="/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              プライバシーポリシー
            </a>
            に同意する
          </>
        }
      />

      <HoneypotField />
    </>
  );
}
