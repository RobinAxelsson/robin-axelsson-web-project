const loginAddress = document.querySelector("#loginAddress");

oktaSignIn = new OktaSignIn({
    baseUrl: 'https://dev-34426554.okta.com/', //Org URL
    clientId: '0oa7d2j7dMdzbChTQ5d6', //maybe callback
    redirectUri: 'http://127.0.0.1:8080',
    authParams: {
        issuer: 'https://dev-34426554.okta.com/oauth2/default',
        responseType: ['token', 'id_token'],
        display: 'page'
    },
    features: {
        registration: true
    }
});

oktaSignIn.session.get(function (res) {
    if (res.status === 'ACTIVE') {
        loginAddress.innerHTML = res.login;
        window.location.hash = '';
        loginMode();
    } else {
        defaultMode();
    }
});

function signInAttempt() {
    if (oktaSignIn.token.hasTokensInUrl()) {
        oktaSignIn.token.parseTokensFromUrl(
            function success(res) {
                var accessToken = res[0];
                var idToken = res[1];
                oktaSignIn.tokenManager.add('accessToken', accessToken);
                oktaSignIn.tokenManager.add('idToken', idToken);
                window.location.hash = '';
                loginAddress.innerHTML = res.login;
            },
            function error(err) {
                console.error(err);
            }
        );
    } else {
        oktaSignIn.session.get(function (res) {
            if (res.status === 'ACTIVE') {
                loginAddress.innerHTML = res.login;
                loginMode();
            }
            oktaSignIn.renderEl({
                    el: '#okta-login-container'
                },
                function success(res) {
                    console.log(res);
                },
                function error(err) {
                    console.error(err);
                }
            );
        });
    }
}

function signOut() {
    oktaSignIn.signOut();
    oktaSignIn.session.close();
    loginAddress.innerHTML = "";
    jumpToPage(startPage);
    defaultMode();
}