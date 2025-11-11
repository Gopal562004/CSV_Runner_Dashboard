"use client";

import { RunData } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatMiles } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface DataTableProps {
  data: RunData[];
}

export function DataTable({ data }: DataTableProps) {
  const sortedData = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const people = [...new Set(data.map((item) => item.person))];
  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-800",
    purple: "bg-purple-100 text-purple-800",
  };

  const getPersonColor = (person: string) => {
    const index = people.indexOf(person) % Object.keys(colorMap).length;
    return Object.values(colorMap)[index];
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Person</TableHead>
            <TableHead className="text-right">Miles Run</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((run, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {formatDate(run.date)}
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={getPersonColor(run.person)}
                >
                  {run.person}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-semibold">
                {formatMiles(run.miles)} miles
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
