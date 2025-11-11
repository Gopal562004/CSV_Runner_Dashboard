import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metrics } from "@/types";
import { formatMiles } from "@/lib/utils";
import { TrendingUp, TrendingDown, Award, Activity } from "lucide-react";

interface MetricsCardsProps {
  metrics: Metrics;
  title: string;
}

export function MetricsCards({ metrics, title }: MetricsCardsProps) {
  const cards = [
    {
      title: "Average Miles",
      value: formatMiles(metrics.average),
      icon: TrendingUp,
      description: "Per run",
    },
    {
      title: "Max Miles",
      value: formatMiles(metrics.max),
      icon: Award,
      description: "Longest run",
    },
    {
      title: "Min Miles",
      value: formatMiles(metrics.min),
      icon: TrendingDown,
      description: "Shortest run",
    },
    {
      title: "Total Miles",
      value: formatMiles(metrics.total),
      icon: Activity,
      description: `Across ${metrics.count} runs`,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
