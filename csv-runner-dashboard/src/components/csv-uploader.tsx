"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { validateCSV, calculateMetrics } from "@/lib/csv-parser";
import { ParsedData } from "@/types";

interface CSVUploaderProps {
  onDataParsed: (data: ParsedData | null) => void;
}

export function CSVUploader({ onDataParsed }: CSVUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processCSV = useCallback(
    (file: File) => {
      setIsProcessing(true);
      setError(null);
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const csvText = e.target?.result as string;
          const validation = validateCSV(csvText);

          if (!validation.isValid) {
            setError(`Invalid CSV: ${validation.errors[0]}`);
            onDataParsed(null);
            return;
          }

          if (validation.data) {
            const parsedData = calculateMetrics(validation.data);
            onDataParsed(parsedData);
          }
        } catch (error) {
          setError("Failed to process CSV file");
          onDataParsed(null);
        } finally {
          setIsProcessing(false);
        }
      };

      reader.onerror = () => {
        setError("Failed to read the CSV file");
        setIsProcessing(false);
        onDataParsed(null);
      };

      reader.readAsText(file);
    },
    [onDataParsed]
  );

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      processCSV(file);
    } else {
      setError("Please select a CSV file");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (file && file.type === "text/csv") {
      processCSV(file);
    } else {
      setError("Please drop a CSV file");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload CSV File</CardTitle>
        <CardDescription>
          Upload a CSV file with columns: date, person, miles run
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-gray-50 hover:bg-gray-100"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("csv-file")?.click()}
        >
          <input
            type="file"
            id="csv-file"
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isProcessing}
          />

          <div className="flex flex-col items-center justify-center space-y-4">
            {isProcessing ? (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            ) : (
              <Upload className="h-12 w-12 text-gray-400" />
            )}

            <div className="space-y-2">
              <p className="text-lg font-medium">
                {isProcessing
                  ? "Processing CSV..."
                  : "Drag & drop or click to upload"}
              </p>
              <p className="text-sm text-gray-500">
                CSV files only (date, person, miles run)
              </p>
            </div>

            <Button disabled={isProcessing}>
              <FileText className="w-4 h-4 mr-2" />
              Select CSV File
            </Button>
          </div>
        </div>

        {error && (
          <Alert className="mt-4 bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <Alert className="mt-4 bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Expected CSV format:</strong> Three columns: date
            (YYYY-MM-DD), person (string), miles run (number)
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
