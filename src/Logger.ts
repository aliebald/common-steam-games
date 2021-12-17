import React from "react";

export class Logger {
  // Enable logger in prod with (reload afterwards): sessionStorage.setItem("SHOW_LOG", true);
  private SHOW_LOG: boolean = process.env.NODE_ENV === "development" || sessionStorage.getItem("SHOW_LOG") === "true";

  /**
   * Wrapper for console.log, Prints to `stdout` with `newline` if logging is enabled.
   */
  log(message?: any, ...optionalParams: any[]) {
    if (this.SHOW_LOG) {
      console.log(message, ...optionalParams);
    }
  }

  /**
   * Wrapper for console.warn, Prints to `stderr` with `newline` if logging is enabled.
   */
  warn(message?: any, ...optionalParams: any[]) {
    if (this.SHOW_LOG) {
      console.warn(message, ...optionalParams);
    }
  }

  /**
   * Wrapper for console.error, Prints to `stderr` with `newline` if logging is enabled.
   */
  error(message?: any, ...optionalParams: any[]) {
    if (this.SHOW_LOG) {
      console.error(message, ...optionalParams);
    }
  }

  /**
   * Wrapper for console.group.
   * Increases indentation of subsequent lines by two spaces, if logging is enabled.
   * If one or more labels are provided, those are printed first without the additional indentation.
   */
  group(...label: any[]) {
    if (this.SHOW_LOG) {
      console.group(...label);
    }
  }

  /**
   * Wrapper for console.groupEnd. Decreases indentation of subsequent lines by two spaces, if logging is enabled.
   */
  groupEnd() {
    if (this.SHOW_LOG) {
      console.groupEnd();
    }
  }
}

const LoggerContext = React.createContext(new Logger());

export const LoggerProvider = LoggerContext.Provider;
export const LoggerConsumer = LoggerContext.Consumer;

export default LoggerContext;
