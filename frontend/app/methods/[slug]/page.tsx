import MethodDetailClient from "@/components/domain/methods/MethodDetailClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function MethodDetailPage({ params }: Props) {
  const { slug } = await params;
  return <MethodDetailClient slug={slug} />;
}
