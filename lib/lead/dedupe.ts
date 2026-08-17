/**
 * docs/08-technical-architecture.md §45・docs/07-conversion-lead.md §35-36:
 * Companyはdomain一致、Personはemail一致を重複判定シグナルとする。
 * DB接続なしでテストできるよう、既存レコード配列を受け取る純粋関数として実装する。
 */
export type CompanyRecord = { id: string; domain: string };
export type PersonRecord = { id: string; email: string };

export function findExistingCompany(domain: string, companies: CompanyRecord[]): CompanyRecord | undefined {
  const normalized = domain.toLowerCase();
  return companies.find((company) => company.domain.toLowerCase() === normalized);
}

export function findExistingPerson(email: string, people: PersonRecord[]): PersonRecord | undefined {
  const normalized = email.toLowerCase();
  return people.find((person) => person.email.toLowerCase() === normalized);
}
