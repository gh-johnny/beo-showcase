import { envConfig } from "@/config/EnvConfig";

class Logger {
  public static info(message: string, ...optionalParams: unknown[]): void {
    if (process.env.NODE_ENV !== 'production') {
      console.info(`ℹ️ [INFO]: ${message}`, ...optionalParams);
    }
  }

  public static warn(message: string, ...optionalParams: unknown[]): void {
    console.warn(`⚠️ [WARN]: ${message}`, ...optionalParams);
  }

  public static error(message: string, ...optionalParams: unknown[]): void {
    console.error(`❌ [ERROR]: ${message}`, ...optionalParams);
  }

  public static debug(message: string, ...optionalParams: unknown[]): void {
    if (envConfig.get('ENV') === 'development') {
      console.debug(`🪲 [DEBUG]: ${message}`, ...optionalParams);
    }
  }

  public static log(message: string, ...optionalParams: unknown[]): void {
    console.log(`[LOG]: ${message}`, ...optionalParams);
  }
}

export default Logger;
