import Papa from "papaparse";
import { RunData, CSVValidationResult, ParsedData, Metrics } from "@/types";

export function validateCSV(csvText: string): CSVValidationResult {
  const errors: string[] = [];
  const results = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transform: (value: string, field: string) => {
      if (field === "miles run") {
        const miles = parseFloat(value);
        if (isNaN(miles) || miles < 0) {
          errors.push(`Invalid miles value: ${value}`);
        }
        return miles;
      }
      return value.trim();
    },
  });

  // Check for parsing errors
  if (results.errors.length > 0) {
    errors.push(...results.errors.map((err) => err.message));
  }

  // Validate headers
  const expectedHeaders = ["date", "person", "miles run"];
  const actualHeaders = results.meta.fields || [];

  if (actualHeaders.length === 0) {
    errors.push("CSV file appears to be empty or missing headers");
  } else {
    const missingHeaders = expectedHeaders.filter(
      (h) => !actualHeaders.includes(h)
    );
    if (missingHeaders.length > 0) {
      errors.push(`Missing required headers: ${missingHeaders.join(", ")}`);
    }
  }

  // Validate data
  const data: RunData[] = [];
  if (results.data && actualHeaders.length >= 3) {
    results.data.forEach((row: any, index: number) => {
      const date = row.date;
      const person = row.person;
      const miles = row["miles run"];

      // Validate date
      if (!date || typeof date !== "string") {
        errors.push(`Row ${index + 1}: Invalid or missing date`);
      } else if (isNaN(Date.parse(date))) {
        errors.push(`Row ${index + 1}: Invalid date format: ${date}`);
      }

      // Validate person
      if (!person || typeof person !== "string" || person.trim() === "") {
        errors.push(`Row ${index + 1}: Invalid or missing person name`);
      }

      // Validate miles
      if (typeof miles !== "number" || isNaN(miles) || miles < 0) {
        errors.push(`Row ${index + 1}: Invalid miles value: ${miles}`);
      }

      if (
        date &&
        person &&
        typeof miles === "number" &&
        !isNaN(miles) &&
        miles >= 0
      ) {
        data.push({
          date,
          person,
          miles,
        });
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: errors.length === 0 ? data : undefined,
  };
}

export function calculateMetrics(data: RunData[]): ParsedData {
  // Overall metrics
  const allMiles = data.map((d) => d.miles);
  const overallMetrics: Metrics = {
    average: allMiles.reduce((sum, miles) => sum + miles, 0) / allMiles.length,
    min: Math.min(...allMiles),
    max: Math.max(...allMiles),
    total: allMiles.reduce((sum, miles) => sum + miles, 0),
    count: allMiles.length,
  };

  // Per-person metrics
  const personMetrics: Record<string, Metrics> = {};
  const people = [...new Set(data.map((d) => d.person))];

  people.forEach((person) => {
    const personData = data.filter((d) => d.person === person);
    const personMiles = personData.map((d) => d.miles);

    personMetrics[person] = {
      average:
        personMiles.reduce((sum, miles) => sum + miles, 0) / personMiles.length,
      min: Math.min(...personMiles),
      max: Math.max(...personMiles),
      total: personMiles.reduce((sum, miles) => sum + miles, 0),
      count: personMiles.length,
    };
  });

  return {
    data,
    overallMetrics,
    personMetrics,
    errors: [],
  };
}
