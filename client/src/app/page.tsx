import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
        Welcome to the Antelope Dashboard
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Explore various statistics and insights about antelopes around the
        world.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <Link href="/antelope-chart">
          <Button>View Antelope Chart</Button>
        </Link>
        <Link href="/antelope-table">
          <Button>Browse Antelopes</Button>
        </Link>
      </div>
    </main>
  );
}
