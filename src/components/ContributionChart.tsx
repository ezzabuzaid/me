import { useSignal } from "@preact/signals";

interface ContributionData {
  date: string; // YYYY-MM-DD
  count: number;
}

interface ContributionChartProps {
  data: ContributionData[];
  title: string;
  color?: "green" | "blue" | "purple" | "coral";
  label?: string;
}

const colorSchemes = {
  green: {
    0: "bg-gray-900",
    1: "bg-green-900/50",
    2: "bg-green-700/70",
    3: "bg-green-500/80",
    4: "bg-green-400",
  },
  blue: {
    0: "bg-gray-900",
    1: "bg-blue-900/50",
    2: "bg-blue-700/70",
    3: "bg-blue-500/80",
    4: "bg-blue-400",
  },
  purple: {
    0: "bg-gray-900",
    1: "bg-purple-900/50",
    2: "bg-purple-700/70",
    3: "bg-purple-500/80",
    4: "bg-purple-400",
  },
  coral: {
    0: "bg-gray-900",
    1: "bg-primary-900/50",
    2: "bg-primary-700/70",
    3: "bg-primary-500/80",
    4: "bg-primary-400",
  },
};

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count <= 2) return 2;
  if (count <= 4) return 3;
  return 4;
}

function generateWeeks(data: ContributionData[]): { date: Date; count: number }[][] {
  const dataMap = new Map(data.map((d) => [d.date, d.count]));
  const today = new Date();
  const weeks: { date: Date; count: number }[][] = [];

  // Start from 52 weeks ago
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 364);
  // Adjust to start on Sunday
  startDate.setDate(startDate.getDate() - startDate.getDay());

  let currentWeek: { date: Date; count: number }[] = [];

  for (let i = 0; i < 371; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    if (date > today) break;

    const dateStr = date.toISOString().split("T")[0] as string;
    const count = dataMap.get(dateStr) ?? 0;

    currentWeek.push({ date, count });

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function ContributionChart({ data, title, color = "green", label }: ContributionChartProps) {
  const tooltip = useSignal<{ text: string; x: number; y: number } | null>(null);
  const weeks = generateWeeks(data);
  const colors = colorSchemes[color];

  // Calculate total contributions
  const total = data.reduce((sum, d) => sum + d.count, 0);

  // Get month labels
  const monthLabels: { month: string; weekIndex: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, weekIndex) => {
    const firstDay = week[0];
    if (firstDay && firstDay.date.getMonth() !== lastMonth) {
      lastMonth = firstDay.date.getMonth();
      const monthName = months[lastMonth];
      if (monthName) {
        monthLabels.push({ month: monthName, weekIndex });
      }
    }
  });

  return (
    <div class="space-y-3">
      {/* Header */}
      <div class="flex items-center justify-between">
        <h3 class="font-[Fraunces] text-lg text-gray-100">{title}</h3>
        <span class="font-mono text-sm text-gray-500">
          {total} {label || "contributions"} in the last year
        </span>
      </div>

      {/* Chart Container */}
      <div class="relative overflow-x-auto pb-2">
        {/* Month Labels */}
        <div class="flex mb-1 ml-8">
          {monthLabels.map(({ month, weekIndex }, i) => (
            <span
              key={i}
              class="font-mono text-xs text-gray-600 absolute"
              style={{ left: `${weekIndex * 14 + 32}px` }}
            >
              {month}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div class="flex gap-[3px] mt-5">
          {/* Day Labels */}
          <div class="flex flex-col gap-[3px] mr-1">
            <span class="font-mono text-xs text-gray-600 h-[12px] leading-[12px]"></span>
            <span class="font-mono text-xs text-gray-600 h-[12px] leading-[12px]">Mon</span>
            <span class="font-mono text-xs text-gray-600 h-[12px] leading-[12px]"></span>
            <span class="font-mono text-xs text-gray-600 h-[12px] leading-[12px]">Wed</span>
            <span class="font-mono text-xs text-gray-600 h-[12px] leading-[12px]"></span>
            <span class="font-mono text-xs text-gray-600 h-[12px] leading-[12px]">Fri</span>
            <span class="font-mono text-xs text-gray-600 h-[12px] leading-[12px]"></span>
          </div>

          {/* Weeks */}
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} class="flex flex-col gap-[3px]">
              {week.map((day, dayIndex) => {
                const level = getLevel(day.count);
                return (
                  <div
                    key={dayIndex}
                    class={`w-[12px] h-[12px] ${colors[level]} border border-gray-800/50 cursor-pointer transition-all duration-150 hover:border-gray-500`}
                    onMouseEnter={(e) => {
                      const rect = (e.target as HTMLElement).getBoundingClientRect();
                      tooltip.value = {
                        text: `${day.count} ${label || "contributions"} on ${formatDate(day.date)}`,
                        x: rect.left + rect.width / 2,
                        y: rect.top - 8,
                      };
                    }}
                    onMouseLeave={() => {
                      tooltip.value = null;
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div class="flex items-center justify-end gap-2 mt-4">
          <span class="font-mono text-xs text-gray-600">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              class={`w-[12px] h-[12px] ${colors[level as 0 | 1 | 2 | 3 | 4]} border border-gray-800/50`}
            />
          ))}
          <span class="font-mono text-xs text-gray-600">More</span>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.value && (
        <div
          class="fixed z-50 px-3 py-2 text-xs font-mono text-gray-200 bg-gray-900 border border-gray-700 shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{ left: `${tooltip.value.x}px`, top: `${tooltip.value.y}px` }}
        >
          {tooltip.value.text}
        </div>
      )}
    </div>
  );
}
