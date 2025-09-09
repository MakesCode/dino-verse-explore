import { createFileRoute } from '@tanstack/react-router';
import Hero from "@/components/Hero";
import Encyclopedia from "@/components/Encyclopedia";

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Encyclopedia />
    </div>
  );
}
