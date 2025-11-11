// "use client";

// import { useState } from "react";
// import { CSVUploader } from "@/components/csv-uploader";
// import { MetricsCards } from "@/components/metrics-cards";
// import { OverallChart } from "@/components/charts/overall-chart";
// import { PersonChart } from "@/components/charts/person-chart";
// import { DataTable } from "@/components/data-table";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";
// import { ParsedData } from "@/types";
// import { Activity, Users, BarChart3, Table as TableIcon } from "lucide-react";

// export default function Home() {
//   const [parsedData, setParsedData] = useState<ParsedData | null>(null);

//   const handleDataParsed = (data: ParsedData | null) => {
//     setParsedData(data);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="container mx-auto py-8 px-4">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
//             <Activity className="h-8 w-8 text-blue-600" />
//             CSV Runner Dashboard
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Upload your running data CSV and get detailed visualizations and
//             metrics
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Uploader */}
//           <div className="lg:col-span-1">
//             <CSVUploader onDataParsed={handleDataParsed} />

//             {/* Sample Data Info */}
//             {!parsedData && (
//               <Card className="mt-6">
//                 <CardHeader>
//                   <CardTitle className="text-sm">Sample CSV Format</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-xs font-mono bg-gray-100 p-3 rounded">
//                     date,person,miles run
//                     <br />
//                     2024-01-01,John,3.2
//                     <br />
//                     2024-01-01,Jane,2.8
//                     <br />
//                     2024-01-02,John,4.1
//                     <br />
//                     2024-01-02,Jane,3.5
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//           </div>

//           {/* Right Column - Visualizations */}
//           <div className="lg:col-span-2">
//             {!parsedData ? (
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Welcome!</CardTitle>
//                   <CardDescription>
//                     Upload a CSV file to see your running data visualizations
//                     and metrics.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="text-center py-12">
//                   <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-500">
//                     Your charts and metrics will appear here after uploading a
//                     CSV file.
//                   </p>
//                 </CardContent>
//               </Card>
//             ) : (
//               <Tabs defaultValue="overview" className="space-y-6">
//                 <TabsList className="grid grid-cols-4 w-full">
//                   <TabsTrigger
//                     value="overview"
//                     className="flex items-center gap-2"
//                   >
//                     <BarChart3 className="h-4 w-4" />
//                     Overview
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="people"
//                     className="flex items-center gap-2"
//                   >
//                     <Users className="h-4 w-4" />
//                     By Person
//                   </TabsTrigger>
//                   <TabsTrigger value="data" className="flex items-center gap-2">
//                     <TableIcon className="h-4 w-4" />
//                     Raw Data
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="metrics"
//                     className="flex items-center gap-2"
//                   >
//                     <Activity className="h-4 w-4" />
//                     Metrics
//                   </TabsTrigger>
//                 </TabsList>

//                 {/* Overview Tab */}
//                 <TabsContent value="overview" className="space-y-6">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Overall Running Summary</CardTitle>
//                       <CardDescription>
//                         Combined running data across all people
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <MetricsCards
//                         metrics={parsedData.overallMetrics}
//                         title="Overall Metrics"
//                       />
//                       <Separator className="my-6" />
//                       <OverallChart data={parsedData.data} />
//                     </CardContent>
//                   </Card>
//                 </TabsContent>

//                 {/* People Tab */}
//                 <TabsContent value="people" className="space-y-6">
//                   {Object.keys(parsedData.personMetrics).map((person) => (
//                     <Card key={person}>
//                       <CardHeader>
//                         <CardTitle className="flex items-center gap-2">
//                           <Users className="h-5 w-5" />
//                           {person}'s Running Data
//                         </CardTitle>
//                       </CardHeader>
//                       <CardContent>
//                         <MetricsCards
//                           metrics={parsedData.personMetrics[person]}
//                           title={`${person}'s Metrics`}
//                         />
//                         <Separator className="my-6" />
//                         <PersonChart data={parsedData.data} person={person} />
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </TabsContent>

//                 {/* Data Tab */}
//                 <TabsContent value="data">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Raw Running Data</CardTitle>
//                       <CardDescription>
//                         All uploaded running records ({parsedData.data.length}{" "}
//                         total)
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <DataTable data={parsedData.data} />
//                     </CardContent>
//                   </Card>
//                 </TabsContent>

//                 {/* Metrics Tab */}
//                 <TabsContent value="metrics">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Detailed Metrics Comparison</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="space-y-6">
//                         {/* Overall Metrics */}
//                         <div>
//                           <h3 className="text-lg font-semibold mb-4">
//                             Overall Metrics
//                           </h3>
//                           <MetricsCards
//                             metrics={parsedData.overallMetrics}
//                             title=""
//                           />
//                         </div>

//                         <Separator />

