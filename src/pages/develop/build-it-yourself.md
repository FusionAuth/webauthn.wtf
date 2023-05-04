---
layout: ../../layouts/Layout.astro
section: "Develop"
title: "Build it Yourself"
description: "Learn how to integrate WebAuthn into your web application and provide passwordless authentication for your users. Discover the different steps involved in implementing WebAuthn, including generating and verifying credentials, handling user consent, and integrating with your existing authentication system."
---

In order to build your own WebAuthn implementation, you will need to implement the code to act as a WebAuthn Relying Party. Most often the Relying Party code will be split between:
* **Server-side** - The server-side code, written in your language of choice, is responsible for generating the options for WebAuthn ceremonies, validating responses, and storing passkeys.
* **Client-side** - The client-side code, primarily JavaScript, is responsible for communicating with the server, invoking the WebAuthn API, and translating between message formats required for each.

Continue reading for more detail on each side of the implementation and some sample code for WebAuthn registration and authentication ceremonies.

## Server-side implementation
The server-side is where most of the WebAuthn code will exist. The Relying Party needs to decide which options they will allow for each of the WebAuthn ceremonies and what information they require to make a trust decision for a particular authenticator. You can find more information on some important options on the [registration](/how-it-works/registration#the-options) and [authentication](/how-it-works/authentication#the-options) flow pages. In order to increase trust in the authenticator a Relying Party may decide to require [attestation](/how-it-works/registration#the-attestation) during the registration ceremony.

The Relying Party server must support the following operations:
* Generating options for WebAuthn registration and authentication ceremonies
* Validating authenticator responses for WebAuthn registration and authentication ceremonies
* Making a trust decision based on the authenticator registration response to determine whether passkey registration should be successful
* Storing registered passkeys for future authentication

The options provided by the Relying Party may vary depending on the use case for the passkey being registered or the manner that WebAuthn authentication is being used (e.g. primary sign-in method vs a second factor). The options provided for each ceremony should consider the Relying Party's security requirements and also help guide authenticator/passkey selection to improve the user experience.

Most of the WebAuthn specification is dedicated to describing the API and its interaction with authenticators, but there are step-by-step instructions for the Relying Party to [register a new passkey](https://www.w3.org/TR/2021/WD-webauthn-3-20210427/#sctn-registering-a-new-credential) and [authenticate using an existing passkey](https://www.w3.org/TR/2021/WD-webauthn-3-20210427/#sctn-verifying-assertion). Authenticator response validation on the Relying Party server will vary depending on the requirements and options that the Relying Party has settled on for each ceremony.

## Client-side implementation
The client-side implementation for the Relying Party is much simpler. The high-level code for both registration and authentication ceremonies on the client is:
1. Receive the relevant options object from the Relying Party server
2. Transform the options object to be compatible with WebAuth API calls
3. Call the [WebAuthn API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API) for the current ceremony
4. Transform the WebAuthn API response to be compatible with network transfer to the Relying Party server
5. Send the WebAuthn response to the Relying Party server

### JavaScript Binary Transformation
The transformation steps are required because binary fields on the response from the Relying Party are most likely base64url-encoded for transport over the network, but the WebAuthn JavaScript API requires these to be [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)s. Likewise, the WebAuthn JavaScript API will return binary fields as `ArrayBuffer`s that need to be base64url-encoded before sending the response to the Relying Party server.

The following snippet can perform the conversion from a base64url-encoded string to an `ArrayBuffer`.

```javascript
function base64URLToBuffer(base64URL) {
    const base64 = base64URL.replace(/-/g, '+').replace(/_/g, '/');
    const padLen = (4 - (base64.length % 4)) % 4;
    return Uint8Array.from(atob(base64.padEnd(base64.length + padLen, '=')), c => c.charCodeAt(0));
}
```

The responses from the WebAuthn JavaScript API include binary fields that should be converted to base64url-encoded strings before sending the response to the Relying Party server.

The following snippet can perform the conversion from `ArrayBuffer` to base64url-encoded string.

```javascript
function bufferToBase64URL(buffer) {
  const bytes = new Uint8Array(buffer);
  let string = '';
  bytes.forEach(b => string += String.fromCharCode(b));

  const base64 = btoa(string);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
```

### Registration
Passkey registration uses the WebAuthn API's [`navigator.credentials.create()`](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/create) method. The method accepts [`PublicKeyCredentialCreationOptions`](https://www.w3.org/TR/2021/WD-webauthn-3-20210427/#dictionary-makecredentialoptions).

The following fields on the passkey registration options will likely be base64url-encoded for network transport and need to be converted to `ArrayBuffer`s before being passed to the `navigator.credentials.create()` WebAuthn API method:
* `challenge` - a one-time challenge used to prevent replay attacks
* `user.id` - a unique user handle/identifier
* `excludeCredentials[x].id` - passkey identifiers for passkeys whose owning authenticator should be excluded from authenticator selection

Here are sample options:

```javascript
const options =  {
    publicKey: {
        rp: {
            id: "webauthn.wtf",
            name: "WebAuthn WTF"
        },
        user: {
            id: [ /** user identifier as ArrayBuffer */ ],
            name: "me@example.com",
            displayName: "Chrome Touch ID"
        },
        challenge: [ /** ArrayBuffer */ ],
        pubKeyCredParams: [ { type: "public-key", alg: -7 }]
        // ...
    }
}
```

An `options` object like the one above is passed to the WebAuthn API which returns a `Promise` that resolves with a new [`PublicKeyCredential`](https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredential) if one was created, or `null` if a new passkey could not be created.

```javascript
navigator.credentials.create(options)
  .then(function (credential) {
    if (credential !== null) {
      // Send credential info to server
    }
  }).catch(function (err) {
    // No acceptable authenticator or user refused consent
  });
```

The following fields on the response need to be converted to base64url-encoded strings before sending to the Relying Party server:
* `credential.response.attestationObject`
* `credential.response.clientDataJSON`

After serialization, the WebAuthn API response can be sent to the Relying Party for validation and storage.

### Authentication
The authentication ceremony uses the WebAuthn API's [`navigator.credentials.get()`](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/get) method to assert the user's possession of a previously registered passkey. The method accepts [`PublicKeyCredentialRequestOptions`](https://www.w3.org/TR/2021/WD-webauthn-3-20210427/#dictionary-assertion-options).

These passkey request options will likely be base64url-encoded for network transport and need to be converted to `ArrayBuffer`s before being passed to the `navigator.credentials.get()` method:
* `challenge` - a one-time challenge to prevent replay attacks
* `allowCredentials[x].id` - identifiers for passkeys that are eligible to complete this request

Here are sample options:

```javascript
const options = {
  publicKey: {
    rpId: "webauthn.wtf",
    challenge: [ /** ArrayBuffer */ ],
    userVerification: "preferred",
    allowCredentials: [ { type: "public-key", id: [ /** ArrayBuffer */ ] } ]
  }
}
```

An `options` object like the one above is passed to the WebAuthn API which returns a `Promise` that resolves with an existing [`PublicKeyCredential`](https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredential) that was used to complete the authentication ceremony.

```javascript
navigator.credentials.get(options)
  .then(function (credential) {
    // Send authentication status to server
  }).catch(function (err) {
    // No acceptable passkey or user refused consent
  });
```

The following fields on the response need to be converted to base64url-encoded strings before sending to the Relying Party server:
* `credential.response.authenticatorData`
* `credential.response.clientDataJSON`
* `credential.response.signature`

After serialization, the WebAuthn API response can be sent to the Relying Party for validation and to complete or fail the authentication ceremony.