import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jsoncParser from 'jsonc-parser';
import {deepCopy} from "../utils/deep-copy";
import {BehaviorSubject, Observable, catchError, map, of, firstValueFrom} from "rxjs";


export interface ServerConfig {
  serverPort: number;
  serverHost: string;
  servedByPyrobird: boolean;
  apiAvailable: boolean;
  useAuthentication: boolean;
  logLevel: string;
}

export const defaultFirebirdConfig: ServerConfig = {
  serverPort: 5454,
  serverHost: "localhost",
  apiAvailable: false,
  servedByPyrobird: false,
  useAuthentication: true,
  logLevel: 'info'
};


@Injectable({
  providedIn: 'root'
})
export class ServerConfigService {
  private configUrl = 'assets/config.jsonc'; // URL to the JSONC config file
  private _config = deepCopy(defaultFirebirdConfig);

  private triedLoading = false;

  constructor(private http: HttpClient) {}

  get config(): ServerConfig {
    if (!this.triedLoading) {
      this.triedLoading = true;
      console.error("[ServerConfigService] config() is called while config is not loaded")
    }
    return this._config;
  }

  async loadConfig(): Promise<void> {
    try {

      const jsoncData = await firstValueFrom(
        this.http.get(this.configUrl, { responseType: 'text' })
      );
      const loadedConfig = this.parseConfig(jsoncData);

      // Merge loadedConfig over default config
      this._config = { ...defaultFirebirdConfig, ...loadedConfig };
      console.log("[ServerConfigService] Server config loaded file")
    } catch (error) {
      console.error(`Failed to load config: ${error}`);
      console.log(`[ServerConfigService] Default config will be used`);
    } finally {
      this.triedLoading = true;
    }
  }

  private parseConfig(jsoncData: string): Partial<ServerConfig> {
    try {
      return jsoncParser.parse(jsoncData);
    } catch (parseError) {
      console.error('Error parsing JSONC data', parseError);
      return {};
    }
  }

  /**
   * Sets the configuration - intended for use in unit tests only.
   * This method is safeguarded to be operational only in non-production environments.
   */
  public setUnitTestConfig(value: Partial<ServerConfig>) {
    this.triedLoading = true;
    this._config = {...defaultFirebirdConfig, ...value};
  }
}
