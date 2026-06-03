"use client";

import { Component, ReactNode } from "react";
import { AlertMessage } from "./AlertMessage";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  message: string;
};

export class AdminErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: unknown): State {
    const message =
      error instanceof Error
        ? error.message
        : "Ocurrió un error inesperado en el panel.";
    return { hasError: true, message };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV === "development") {
      console.error("[AdminErrorBoundary]", error);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6">
          <AlertMessage
            type="error"
            message={`No pudimos mostrar esta sección. ${this.state.message}`}
          />
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, message: "" })}
            className="mt-4 rounded-lg bg-slate-700 px-4 py-2 text-sm text-white hover:bg-slate-600"
          >
            Reintentar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
