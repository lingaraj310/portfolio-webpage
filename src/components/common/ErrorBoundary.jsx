import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center text-white bg-space-950 min-h-[200px] rounded-2xl border border-red-500/30 m-4">
          <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mb-3 text-2xl font-mono">
            ⚠️
          </div>
          <h3 className="text-lg font-orbitron font-bold text-red-400 mb-2">Display Module Error</h3>
          <p className="text-xs font-mono text-slate-400 max-w-md mb-4">
            {this.state.error?.message || 'An unexpected rendering error occurred.'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500 text-cyan-300 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer"
          >
            Retry Module
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
