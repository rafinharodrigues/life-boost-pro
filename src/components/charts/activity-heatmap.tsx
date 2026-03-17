'use client';

import { useMemo } from 'react';

interface HeatmapDataPoint {
  date: string;
  xp: number;
  tasks: number;
}

interface ActivityHeatmapProps {
  data: HeatmapDataPoint[];
}

const DAY_LABELS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const INTENSITY_CLASSES = [
  'bg-white/5',
  'bg-[#39FF14]/20',
  'bg-[#39FF14]/40',
  'bg-[#39FF14]/60',
  'bg-[#39FF14]/80',
] as const;

function getIntensityIndex(xp: number): number {
  if (xp === 0) return 0;
  if (xp <= 50) return 1;
  if (xp <= 100) return 2;
  if (xp <= 150) return 3;
  return 4;
}

const MONTH_NAMES = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
];

interface CellData {
  date: string;
  xp: number;
  tasks: number;
  dayOfWeek: number;
}

export default function ActivityHeatmap({ data }: ActivityHeatmapProps) {
  const { columns, monthLabels } = useMemo(() => {
    // Build a lookup map for quick access
    const lookup = new Map<string, HeatmapDataPoint>();
    for (const d of data) {
      lookup.set(d.date, d);
    }

    // Sort dates to determine range
    const sortedDates = [...data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    if (sortedDates.length === 0) {
      return { columns: [], monthLabels: [] };
    }

    const startDate = new Date(sortedDates[0].date);
    const endDate = new Date(sortedDates[sortedDates.length - 1].date);

    // Build all days from start to end
    const allDays: CellData[] = [];
    const current = new Date(startDate);
    while (current <= endDate) {
      const dateStr = current.toISOString().split('T')[0];
      const entry = lookup.get(dateStr);
      allDays.push({
        date: dateStr,
        xp: entry?.xp ?? 0,
        tasks: entry?.tasks ?? 0,
        dayOfWeek: current.getDay(),
      });
      current.setDate(current.getDate() + 1);
    }

    // Group into columns (weeks). Each column has 7 rows (Sun=0 .. Sat=6).
    // First column may have empty top cells if start isn't Sunday.
    const cols: (CellData | null)[][] = [];
    let colIndex = 0;

    // Pad the first week with nulls before the start day
    if (allDays.length > 0) {
      const firstDow = allDays[0].dayOfWeek;
      if (firstDow > 0) {
        const firstCol: (CellData | null)[] = Array(firstDow).fill(null);
        cols.push(firstCol);
        colIndex = 0;
      }
    }

    for (const day of allDays) {
      if (!cols[colIndex]) {
        cols[colIndex] = [];
      }
      cols[colIndex].push(day);
      if (cols[colIndex].length === 7) {
        colIndex++;
      }
    }

    // Pad last column to 7 if needed
    const lastCol = cols[cols.length - 1];
    if (lastCol && lastCol.length < 7) {
      while (lastCol.length < 7) {
        lastCol.push(null);
      }
    }

    // Derive month labels with column positions
    const labels: { label: string; colStart: number }[] = [];
    let lastMonth = -1;

    for (let c = 0; c < cols.length; c++) {
      // Find the first non-null cell in this column
      const firstCell = cols[c].find((cell): cell is CellData => cell !== null);
      if (firstCell) {
        const month = new Date(firstCell.date).getMonth();
        if (month !== lastMonth) {
          labels.push({ label: MONTH_NAMES[month], colStart: c });
          lastMonth = month;
        }
      }
    }

    return { columns: cols, monthLabels: labels };
  }, [data]);

  return (
    <div className="bg-bg-secondary border border-white/6 rounded-xl p-4">
      <h3 className="text-text-primary text-sm font-semibold mb-3">
        Mapa de Atividade
      </h3>

      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-1">
          {/* Month labels row */}
          <div className="flex" style={{ paddingLeft: 20 }}>
            {columns.map((_, colIdx) => {
              const label = monthLabels.find((m) => m.colStart === colIdx);
              return (
                <div
                  key={`month-${colIdx}`}
                  className="text-text-tertiary text-[10px]"
                  style={{ width: 16, minWidth: 16 }}
                >
                  {label?.label ?? ''}
                </div>
              );
            })}
          </div>

          {/* Grid rows */}
          {Array.from({ length: 7 }).map((_, rowIdx) => (
            <div key={`row-${rowIdx}`} className="flex items-center gap-0">
              {/* Day label */}
              <div
                className="text-text-tertiary text-[10px] leading-none"
                style={{ width: 20, minWidth: 20 }}
              >
                {rowIdx % 2 === 0 ? DAY_LABELS[rowIdx] : ''}
              </div>

              {/* Cells for this row across all columns */}
              <div className="flex gap-[3px]">
                {columns.map((col, colIdx) => {
                  const cell = col[rowIdx];
                  if (!cell) {
                    return (
                      <div
                        key={`empty-${colIdx}-${rowIdx}`}
                        className="h-3 w-3 rounded-sm"
                      />
                    );
                  }

                  const intensity = getIntensityIndex(cell.xp);
                  return (
                    <div
                      key={`cell-${colIdx}-${rowIdx}`}
                      className={`h-3 w-3 rounded-sm transition-colors ${INTENSITY_CLASSES[intensity]}`}
                      title={`${cell.date}: ${cell.xp} XP, ${cell.tasks} tarefas`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-text-tertiary">
        <span>Menos</span>
        {INTENSITY_CLASSES.map((cls, i) => (
          <div key={i} className={`h-3 w-3 rounded-sm ${cls}`} />
        ))}
        <span>Mais</span>
      </div>
    </div>
  );
}
