"use client";

import { FunctionComponent, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Paint } from "@/app/types/paint";

interface PaintingsTableProps {
  paintings: Paint[]
}

const PaintingsTable: FunctionComponent<PaintingsTableProps> = ({paintings}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredPaintings = paintings.filter((painting) =>
    painting.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (id: number) => {
    router.push(`/paintings/${id}`);
  };

  const isEndDatePassed = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-4">
        <Input
          placeholder="Search paintings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead className="min-w-[150px]">Name</TableHead>
                  <TableHead className="min-w-[200px]">Description</TableHead>
                  <TableHead className="min-w-[100px]">Start price</TableHead>
                  <TableHead className="min-w-[100px]">Best bid</TableHead>
                  <TableHead className="min-w-[100px]">Bid end date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPaintings.map((painting) => (
                  <TableRow
                    key={painting.id}
                    onClick={() => handleRowClick(painting.id)}
                    className={cn(
                      "cursor-pointer hover:bg-muted/50",
                      isEndDatePassed(painting.endBid) &&
                        "bg-red-100 hover:bg-red-200"
                    )}
                  >
                    <TableCell>
                      <Image
                        src={painting.image}
                        alt={painting.name}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {painting.name}
                    </TableCell>
                    <TableCell>{painting.description}</TableCell>
                    <TableCell>
                      ${painting.startPrice.toLocaleString()}
                    </TableCell>
                    <TableCell>${0}</TableCell>
                    <TableCell>{painting.endBid}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );

};

export default PaintingsTable;
