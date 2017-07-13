import * as $node from 'rest-node';
import {ISession, SessionBase, OAuth2Access} from 'grid-client-core';
import * as oauth2 from 'oauth2';
import {TokenGrant as OAuth2TokenGrant} from 'oauth2-token-grant';

class GridSession extends SessionBase implements ISession {
    constructor(access: OAuth2Access) {
        super($node.get(), access);
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
    private tokenGrant: oauth2.ITokenGrant = null;
    constructor(config?: IGridClientConfig) {
        if (config && config.oauth2Options && config.oauth2Options.tokenGrantOptions && config.oauth2Options.clientAppSettings)
            this.tokenGrant = new OAuth2TokenGrant(config.oauth2Options.tokenGrantOptions, config.oauth2Options.clientAppSettings);
    }
    getSession(access: OAuth2Access) : ISession {return new GridSession(access);}
    login(username: string, password: string) : Promise<ISession> {
        if (this.tokenGrant)
            return this.tokenGrant.getAccessTokenFromPassword(username, password).then((access: OAuth2Access) => this.getSession(access));
        else
            return Promise.reject({error: "token_grant_invalid", error_description: "token grant not initialized"});
    }
}

export * from 'grid-client-core';