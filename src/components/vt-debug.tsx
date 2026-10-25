"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  measureViewport,
  readVtConfig,
  runThemeTransition,
  setVtOffset,
  type ViewportMetrics,
  type VtConfig,
  type VtReport,
} from "./theme-transition";

/**
 * On-screen instrument panel for the Samsung View Transition investigation.
 *
 * Mounted once in the root layout. It renders nothing unless the URL contains
 * ?vtdebug=1, so production visitors never load the panel, never create the probe
 * element, and never read pseudo-element styles.
 */

type Payload = {
  config: VtConfig;
  offset: number;
  live: ViewportMetrics | null;
  reports: VtReport[];
};

function formatLive(live: ViewportMetrics): string {
  return [
    `iw ${live.innerWidth}  ih ${live.innerHeight}  ow ${live.outerWidth}  oh ${live.outerHeight}`,
    `scr ${live.screenWidth}x${live.screenHeight}  dpr ${live.devicePixelRatio}  client ${live.clientHeight}`,
    `vv ${live.vvWidth}x${live.vvHeight}  offTop ${live.vvOffsetTop}  offLeft ${live.vvOffsetLeft}  pageTop ${live.vvPageTop}  scale ${live.vvScale}`,
    `scroll ${live.scrollX},${live.scrollY}  lvh ${live.lvh}  svh ${live.svh}  dvh ${live.dvh}`,
    `lvh-svh ${live.lvhMinusSvh}  lvh-dvh ${live.lvhMinusDvh}  standalone ${String(live.standalone)}`,
    `ua ${live.ua.slice(0, 96)}`,
  ].join("\n");
}

