/// <reference types="es6-promise" />
import { ISession, OAuth2Access } from 'grid-client-core';
import * as oauth2 from 'oauth2';
export interface IGridClientConfig {
    oauth2Options: oauth2.ClientAppOptions;
}
export declare class GridClient {
    private tokenGrant;
    constructor(config?: IGridClientConfig);
    getSession(access: OAuth2Access): ISession;
    login(username: string, password: string): Promise<ISession>;
}
export * from 'grid-client-core';
