import { ISession } from 'grid-client-core';
import * as oauth2 from 'oauth2';
export interface IGridClientConfig {
    oauth2Options: oauth2.ClientAppOptions;
}
export declare class GridClient {
    private tokenGrant;
    constructor(config: IGridClientConfig);
    login(username: string, password: string, done: (err: any, session: ISession) => void): void;
}
export * from 'grid-client-core';
