/**
 * Parses the raw wait-time string returned by the TAN API into minutes.
 *
 * Known formats:
 *   "3 mn"      → 3
 *   "30 mn"     → 30
 *   "1h02"      → 62
 *   "3' "       → 3   (older format)
 *   "Proche"    → 0   (vehicle approaching)
 *   "A l'arret" → 0   (vehicle at stop)
 *
 * Returns null when the string cannot be parsed.
 */
export const parseWaitMinutes = (temps: string): number | null => {
    const t = temps.trim().toLowerCase();

    if (t === "proche" || t === "a l'arret") return 0;

    const minutes = t.match(/^(\d+)\s*mn$/);
    if (minutes) return parseInt(minutes[1], 10);

    const apostrophe = t.match(/^(\d+)['′]\s*$/);
    if (apostrophe) return parseInt(apostrophe[1], 10);

    const hourMin = t.match(/^(\d+)h(\d+)$/);
    if (hourMin) return parseInt(hourMin[1], 10) * 60 + parseInt(hourMin[2], 10);

    const hourOnly = t.match(/^(\d+)h$/);
    if (hourOnly) return parseInt(hourOnly[1], 10) * 60;

    return null;
};
