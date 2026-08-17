import { eq } from "drizzle-orm";
import { activities, companies, people } from "@/db/schema";
import { findExistingCompany, findExistingPerson } from "@/lib/lead/dedupe";
import { normalizeCompanyDomain } from "@/lib/lead/domain";
import type { LeadType } from "@/lib/validation";
import { getDb } from "./client";

export type SaveLeadInput = {
  leadType: LeadType;
  companyName: string;
  companyUrl: string;
  industry: string;
  personName: string;
  email: string;
  role: string;
  phone?: string;
  issue?: string;
  marketingConsent?: boolean;
  contentId?: string;
  reportId?: string;
  serviceCategory?: string;
  landingPage?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
};

/**
 * docs/07-conversion-lead.md §28-37・.claude/rules/leads.md:
 * Company検索→なければ作成→Person検索→なければ作成→Activity追加、の順で保存する。
 * 実DB未接続のため、この関数自体の実行検証は本フェーズでは行っていない
 * （lib/lead/dedupe.tsの判定ロジックはDB非依存でVitest検証済み）。
 */
export async function saveLead(input: SaveLeadInput) {
  const db = getDb();
  const domain = normalizeCompanyDomain(input.companyUrl);

  const existingCompanies = await db.select({ id: companies.id, domain: companies.domain }).from(companies);
  const matchedCompany = findExistingCompany(domain, existingCompanies);

  const companyId = matchedCompany
    ? matchedCompany.id
    : (
        await db
          .insert(companies)
          .values({
            name: input.companyName,
            domain,
            websiteUrl: input.companyUrl,
            industry: input.industry,
          })
          .returning({ id: companies.id })
      )[0].id;

  const existingPeople = await db.select({ id: people.id, email: people.email }).from(people);
  const matchedPerson = findExistingPerson(input.email, existingPeople);

  let personId: string;
  if (matchedPerson) {
    personId = matchedPerson.id;
    await db
      .update(people)
      .set({
        name: input.personName,
        role: input.role,
        phone: input.phone,
        marketingConsent: input.marketingConsent ?? false,
        updatedAt: new Date(),
      })
      .where(eq(people.id, personId));
  } else {
    const inserted = await db
      .insert(people)
      .values({
        companyId,
        name: input.personName,
        email: input.email,
        role: input.role,
        phone: input.phone,
        marketingConsent: input.marketingConsent ?? false,
      })
      .returning({ id: people.id });
    personId = inserted[0].id;
  }

  await db.insert(activities).values({
    companyId,
    personId,
    type: input.leadType,
    contentId: input.contentId,
    reportId: input.reportId,
    serviceCategory: input.serviceCategory,
    landingPage: input.landingPage,
    utmSource: input.utmSource,
    utmMedium: input.utmMedium,
    utmCampaign: input.utmCampaign,
    utmContent: input.utmContent,
    utmTerm: input.utmTerm,
    issue: input.issue,
  });

  return { companyId, personId };
}
