import React from "react";
import { motion } from "framer-motion";

function StatCard({
  label,
  title,
  value,
  details = [],
  isLoading = false,
  error = "",
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-3xl border border-black/10 bg-black/[0.02] p-7 md:p-8"
    >
      <p className="text-xs uppercase tracking-[0.22em] text-black/45">{label}</p>

      <div className="mt-7">
        <h3 className="text-base font-medium text-black/70">{title}</h3>

        {isLoading ? (
          <div className="mt-4 animate-pulse space-y-3">
            <div className="h-9 w-2/3 rounded bg-black/10" />
            <div className="h-4 w-1/2 rounded bg-black/10" />
          </div>
        ) : error ? (
          <p className="mt-4 text-sm leading-relaxed text-black/60">{error}</p>
        ) : (
          <>
            <p className="mt-3 text-3xl font-medium leading-tight text-black md:text-4xl">
              {value}
            </p>

            {details.length > 0 && (
              <dl className="mt-7 space-y-3 text-sm text-black/65">
                {details.map((detail) => (
                  <div
                    key={`${detail.label}-${detail.value}`}
                    className="flex items-center justify-between gap-4"
                  >
                    <dt className="text-black/50">{detail.label}</dt>
                    <dd className="text-right text-black/75">{detail.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </>
        )}
      </div>
    </motion.article>
  );
}

export default StatCard;