function formatReport(report: VtReport): string {
  const root = report.pseudo["::view-transition-group(root)"];
  const pair = report.pseudo["::view-transition-image-pair(root)"];
  const incoming = report.pseudo["::view-transition-new(root)"];
  const header = report.pseudo["::view-transition-group(site-header)"];
  const shell = report.pseudo["::view-transition-group(theme-shell)"];
  const shellNew = report.pseudo["::view-transition-new(theme-shell)"];

  return [
    `t=${report.at}  mode=${report.mode}  src=${report.source}  origin=${report.origin}`,
    `appliedDy=${report.appliedDy}`,
    `candidates probe=${report.candidates.probe} offTop=${report.candidates.offsetTop} chrome=${report.candidates.chrome} chromeCur=${report.candidates.chromeCurrent} geometry=${report.candidates.geometry}`,
    `geometry: ${report.geometryReason}`,
    `probe  from=${String(report.probe.fromTy)} to=${String(report.probe.toTy)} static=${String(report.probe.staticTy)} translate=${String(report.probe.translateTy)}`,
    `root   from=${String(report.rootGroup.fromTy)} to=${String(report.rootGroup.toTy)} static=${String(report.rootGroup.staticTy)}`,
    `rootGroup  top=${root?.top ?? "-"} w=${root?.width ?? "-"} h=${root?.height ?? "-"} tf=${root?.transform ?? "-"} tr=${root?.translate ?? "-"} z=${root?.zIndex ?? "-"} anim=${root?.animationName ?? "-"}/${root?.animationPlayState ?? "-"}`,
    `pair       w=${pair?.width ?? "-"} h=${pair?.height ?? "-"} tf=${pair?.transform ?? "-"}`,
    `incoming   w=${incoming?.width ?? "-"} h=${incoming?.height ?? "-"} fit=${incoming?.objectFit ?? "-"} tf=${incoming?.transform ?? "-"}`,
    `headerGrp  w=${header?.width ?? "-"} h=${header?.height ?? "-"} tf=${header?.transform ?? "-"} ty=${String(header?.ty ?? "-")}`,
    shell
      ? `shellGrp   w=${shell.width} h=${shell.height} tf=${shell.transform} tr=${shell.translate} ty=${shell.ty}`
      : "",
    shellNew
      ? `shellNew   w=${shellNew.width} h=${shellNew.height} anim=${shellNew.animationName} clip=${shellNew.animationName === "none" ? "-" : "animated"}`
      : "",
    `rootRectTop=${report.rootRectTop} bodyRectTop=${report.bodyRectTop}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export default function VtDebug() {
  const [enabled, setEnabled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [offset, setOffset] = useState(0);
  const [live, setLive] = useState<ViewportMetrics | null>(null);
  const [reports, setReports] = useState<VtReport[]>([]);
  const [status, setStatus] = useState("");
  const panelRef = useRef<HTMLDivElement | null>(null);
  const reportsRef = useRef<VtReport[]>([]);
  const liveRef = useRef<ViewportMetrics | null>(null);

  useEffect(() => {
    const config = readVtConfig();
    if (!config.debug) return;
    setEnabled(true);
    setOffset(config.dy ?? 0);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    panelRef.current?.style.setProperty("view-transition-name", "vt-debug-panel");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    let last = 0;
    const tick = (time: number) => {
      if (time - last > 400) {
        last = time;
        try {
          const next = measureViewport();
          liveRef.current = next;
          setLive(next);
        } catch {
          /* ignore */
        }
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const onReport = (event: Event) => {
      const detail = (event as CustomEvent<VtReport>).detail;
      if (!detail) return;
      const next = [detail, ...reportsRef.current].slice(0, 4);
      reportsRef.current = next;
      setReports(next);
    };
    window.addEventListener("vt:report", onReport);
    return () => window.removeEventListener("vt:report", onReport);
  }, [enabled]);

  const nudge = useCallback((delta: number) => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("vtdy");
      window.history.replaceState(null, "", url.toString());
    } catch {
      /* ignore */
    }
    setOffset((current) => {
      const next = Math.round(current + delta);
      setVtOffset(next);
      setStatus(`dy ${next >= 0 ? "+" : ""}${next}px`);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("vtdy");
      window.history.replaceState(null, "", url.toString());
    } catch {
      /* ignore */
    }
    setVtOffset(null);
    setOffset(0);
    setStatus("dy reset");
  }, []);

  const runTest = useCallback(() => {
    setStatus("running no-op reveal");
    runThemeTransition(() => {}, {});
  }, []);

  const stopAuto = useCallback(() => {
    try {
      window.localStorage.setItem("ag_auto_cycle", "0");
    } catch {
      /* ignore */
    }
    setStatus("auto cycle off, reloading");
    window.location.reload();
  }, []);

  const copy = useCallback(async () => {
    const payload: Payload = {
      config: readVtConfig(),
      offset,
      live: liveRef.current,
      reports: reportsRef.current,
    };
    const text = JSON.stringify(payload, null, 2);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setStatus("copied JSON");
        return;
      }
    } catch {
      /* fall through */
    }
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.cssText = "position:fixed;top:0;left:0;opacity:0;";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      setStatus(ok ? "copied JSON" : "copy failed");
    } catch {
      setStatus("copy failed");
    }
  }, [offset]);

  if (!enabled) return null;

  const config = readVtConfig();
  const latest = reports[0];

  return (
    <div
      ref={panelRef}
      style={{
        position: "fixed",
        top: 4,
        left: 4,
        right: 4,
        zIndex: 2147483647,
        maxHeight: "48vh",
        overflow: "auto",
        WebkitOverflowScrolling: "touch",
        background: "#000",
        color: "#9dfc9d",
        border: "1px solid #3f3",
        borderRadius: 6,
        padding: "6px 8px",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
        fontSize: 9,
        lineHeight: 1.35,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        boxShadow: "0 4px 18px rgba(0,0,0,.5)",
        touchAction: "pan-y",
      }}
    >
      <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}>
        <strong style={{ color: "#fff", fontSize: 10 }}>VT DEBUG</strong>
        <span style={{ color: "#6f6" }}>
          {config.mode} / {config.source} / {config.origin}
          {config.slow ? " / slow" : ""}
        </span>
        <span style={{ marginLeft: "auto", color: "#ff9" }}>dy {offset}px</span>
        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          style={{ padding: "1px 5px", fontSize: 9 }}
        >
          {collapsed ? "OPEN" : "HIDE"}
        </button>
      </div>

      {!collapsed && (
        <>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 4 }}>
            <button type="button" onClick={() => nudge(-10)} style={{ fontSize: 10 }}>
              -10
            </button>
            <button type="button" onClick={() => nudge(-1)} style={{ fontSize: 10 }}>
              -1
            </button>
            <button type="button" onClick={() => nudge(1)} style={{ fontSize: 10 }}>
              +1
            </button>
            <button type="button" onClick={() => nudge(10)} style={{ fontSize: 10 }}>
              +10
            </button>
            <button type="button" onClick={reset} style={{ fontSize: 10 }}>
              RESET
            </button>
            <button type="button" onClick={runTest} style={{ fontSize: 10 }}>
              TEST
            </button>
            <button type="button" onClick={stopAuto} style={{ fontSize: 10 }}>
              STOP AUTO
            </button>
            <button type="button" onClick={copy} style={{ fontSize: 10 }}>
              COPY JSON
            </button>
          </div>

          <div style={{ color: "#7cf" }}>{status || "tap TEST for a no-op reveal, then nudge"}</div>

          <div>{live ? formatLive(live) : "measuring..."}</div>

          {latest && (
            <div style={{ marginTop: 4, borderTop: "1px solid #262", paddingTop: 4 }}>
              {formatReport(latest)}
            </div>
          )}

          <div style={{ marginTop: 4, color: "#777" }}>
            {reports.length} report{reports.length === 1 ? "" : "s"} captured. COPY JSON sends all.
          </div>
        </>
      )}
    </div>
  );
}