//                         {/* Per-Person Metrics */}
//                         <div>
//                           <h3 className="text-lg font-semibold mb-4">
//                             Per-Person Metrics
//                           </h3>
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {Object.entries(parsedData.personMetrics).map(
//                               ([person, metrics]) => (
//                                 <Card key={person}>
//                                   <CardHeader>
//                                     <CardTitle className="flex items-center gap-2">
//                                       <Badge variant="secondary">
//                                         {person}
//                                       </Badge>
//                                     </CardTitle>
//                                   </CardHeader>
//                                   <CardContent>
//                                     <div className="space-y-2 text-sm">
//                                       <div className="flex justify-between">
//                                         <span>Average:</span>
//                                         <span className="font-semibold">
//                                           {metrics.average.toFixed(1)} miles
//                                         </span>
//                                       </div>
//                                       <div className="flex justify-between">
//                                         <span>Min:</span>
//                                         <span className="font-semibold">
//                                           {metrics.min.toFixed(1)} miles
//                                         </span>
//                                       </div>
//                                       <div className="flex justify-between">
//                                         <span>Max:</span>
//                                         <span className="font-semibold">
//                                           {metrics.max.toFixed(1)} miles
//                                         </span>
//                                       </div>
//                                       <div className="flex justify-between">
//                                         <span>Total:</span>
//                                         <span className="font-semibold">
//                                           {metrics.total.toFixed(1)} miles
//                                         </span>
//                                       </div>
//                                       <div className="flex justify-between">
//                                         <span>Runs:</span>
//                                         <span className="font-semibold">
//                                           {metrics.count}
//                                         </span>
//                                       </div>
//                                     </div>
//                                   </CardContent>
//                                 </Card>
//                               )
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//               </Tabs>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { CSVUploader } from "@/components/csv-uploader";
import { MetricsCards } from "@/components/metrics-cards";
import { OverallChart } from "@/components/charts/overall-chart";
import { PersonChart } from "@/components/charts/person-chart";
import { DataTable } from "@/components/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ParsedData } from "@/types";
import {
  Activity,
  Users,
  BarChart3,
  Table as TableIcon,
  Upload,
  TrendingUp,
  Calendar,
  User,
  FileText,
  Target,
  Download,
  BarChart4,
} from "lucide-react";

export default function Home() {
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);

  const handleDataParsed = (data: ParsedData | null) => {
    setParsedData(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100/30">
      <div className="container mx-auto py-4 px-3 max-w-7xl">
        {/* Header - Compact */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-xs border border-gray-200/60 mb-3">
            <Activity className="h-5 w-5 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Run Analytics
          </h1>
          <p className="text-sm text-gray-600 max-w-md mx-auto leading-tight">
            Upload CSV for running analytics and performance metrics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Uploader */}
          <div className="lg:col-span-1">
            <Card className="border border-gray-200/60 shadow-xs bg-white/50 backdrop-blur-xs">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <Upload className="h-4 w-4 text-blue-600" />
                  Data Import
                </CardTitle>
                <CardDescription className="text-xs">
                  Upload running data CSV
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <CSVUploader onDataParsed={handleDataParsed} />
              </CardContent>
            </Card>

            {/* Sample Data Info */}
            {!parsedData && (
              <Card className="mt-4 border border-gray-200/60 shadow-xs">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-gray-500" />
                    Expected Format
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-[11px] font-mono bg-gray-50/80 border border-gray-200 rounded-md p-2 text-gray-600 leading-tight">
                    <div className="text-gray-900 font-semibold mb-1">
                      Headers:
                    </div>
                    date,person,miles
                    <div className="mt-2 text-gray-900 font-semibold mb-1">
                      Example:
                    </div>
                    2024-01-01,John,3.2
                    <br />
                    2024-01-01,Jane,2.8
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Visualizations */}
          <div className="lg:col-span-2">
            {!parsedData ? (
              <Card className="border border-gray-200/60 shadow-xs bg-white/50 backdrop-blur-xs h-full">
                <CardHeader className="text-center pb-3">
                  <CardTitle className="flex items-center justify-center gap-2 text-lg">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    Analytics Dashboard
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Comprehensive running analytics
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center py-8">
                  <div className="w-16 h-16 bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-center mx-auto mb-4">
                    <BarChart4 className="h-6 w-6 text-blue-600/70" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1.5">
                    No Data Uploaded
                  </h3>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                    Upload CSV to unlock charts, metrics, and running insights.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid grid-cols-4 w-full p-1 bg-gray-100/50 rounded-lg border border-gray-200/60 h-9">
                  <TabsTrigger
                    value="overview"
                    className="flex items-center gap-1.5 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-xs data-[state=active]:border data-[state=active]:border-gray-200 text-xs h-7"
                  >
                    <BarChart3 className="h-3.5 w-3.5" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="people"
                    className="flex items-center gap-1.5 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-xs data-[state=active]:border data-[state=active]:border-gray-200 text-xs h-7"
                  >
                    <Users className="h-3.5 w-3.5" />
                    Individuals
                  </TabsTrigger>
                  <TabsTrigger
                    value="data"
                    className="flex items-center gap-1.5 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-xs data-[state=active]:border data-[state=active]:border-gray-200 text-xs h-7"
                  >
                    <TableIcon className="h-3.5 w-3.5" />
                    Data
                  </TabsTrigger>
                  <TabsTrigger
                    value="metrics"
                    className="flex items-center gap-1.5 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-xs data-[state=active]:border data-[state=active]:border-gray-200 text-xs h-7"
                  >
                    <Target className="h-3.5 w-3.5" />
                    Metrics
                  </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                  <Card className="border border-gray-200/60 shadow-xs bg-white/50 backdrop-blur-xs">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        Running Overview
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Combined metrics and trends
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <MetricsCards
                        metrics={parsedData.overallMetrics}
                        title="Performance Summary"
                      />
                      <Separator className="bg-gray-200/40" />
                      <div>
                        <h4 className="text-xs font-medium text-gray-900 mb-3 flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-gray-500" />
                          Running Trends
                        </h4>
                        <OverallChart data={parsedData.data} />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* People Tab */}
                <TabsContent value="people" className="space-y-4">
                  {Object.keys(parsedData.personMetrics).map((person) => (
                    <Card
                      key={person}
                      className="border border-gray-200/60 shadow-xs bg-white/50 backdrop-blur-xs"
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base">
                          <User className="h-4 w-4 text-blue-600" />
                          <span className="truncate">{person}'s Runs</span>
                          <Badge
                            variant="secondary"
                            className="ml-1 bg-blue-50 text-blue-700 border-blue-200 text-xs px-1.5 py-0 h-5"
                          >
                            {parsedData.personMetrics[person].count}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <MetricsCards
                          metrics={parsedData.personMetrics[person]}
                          title={`${person}'s Metrics`}
                        />
                        <Separator className="bg-gray-200/40" />
                        <div>
                          <h4 className="text-xs font-medium text-gray-900 mb-3">
                            Progress Timeline
                          </h4>
                          <PersonChart data={parsedData.data} person={person} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                {/* Data Tab */}
                <TabsContent value="data">
                  <Card className="border border-gray-200/60 shadow-xs bg-white/50 backdrop-blur-xs">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <TableIcon className="h-4 w-4 text-blue-600" />
                        Running Records
                        <Badge
                          variant="secondary"
                          className="text-xs bg-gray-100 text-gray-700 border-gray-200"
                        >
                          {parsedData.data.length}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-xs">
                        All uploaded running sessions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DataTable data={parsedData.data} />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Metrics Tab */}
                <TabsContent value="metrics">
                  <Card className="border border-gray-200/60 shadow-xs bg-white/50 backdrop-blur-xs">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Target className="h-4 w-4 text-blue-600" />
                        Performance Metrics
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Detailed comparison and analysis
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Overall Metrics */}
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-1.5">
                            <BarChart3 className="h-4 w-4 text-gray-500" />
                            Team Overview
                          </h3>
                          <MetricsCards
                            metrics={parsedData.overallMetrics}
                            title=""
                          />
                        </div>

                        <Separator className="bg-gray-200/40" />

                        {/* Per-Person Metrics */}
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-1.5">
                            <Users className="h-4 w-4 text-gray-500" />
                            Individual Performance
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(parsedData.personMetrics).map(
                              ([person, metrics]) => (
                                <Card
                                  key={person}
                                  className="border border-gray-200/60 shadow-xs bg-white"
                                >
                                  <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-sm">
                                      <Badge
                                        variant="secondary"
                                        className="bg-blue-50 text-blue-700 border-blue-200 font-medium text-xs px-2 py-0 h-6"
                                      >
                                        {person}
                                      </Badge>
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="pt-0">
                                    <div className="space-y-2 text-xs">
                                      <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                                        <span className="text-gray-600">
                                          Average
                                        </span>
                                        <span className="font-semibold text-gray-900 text-xs">
                                          {metrics.average.toFixed(1)} mi
                                        </span>
                                      </div>
                                      <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                                        <span className="text-gray-600">
                                          Min
                                        </span>
                                        <span className="font-semibold text-gray-900 text-xs">
                                          {metrics.min.toFixed(1)} mi
                                        </span>
                                      </div>
                                      <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                                        <span className="text-gray-600">
                                          Max
                                        </span>
                                        <span className="font-semibold text-gray-900 text-xs">
                                          {metrics.max.toFixed(1)} mi
                                        </span>
                                      </div>
                                      <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                                        <span className="text-gray-600">
                                          Total
                                        </span>
                                        <span className="font-semibold text-gray-900 text-xs">
                                          {metrics.total.toFixed(1)} mi
                                        </span>
                                      </div>
                                      <div className="flex justify-between items-center py-1">
                                        <span className="text-gray-600">
                                          Sessions
                                        </span>
                                        <span className="font-semibold text-gray-900 text-xs">
                                          {metrics.count}
                                        </span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}