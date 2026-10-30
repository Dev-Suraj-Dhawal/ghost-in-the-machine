import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Trash2, Copy, Check, Terminal } from "lucide-react";
import { sound } from "@/lib/soundEngine";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  copied: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    copied: false,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[Spectral Kernel] Uncaught runtime exception:", error, errorInfo);
    try {
      sound.playGlitchBuzz();
    } catch {
      // Audio may be uninitialized or blocked by policy
    }
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handlePurgeCache = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
    } catch (err) {
      console.error("Failed to purge storage:", err);
      window.location.reload();
    }
  };

  private handleCopyDiagnostics = async () => {
    const diagnostics = [
      `=== GHOST IN THE MACHINE - ERROR DIAGNOSTICS ===`,
      `Timestamp: ${new Date().toISOString()}`,
      `User Agent: ${navigator.userAgent}`,
      `Error Name: ${this.state.error?.name || "Unknown"}`,
      `Error Message: ${this.state.error?.message || "No message"}`,
      `Stack Trace:`,
      this.state.error?.stack || "No stack trace available",
      `Component Stack:`,
      this.state.errorInfo?.componentStack || "No component stack",
    ].join("\n");

    try {
      await navigator.clipboard.writeText(diagnostics);
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2500);
    } catch {
      console.warn("Failed to copy diagnostics automatically.");
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-mono selection:bg-amber-500 selection:text-black">
          {/* Ambient background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/30 via-slate-950 to-black pointer-events-none" />

          {/* CRT scanlines effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.04))",
              backgroundSize: "100% 3px, 6px 100%",
            }}
          />

          <div className="relative z-10 max-w-2xl w-full border border-amber-500/40 rounded-2xl bg-slate-900/90 backdrop-blur-xl p-8 shadow-2xl shadow-amber-950/60">
            {/* Header badge */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-amber-500/20">
              <div className="p-3 bg-amber-500/10 border border-amber-500/40 rounded-xl text-amber-400">
                <AlertTriangle className="w-8 h-8 animate-pulse" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-amber-400/80 font-bold">
                  Kernel Panic // 0xDEADBEEF
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  Spectral Subsystem Rupture
                </h1>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              The ethereal bridge encountered an unhandled quantum state anomaly. Client memory was safely quarantined to prevent memory leaks or cascading corruption.
            </p>

            {/* Error Message Box */}
            <div className="bg-black/60 border border-red-500/30 rounded-xl p-4 mb-6 font-mono text-xs overflow-x-auto text-red-300">
              <div className="flex items-center gap-2 mb-2 text-red-400/80 uppercase tracking-wider text-[10px] font-bold">
                <Terminal className="w-3.5 h-3.5" />
                <span>Exception Trace</span>
              </div>
              <p className="font-semibold">{this.state.error?.toString() || "Unknown Paranormal Error"}</p>
              {this.state.error?.stack && (
                <details className="mt-2 text-slate-400">
                  <summary className="cursor-pointer hover:text-amber-400 transition-colors text-[11px] underline">
                    View Call Stack Trace
                  </summary>
                  <pre className="mt-2 text-[10px] leading-relaxed whitespace-pre-wrap text-slate-500 overflow-x-auto max-h-48">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs tracking-wider uppercase transition-all duration-200 shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <RefreshCw className="w-4 h-4" />
                Reboot Core
              </button>

              <button
                onClick={this.handlePurgeCache}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-red-950/80 border border-slate-700 hover:border-red-500/40 text-slate-200 hover:text-red-300 font-semibold text-xs tracking-wider uppercase transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
                Purge Cache & Reset
              </button>

              <button
                onClick={this.handleCopyDiagnostics}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 font-semibold text-xs tracking-wider uppercase transition-all duration-200 ml-auto"
              >
                {this.state.copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Diagnostics</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
