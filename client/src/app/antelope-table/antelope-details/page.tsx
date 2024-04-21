// ShadcnUI imports
import { Antelope } from "@/components/AntelopeTable/types/AntelopeType";
import DownloadData from "@/components/DownloadData";

import fetchData from "@/utils/fetchData";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type AntelopeDetailsPageProps = {
  searchParams: {
    antelope: string;
  };
};

export default async function AntelopeDetailsPage({
  searchParams,
}: AntelopeDetailsPageProps) {
  const { antelope } = searchParams;

  console.log("Slug:", antelope); // debug

  const convertedName = convertName(antelope);
  //   console.log("Converted name: ", convertedName); // debug

  const tableData: Antelope = await fetchData(
    `${apiUrl}/all-antelopes/${convertedName}`
  );
  console.log("Table data: ", tableData); // debug

  const { name, continent, weight, height, horns, picture } = tableData;

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Antelope Details
      </h1>
      <DownloadData
        name={name}
        continent={continent}
        weight={weight}
        height={height}
        horns={horns}
        picture={picture}
      />
    </main>
  );
}

function convertName(str: string) {
  // Convert the string to lowercase
  const lowerCase = str.toLowerCase();

  // Replace hyphens with spaces
  const spaces = lowerCase.replace("-", " ");

  // Convert the first letter of only the first word to uppercase
  const firstLetter = spaces.charAt(0).toUpperCase();

  const name = firstLetter + spaces.slice(1);

  // console.log("Converted name: ", name); // debug

  // Return the converted string
  return name;
}
