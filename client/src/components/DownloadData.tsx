"use client";

import { useState } from "react";
import { Suspense } from "react";

import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { SyncLoader } from "react-spinners";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// react-icons
import { MdOutlineFileDownload } from "react-icons/md";

type DownloadDataProps = {
  name: string;
  continent: string;
  weight: number;
  height: number;
  horns: string;
  picture: string;
};

export default function DownloadData({
  name,
  continent,
  weight,
  height,
  horns,
  picture,
}: DownloadDataProps) {
  const [isLoading, setIsLoading] = useState(false);

  function handleDownloadPDF() {
    const capture = document.getElementById("capture");
    setIsLoading(true);

    if (!capture) {
      setIsLoading(false);

      console.error("Element not found");
      return;
    }

    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setIsLoading(false);
      doc.save("antelope-data.pdf");
    });
  }

  return (
    <div className="flex flex-col items-center min-h-screen gap-20">
      <Button
        variant="outline"
        className="self-end"
        onClick={handleDownloadPDF}
        disabled={isLoading}
      >
        {isLoading ? (
          <SyncLoader color="#000" size={8} />
        ) : (
          <span className="flex items-center gap-3">
            Download <MdOutlineFileDownload className="h-6 w-6" />
          </span>
        )}
      </Button>

      <div
        className="flex flex-col md:flex-row gap-8 justify-center items-center"
        id="capture"
      >
        <Card className=" md:w-6/12 bg-white shadow-lg">
          <Suspense
            fallback={
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            }
          >
            <Image
              src={picture}
              alt={name}
              layout="responsive"
              width={200}
              height={200}
              className="object-cover"
            />
          </Suspense>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{`Continent: ${continent}`}</CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-full md:w-4/12 mx-auto bg-white shadow-lg">
          <CardHeader className="text-center">
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <p>{`Weight: ${weight} kg`}</p>
            <p>{`Height: ${height} cm`}</p>
            <p>{`Horns: ${horns}`}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
