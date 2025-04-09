import React, { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorMessage: "" };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, errorMessage: error.message };
    }

    componentDidCatch(error, info) {
        console.log("Error captured:", error, info); // Log the error
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Something went wrong.</h1>
                    <p>{this.state.errorMessage}</p>
                </div>
            );
        }

        return this.props.children; // Return children if no error
    }
}

export default ErrorBoundary;
