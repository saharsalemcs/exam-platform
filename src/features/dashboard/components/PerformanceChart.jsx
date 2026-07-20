import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function truncateLabel(title, max = 8) {
  if (!title) return "—";
  return title.length > max ? `${title.slice(0, max)}...` : title;
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { title, percentage } = payload[0].payload;

  return (
    <div
      className="rounded-[var(--radius-sm)] px-4 py-3 text-sm"
      style={{
        backgroundColor: "var(--color-surface-2)",
        border: "1px solid var(--color-border)",
      }}
    >
      <p style={{ color: "var(--color-text-muted)" }}>{title}</p>
      <p className="text-lg font-bold text-primary">{percentage}%</p>
    </div>
  );
}

function PerformanceChart({ data }) {
  const chartData = data.map((d) => ({ ...d, label: truncateLabel(d.title) }));

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          <defs>
            <linearGradient
              id="performanceGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="var(--color-primary)"
                stopOpacity={0.35}
              />
              <stop
                offset="100%"
                stopColor="var(--color-primary)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-border)"
            vertical={false}
          />

          <XAxis
            dataKey="label"
            tick={{ fill: "var(--color-text-muted)", fontSize: 12 }}
            axisLine={{ stroke: "var(--color-border)" }}
            tickLine={false}
          />

          <YAxis
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fill: "var(--color-text-muted)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="percentage"
            stroke="var(--color-primary)"
            strokeWidth={2}
            fill="url(#performanceGradient)"
            dot={{ r: 4, fill: "var(--color-primary)", strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PerformanceChart;
