var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var $node = require('rest-node');
var grid_client_core_1 = require('grid-client-core');
var oauth2_token_grant_1 = require('oauth2-token-grant');
var GridSession = (function (_super) {
    __extends(GridSession, _super);
    function GridSession(access, tokenGrant) {
        _super.call(this, $node.get(), access, tokenGrant);
    }
    GridSession.prototype.logout = function (done) {
        var path = "/logout";
        this.$J("GET", path, {}, (typeof done === 'function' ? done : function (err, ret) { }));
    };
    return GridSession;
}(grid_client_core_1.SessionBase));
var GridClient = (function () {
    function GridClient(config) {
        this.tokenGrant = null;
        this.tokenGrant = new oauth2_token_grant_1.TokenGrant(config.oauth2Options.tokenGrantOptions, config.oauth2Options.clientAppSettings);
    }
    GridClient.prototype.login = function (username, password, done) {
        var _this = this;
        this.tokenGrant.getAccessTokenFromPassword(username, password, function (err, access) {
            if (err) {
                done(err, null);
            }
            else {
                var session = new GridSession(access, _this.tokenGrant);
                done(null, session);
            }
        });
    };
    return GridClient;
}());
exports.GridClient = GridClient;
__export(require('grid-client-core'));
