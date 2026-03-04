import ResumePageClient from "./client"

export async function generateStaticParams() {
  const slugs = ['web', 'ml', 'embedded', 'all'];
  return slugs.map((slug) => ({ slug }));
}

export default function ResumePage({ params }) {
  const { slug } = params;
  return (
    <ResumePageClient slug={slug} />
  );
}
