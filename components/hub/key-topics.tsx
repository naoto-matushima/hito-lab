import type { HubTopic } from "@/lib/validation";

/** docs/05-page-template.md §22: 主要課題・論点 */
export function KeyTopics({ title, topics }: { title: string; topics: HubTopic[] }) {
  return (
    <section className="my-12">
      <h2>{title}</h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <div key={topic.title} className="rounded-lg border border-border bg-surface p-5">
            <p className="font-bold text-text">{topic.title}</p>
            <p className="mt-2 text-sm text-text-secondary">{topic.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
