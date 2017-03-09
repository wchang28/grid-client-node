"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var $node = require("rest-node");
var grid_client_core_1 = require("grid-client-core");
var oauth2_token_grant_1 = require("oauth2-token-grant");
var GridSession = (function (_super) {
    __extends(GridSession, _super);
    function GridSession(access, tokenGrant) {
        return _super.call(this, $node.get(), access, tokenGrant) || this;
    }
    GridSession.prototype.logout = function () {
        var path = "/logout";
        return this.$J("GET", path, {});
    };
    return GridSession;
}(grid_client_core_1.SessionBase));
var GridClient = (function () {
    function GridClient(config) {
        this.tokenGrant = null;
        if (config && config.oauth2Options && config.oauth2Options.tokenGrantOptions && config.oauth2Options.clientAppSettings)
            this.tokenGrant = new oauth2_token_grant_1.TokenGrant(config.oauth2Options.tokenGrantOptions, config.oauth2Options.clientAppSettings);
    }
    GridClient.prototype.getSession = function (access) {
        return new GridSession(access, this.tokenGrant);
    };
    GridClient.prototype.login = function (username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.tokenGrant) {
                _this.tokenGrant.getAccessTokenFromPassword(username, password, function (err, access) {
                    if (err)
                        reject(err);
                    else
                        resolve(_this.getSession(access));
                });
            }
            else {
                reject({ error: "token_grant_invalid", error_description: "token grant not initialized" });
            }
        });
    };
    return GridClient;
}());
exports.GridClient = GridClient;
__export(require("grid-client-core"));
