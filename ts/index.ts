import * as $node from 'rest-node';
import {ISession, SessionBase, OAuth2Access, IOAuth2TokenGrant} from 'grid-client-core';
import * as oauth2 from 'oauth2';
import {TokenGrant as OAuth2TokenGrant} from 'oauth2-token-grant';

class GridSession extends SessionBase implements ISession {
    constructor(access: OAuth2Access, tokenGrant: IOAuth2TokenGrant) {
        super($node.get(), access, tokenGrant);
    }
    logout() : Promise<any> {
        let path = "/logout";
        return this.$J("GET", path, {});
    }
}

export interface IGridClientConfig {
    oauth2Options: oauth2.ClientAppOptions;
}

export class GridClient {
    private tokenGrant: IOAuth2TokenGrant = null;
    constructor(config?: IGridClientConfig) {
        if (config && config.oauth2Options && config.oauth2Options.tokenGrantOptions && config.oauth2Options.clientAppSettings)
            this.tokenGrant = new OAuth2TokenGrant(config.oauth2Options.tokenGrantOptions, config.oauth2Options.clientAppSettings);
    }
    getSession(access: OAuth2Access) : ISession {
        return new GridSession(access, this.tokenGrant);
    }

    login(username: string, password: string) : Promise<ISession> {
        return new Promise<ISession>((resolve: (value: ISession) => void, reject: (err: any) => void) => {
            if (this.tokenGrant) {
                this.tokenGrant.getAccessTokenFromPassword(username, password, (err, access: OAuth2Access) => {
                    if (err)
                        reject(err);
                    else
                        resolve(this.getSession(access));
                });
            } else {
                reject({error: "token_grant_invalid", error_description: "token grant not initialized"});
            }
        });
    }
}

export * from 'grid-client-core';