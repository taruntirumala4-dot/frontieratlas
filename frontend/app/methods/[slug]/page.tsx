export const runtime = "edge";

import { redirect } from "next/navigation";
import MethodDetailClient from "@/components/domain/methods/MethodDetailClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function MethodDetailPage({ params }: Props) {
  const { slug } = await params;

  if (slug === "mcp") {
    redirect("/methods/model-context-protocol-mcp");
  }

  return <MethodDetailClient slug={slug} />;
}