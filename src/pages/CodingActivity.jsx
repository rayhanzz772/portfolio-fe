import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Header from "./Header";
import CustomCursor from "../components/CustomCursor";
import { useLenis } from "../hooks/useLenis";

const ALL_TIME_BREAKDOWN_URL = import.meta.env.DEV
  ? "/api/wakapi/api/compat/wakatime/v1/users/ryz772/stats/all_time"
  : "/api/wakapi?endpoint=stats_all_time";
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || "rayhanzz772";
const HARDCODED_ADDITIONAL_HOURS = 200;

function formatCompactNumber(value) {
  if (!Number.isFinite(value)) {
    return "0";
  }

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function clampLabel(value, maxLength = 20) {
  if (!value) {
    return "-";
  }

  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1)}…`;
}

function MinimalChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null;
  }

  const row = payload[0]?.payload;
  const tooltipLabel = label || row?.name || "-";

  return (
    <div className="rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm">
      <p className="text-sm font-medium text-black">{tooltipLabel}</p>
      <p className="text-xs text-black/70">{`${row?.displayValue || "0 hrs"} • ${Number(row?.percent || 0).toFixed(2)}%`}</p>
    </div>
  );
}

function MinimalPieStatsChart({ title, subtitle, data, isLoading, error }) {
  const grayscale = ["#0e0e0e", "#2a2a2a", "#444444", "#5f5f5f", "#787878", "#919191"];

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-3xl border border-black/10 bg-black/[0.015] p-6 md:p-7"
    >
      <h3 className="text-xl font-medium text-black">{title}</h3>
      <p className="mt-1 text-sm text-black/60">{subtitle}</p>

      {isLoading ? (
        <div className="mt-6 h-[270px] animate-pulse rounded-2xl bg-black/10" />
      ) : error ? (
        <p className="mt-5 text-sm text-black/60">{error}</p>
      ) : data.length === 0 ? (
        <p className="mt-5 text-sm text-black/60">No data available yet.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<MinimalChartTooltip />} />
                <Pie
                  data={data}
                  dataKey="percent"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={96}
                  paddingAngle={2}
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth={2}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`${entry.name}-${entry.percent}`}
                      fill={grayscale[index % grayscale.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {data.map((item, index) => (
              <div
                key={`${item.name}-${item.percent}`}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: grayscale[index % grayscale.length] }}
                  />
                  <span className="text-black/80">{item.name}</span>
                </div>
                <span className="text-black/60">{item.percent.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.article>
  );
}

function MinimalStatsChart({ title, subtitle, data, isLoading, error }) {
  const grayscale = ["#0e0e0e", "#2a2a2a", "#444444", "#5f5f5f", "#787878", "#919191"];

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-3xl border border-black/10 bg-black/[0.015] p-6 md:p-7"
    >
      <h3 className="text-xl font-medium text-black">{title}</h3>
      <p className="mt-1 text-sm text-black/60">{subtitle}</p>

      {isLoading ? (
        <div className="mt-6 h-[270px] animate-pulse rounded-2xl bg-black/10" />
      ) : error ? (
        <p className="mt-5 text-sm text-black/60">{error}</p>
      ) : data.length === 0 ? (
        <p className="mt-5 text-sm text-black/60">No data available yet.</p>
      ) : (
        <div className="mt-6 h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 0, right: 18, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="2 6" stroke="rgba(0,0,0,0.08)" />
              <XAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                width={110}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgba(0,0,0,0.8)", fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.04)" }}
                content={<MinimalChartTooltip />}
              />
              <Bar dataKey="percent" radius={[0, 8, 8, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`${entry.name}-${entry.percent}`}
                    fill={grayscale[index % grayscale.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.article>
  );
}

function formatDuration(totalSeconds) {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) {
    return "0 mins";
  }

  const totalMinutes = Math.round(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours <= 0) {
    return `${minutes} mins`;
  }

  if (minutes <= 0) {
    return `${hours} hrs`;
  }

  return `${hours} hrs ${minutes} mins`;
}

function formatDateRange(startDate, endDate) {
  if (!startDate || !endDate) {
    return "Not available";
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return `${startDate} - ${endDate}`;
  }

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `${formatter.format(start)} - ${formatter.format(end)}`;
}

function CodingActivity() {
  useLenis();

  const [allTimeBreakdown, setAllTimeBreakdown] = useState({
    isLoading: true,
    error: "",
    data: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchAllTimeBreakdown = async () => {
      try {
        const response = await fetch(ALL_TIME_BREAKDOWN_URL, {
          method: "GET",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`All-time breakdown request failed (${response.status})`);
        }

        const payload = await response.json();
        const data = payload?.data;

        if (!data || typeof data !== "object") {
          throw new Error("All-time breakdown format is invalid");
        }

        setAllTimeBreakdown({ isLoading: false, error: "", data });
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        setAllTimeBreakdown({
          isLoading: false,
          error: "Unable to load all-time breakdown right now.",
          data: null,
        });
      }
    };

    fetchAllTimeBreakdown();

    return () => controller.abort();
  }, []);

  const allTimeRange = useMemo(() => {
    const start = allTimeBreakdown.data?.start;
    const end = allTimeBreakdown.data?.end;

    if (!start || !end) {
      return "Not available";
    }

    return formatDateRange(start, end);
  }, [allTimeBreakdown.data]);


  const summaryStats = useMemo(() => {
    const data = allTimeBreakdown.data;

    if (!data) {
      return [];
    }

    const adjustedTotalSeconds =
      Number(data.total_seconds || 0) + HARDCODED_ADDITIONAL_HOURS * 3600;
    const trackedDays = Number(data.days_including_holidays || 0);
    const adjustedDailyAverageSeconds =
      trackedDays > 0 ? adjustedTotalSeconds / trackedDays : 0;

    return [
      {
        label: "Total Coding Time",
        value: formatDuration(adjustedTotalSeconds),
      },
      {
        label: "Daily Average",
        value: formatDuration(adjustedDailyAverageSeconds),
      },
      {
        label: "Days Tracked",
        value: formatCompactNumber(trackedDays),
      },
      {
        label: "Total Seconds",
        value: formatCompactNumber(adjustedTotalSeconds),
      },
    ];
  }, [allTimeBreakdown.data]);

  const topLanguages = useMemo(() => {
    const extraSeconds = HARDCODED_ADDITIONAL_HOURS * 3600;
    const list = (allTimeBreakdown.data?.languages || []).map((item) => {
      const baseSeconds = Number(item?.total_seconds || 0);
      const isJSX = (item?.name || "").toLowerCase() === "jsx";
      const adjustedSeconds = isJSX ? baseSeconds + extraSeconds : baseSeconds;

      return {
        ...item,
        adjustedSeconds,
      };
    });

    const totalAdjustedSeconds = list.reduce(
      (sum, item) => sum + Number(item.adjustedSeconds || 0),
      0
    );

    return list
      .filter((item) => Number(item.adjustedSeconds) > 0)
      .sort((a, b) => Number(b.adjustedSeconds || 0) - Number(a.adjustedSeconds || 0))
      .slice(0, 6)
      .map((item) => ({
        name: clampLabel(item.name, 14),
        percent:
          totalAdjustedSeconds > 0
            ? (Number(item.adjustedSeconds || 0) / totalAdjustedSeconds) * 100
            : 0,
        displayValue: formatDuration(Number(item.adjustedSeconds || 0)),
      }));
  }, [allTimeBreakdown.data]);

  const topProjects = useMemo(() => {
    const list = allTimeBreakdown.data?.projects || [];

    return list
      .filter((item) => Number(item?.total_seconds) > 0)
      .sort((a, b) => Number(b.percent || 0) - Number(a.percent || 0))
      .slice(0, 6)
      .map((item) => ({
        name: clampLabel(item.name, 18),
        percent: Number(item.percent || 0),
        displayValue: item.text || formatDuration(item.total_seconds),
      }));
  }, [allTimeBreakdown.data]);

  const topOperatingSystems = useMemo(() => {
    const extraSeconds = HARDCODED_ADDITIONAL_HOURS * 3600;
    const list = (allTimeBreakdown.data?.operating_systems || []).map((item) => {
      const baseSeconds = Number(item?.total_seconds || 0);
      const isWindows = (item?.name || "").toLowerCase() === "windows";
      const adjustedSeconds = isWindows ? baseSeconds + extraSeconds : baseSeconds;

      return {
        ...item,
        adjustedSeconds,
      };
    });

    const totalAdjustedSeconds = list.reduce(
      (sum, item) => sum + Number(item.adjustedSeconds || 0),
      0
    );

    return list
      .filter((item) => Number(item.adjustedSeconds) > 0)
      .sort((a, b) => Number(b.adjustedSeconds || 0) - Number(a.adjustedSeconds || 0))
      .slice(0, 6)
      .map((item) => ({
        name: clampLabel(item.name, 18),
        percent:
          totalAdjustedSeconds > 0
            ? (Number(item.adjustedSeconds || 0) / totalAdjustedSeconds) * 100
            : 0,
        displayValue: formatDuration(Number(item.adjustedSeconds || 0)),
      }));
  }, [allTimeBreakdown.data]);

  const topEntitySummary = useMemo(() => {
    const topLanguage = topLanguages[0] || null;
    const topProject = topProjects[0] || null;
    const topOperatingSystem = topOperatingSystems[0] || null;

    return [
      {
        label: "Top Language",
        name: topLanguage?.name || "-",
        value: topLanguage?.displayValue || "0 mins",
        share: topLanguage ? `${topLanguage.percent.toFixed(2)}%` : "0.00%",
      },
      {
        label: "Top Project",
        name: topProject?.name || "-",
        value: topProject?.displayValue || "0 mins",
        share: topProject ? `${topProject.percent.toFixed(2)}%` : "0.00%",
      },
      {
        label: "Top Operating System",
        name: topOperatingSystem?.name || "-",
        value: topOperatingSystem?.displayValue || "0 mins",
        share: topOperatingSystem
          ? `${topOperatingSystem.percent.toFixed(2)}%`
          : "0.00%",
      },
    ];
  }, [topLanguages, topOperatingSystems, topProjects]);

  return (
    <>
      <Helmet>
        <title>Coding Activity | Rayhan Portfolio</title>
        <meta
          name="description"
          content="A glimpse into Rayhan's coding consistency and habits, powered by Wakapi."
        />
        <link rel="canonical" href="https://rayhanprojects.site/coding-activity" />
      </Helmet>

      <CustomCursor />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="min-h-screen bg-white font-helvetica text-black"
      >
        <Header theme="light" />

        <div className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-20 pt-24 md:px-10 md:pb-28 md:pt-32">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="mt-5 text-[2.5rem] font-medium leading-[0.95] sm:text-[3.2rem] md:text-[4.5rem]">
              Coding Activity
            </h1>
            <p className="mt-5 max-w-2xl text-base text-black/70 md:text-lg">
              A glimpse into my coding consistency and habits
            </p>
          </motion.header>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {allTimeBreakdown.isLoading &&
                [1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-24 animate-pulse rounded-2xl border border-black/10 bg-black/5"
                  />
                ))}

              {!allTimeBreakdown.isLoading &&
                !allTimeBreakdown.error &&
                summaryStats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="rounded-2xl border border-black/10 bg-black/[0.02] p-4"
                  >
                    <p className="text-[11px] uppercase tracking-[0.16em] text-black/50">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-lg font-medium text-black md:text-xl">
                      {stat.value}
                    </p>
                  </motion.div>
                ))}
            </div>

            {allTimeBreakdown.error && (
              <p className="mt-5 text-sm text-black/60">{allTimeBreakdown.error}</p>
            )}

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
              {allTimeBreakdown.isLoading &&
                [1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-36 animate-pulse rounded-2xl border border-black/10 bg-black/5"
                  />
                ))}

              {!allTimeBreakdown.isLoading &&
                !allTimeBreakdown.error &&
                topEntitySummary.map((item) => (
                  <motion.article
                    key={item.label}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="rounded-2xl border border-black/10 bg-black/[0.02] p-5"
                  >
                    <p className="text-[11px] uppercase tracking-[0.16em] text-black/50">
                      {item.label}
                    </p>
                    <h3 className="mt-2 text-2xl font-medium text-black">{item.name}</h3>
                    <div className="mt-4 flex items-center justify-between text-sm text-black/65">
                      <span>{item.value}</span>
                      <span>{item.share}</span>
                    </div>
                    <p className="mt-2 text-xs text-black/45">{allTimeRange}</p>
                  </motion.article>
                ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-6">
              <MinimalPieStatsChart
                title="Top Languages"
                subtitle="Percentage of all coding time"
                data={topLanguages}
                isLoading={allTimeBreakdown.isLoading}
                error={allTimeBreakdown.error}
              />

              <MinimalStatsChart
                title="Top Projects"
                subtitle="Projects with highest time share"
                data={topProjects}
                isLoading={allTimeBreakdown.isLoading}
                error={allTimeBreakdown.error}
              />
            </div>

            <div className="mt-4 md:mt-6">
              <MinimalStatsChart
                title="Top Operating Systems"
                subtitle="Operating systems by coding time share"
                data={topOperatingSystems}
                isLoading={allTimeBreakdown.isLoading}
                error={allTimeBreakdown.error}
              />
            </div>

            <motion.article
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mt-4 rounded-3xl border border-black/10 bg-black/[0.015] p-6 md:mt-6 md:p-7"
            >
              <h3 className="text-xl font-medium text-black">Contribution Heatmap</h3>
              <p className="mt-1 text-sm text-black/60">
                GitHub activity overview for {GITHUB_USERNAME}
              </p>

              <div className="mt-6 overflow-x-auto">
                <div className="min-w-[760px]">
                  <GitHubCalendar
                    username={GITHUB_USERNAME}
                    blockSize={13}
                    blockMargin={5}
                    fontSize={12}
                    colorScheme="light"
                    showWeekdayLabels
                    theme={{
                        light: [
                        "#f5f5f5", // 0 (no activity)
                        "#9e9e9e", // 1 (low)
                        "#4a4a4a", // 2 (medium mulai naik)
                        "#2b2b2b", // 3 (high kontras)
                        "#000000", // 4 (MAX — full hitam 🔥)
                        ]
                    }}
                    labels={{
                      totalCount: "{{count}} contributions in the last year",
                    }}
                  />
                </div>
                
              </div>
              
            </motion.article>

            <footer className="mt-6 pb-2 text-center">
              <p className="text-xs uppercase tracking-[0.16em] text-black/45 md:text-sm">
                Data source: tracked via Wakapi + estimated
              </p>
            </footer>
          </motion.section>
        </div>
      </motion.section>
    </>
  );
}

export default CodingActivity;