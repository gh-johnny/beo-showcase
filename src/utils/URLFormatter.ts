class URLFormatter {
  private base: string;
  private port: string | number;

  constructor(base: string, port: string | number = '') {
    this.base = base;
    this.port = port;
  }

  private formatPort(): string {
    return this.port ? `:${this.port}` : '';
  }

  public formatPath(path: string): string {
    return new URL(path, `${this.base}${this.formatPort()}`).toString();
  }

  public formatWithQueryParams(path: string, params: Record<string, string | number>): string {
    const url = new URL(path, `${this.base}${this.formatPort()}`);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });
    return url.toString();
  }
}

export default URLFormatter;
