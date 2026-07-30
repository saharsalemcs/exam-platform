import { PieChart, Pie, Cell, Tooltip } from "recharts";

const SEGMENTS = [
  { key: "passed", label: "Passed", color: "var(--color-accent)" },
  { key: "failed", label: "Failed", color: "var(--color-danger)" },
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { label, value } = payload[0].payload;
  return (
    <div
      className="z-50 rounded-[var(--radius-sm)] px-4 py-2.5 text-center"
      style={{
        backgroundColor: "var(--color-surface-2)",
        border: "1px solid var(--color-border)",
      }}
    >
      <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
        {label}
      </p>
      <p className="text-lg font-bold" style={{ color: "var(--color-text)" }}>
        {value}
      </p>
    </div>
  );
}

function PassFailDonutChart({ breakdown }) {
  const { passed, failed, total } = breakdown;
  const data = SEGMENTS.map((s) => ({ ...s, value: breakdown[s.key] }));
  const isEmpty = total === 0;

  return (
    <div className="flex items-center gap-6">
      <div className="relative h-40 w-40 shrink-0">
        <PieChart width={160} height={160}>
          <Pie
            data={isEmpty ? [{ label: "Empty", value: 1 }] : data}
            dataKey="value"
            innerRadius={55}
            outerRadius={78}
            startAngle={90}
            endAngle={-270}
            stroke="none"
          >
            {(isEmpty ? [{ color: "var(--color-border)" }] : data).map(
              (d, i) => (
                <Cell key={i} fill={d.color} />
              ),
            )}
          </Pie>
          {!isEmpty && (
            <Tooltip
              content={<CustomTooltip />}
              wrapperStyle={{ zIndex: 100 }}
            />
          )}
        </PieChart>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-2xl font-extrabold"
            style={{ color: "var(--color-text)" }}
          >
            {total}
          </span>
          <span
            className="text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            Total
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        {SEGMENTS.map((s) => {
          const value = breakdown[s.key];
          const pct = total ? Math.round((value / total) * 100) : 0;
          return (
            <div key={s.key} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                <span
                  className="flex-1 text-sm"
                  style={{ color: "var(--color-text)" }}
                >
                  {s.label}
                </span>
                <span
                  className="text-sm font-bold"
                  style={{ color: "var(--color-text)" }}
                >
                  {value}
                </span>
                <span
                  className="w-9 text-right text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {pct}%
                </span>
              </div>
              <div
                className="h-1.5 w-full overflow-hidden rounded-full"
                style={{ backgroundColor: "var(--color-surface-2)" }}
              >
                <div
                  className="h-full rounded-full transition-[width] duration-500 ease-out"
                  style={{ width: `${pct}%`, backgroundColor: s.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PassFailDonutChart;
