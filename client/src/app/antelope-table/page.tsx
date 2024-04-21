import AntelopeTable from "@/components/AntelopeTable/DataTable";

import fetchData from "@/utils/fetchData";

import { Antelope } from "@/components/AntelopeTable/types/AntelopeType";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function AntelopeTablePage() {
  const tableData: Antelope[] = await fetchData(`${apiUrl}/all-antelopes`);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center md:px-0">
      <div className="w-full max-w-6xl py-4">
        <div className="flex justify-between items-center mb-4">
          <Link href="/">
            <Button>← Back to Home</Button>
          </Link>
          <Link href="/antelope-chart">
            <Button>View Chart Page →</Button>
          </Link>
        </div>
        <AntelopeTable data={tableData} />
      </div>
    </div>
  );
}
