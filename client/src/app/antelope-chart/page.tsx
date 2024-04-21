import BaChart from "@/components/AntelopeChart/BaChart";
import PiChart from "@/components/AntelopeChart/PiChart";
import { Antelope } from "@/components/AntelopeTable/types/AntelopeType";

import fetchData from "@/utils/fetchData";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function aggregateByContinent(antelopes: Antelope[]) {
  const aggregatedData = {
    Africa: 0,
    Asia: 0,
  };

  antelopes.map((antelope) => {
    const { continent } = antelope;

    if (continent === "Africa") {
      aggregatedData.Africa++;
    } else if (continent === "Asia") {
      aggregatedData.Asia++;
    }
  });

  // The 'Object.entries' method returns an array of a given object's own enumerable string-keyed property [key, value] pairs.
  const chartData = Object.entries(aggregatedData).map(
    ([continent, value]) => ({
      name: continent,
      value,
    })
  );

  return chartData;
}

function aggregateByHorns(antelopes: Antelope[]) {
  const aggregatedData = {
    Twisted: { count: 0, totalWeight: 0, totalHeight: 0 },
    Straight: { count: 0, totalWeight: 0, totalHeight: 0 },
    Spiky: { count: 0, totalWeight: 0, totalHeight: 0 },
    Spiraled: { count: 0, totalWeight: 0, totalHeight: 0 },
    "Lyre-shaped": { count: 0, totalWeight: 0, totalHeight: 0 },
    Curved: { count: 0, totalWeight: 0, totalHeight: 0 },
  };

  antelopes.map((antelope) => {
    const { horns, weight, height } = antelope;
    const { count, totalWeight, totalHeight } = aggregatedData[horns];

    // Example: aggregatedData["Twisted"] = { count: 0, totalWeight: 0, totalHeight: 0 }
    aggregatedData[horns] = {
      count: count + 1,
      totalWeight: totalWeight + weight,
      totalHeight: totalHeight + height,
    };
  });

  const chartData = Object.entries(aggregatedData).map(([horns, data]) => ({
    name: horns,
    weight: data.totalWeight / data.count,
    height: data.totalHeight / data.count,
  }));

  return chartData;
}

export default async function AntelopeChartPage() {
  const pieData = await fetchData<{ name: string; value: number }[]>(
    `${apiUrl}/all-antelopes`,
    aggregateByContinent
  );

  const barData = await fetchData<
    { name: string; weight: number; height: number }[]
  >(`${apiUrl}/all-antelopes`, aggregateByHorns);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-4 md:px-0 gap-8 w-full">
      <div className="w-full max-w-7xl px-4">
        <div className="flex justify-between items-center w-full pt-4">
          <Link href="/">
            <Button>← Go Back Home</Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 mt-6">
            Antelope Analysis Dashboard
          </h1>
          <Link href="/antelope-table">
            <Button>View Antelope Table →</Button>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full mt-4">
          <div className="text-center md:w-1/2">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Continent Distribution
            </h2>
            <p className="text-md mb-6">
              This pie chart shows the distribution of antelopes by continent.
            </p>
            <PiChart data={pieData} />
          </div>

          <div className="text-center md:w-1/2">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Average Weight and Height by Horn Type
            </h2>
            <p className="text-md mb-6">
              This bar chart represents the average weight and height of
              antelopes categorized by the type of their horns.
            </p>
            <BaChart data={barData} />
          </div>
        </div>
      </div>
    </main>
  );
}
