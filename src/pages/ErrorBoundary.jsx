// src/ErrorBoundary.jsx
import React, { Component } from "react";

class ErrorBoundary extends Component {
    state = { hasError: false, errorMessage: "" };

    static getDerivedStateFromError(error) {
        return { hasError: true, errorMessage: error.message };
    }

    componentDidCatch(error, info) {
        console.error("Error caught in ErrorBoundary: ", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <h2>Something went wrong.</h2>
                    <p>{this.state.errorMessage}</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
