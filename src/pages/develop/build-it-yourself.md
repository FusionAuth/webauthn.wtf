---
layout: ../../layouts/Layout.astro
title: "Build it Yourself"
description: "Develop"
---

In order to build your own WebAuthn implementation, you will need to implement the code to act as a WebAuthn Relying Party. Most often the Relying Party code will be split between:
* **Server-side** - The server-side code, written in your language of choice, is responsible for generating the options for WebAuthn ceremonies, validating responses, and storing passkeys.
* **Client-side** - The client-side code, primarily JavaScript, is responsible for communicating with the server, invoking the WebAuthn API, and translating between message formats required for each.

Continue reading for more detail on each side of the implementation and some sample code for WebAuthn registration and authentication ceremonies.

# Server-side implementation
The server-side is where most of the WebAuthn code will exist. The Relying Party needs to decide which options they will allow for each of the WebAuthn ceremonies and what information they require to make a trust decision for a particular authenticator. You can find more information on some important options on the [registration](/how-it-works/registration#the-options) and [authentication](/how-it-works/authentication#the-options) flow pages. In order to increase trust in the authenticator a Relying Party may decide to require [attestation](/how-it-works/registration#the-attestation) during the registration ceremony.

The Relying Party server must support the following operations:
* Generating options for WebAuthn registration and authentication ceremonies
* Validating authenticator responses for WebAuthn registration and authentication ceremonies
* Making a trust decision based on the authenticator registration response to determine whether passkey registration should be successful
* Storing registered passkeys for future authentication

The options provided by the Relying Party may vary depending on the use case for the passkey being registered or the manner that WebAuthn authentication is being used (e.g. primary sign-in method vs a second factor). The options provided for each ceremony should consider the Relying Party's security requirements and also help guide authenticator/passkey selection to improve the user experience.

Most of the WebAuthn specification is dedicated to describing the API and its interaction with authenticators, but there are step-by-step instructions for the Relying Party to [register a new passkey](https://www.w3.org/TR/2021/WD-webauthn-3-20210427/#sctn-registering-a-new-credential) and [authenticate using an existing passkey](https://www.w3.org/TR/2021/WD-webauthn-3-20210427/#sctn-verifying-assertion). Authenticator response validation on the Relying Party server will vary depending on the requirements and options that the Relying Party has settled on for each ceremony.

# Client-side implementation
The client-side implementation for the Relying Party is much simpler. The high-level code for both registration and authentication ceremonies on the client is:
1. Receive the relevant options object from the Relying Party server
2. Transform the options object to be compatible with WebAuth API calls
3. Call the [WebAuthn API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API) for the current ceremony
4. Transform the WebAuthn API response to be compatible with network transfer to the Relying Party server
5. Send the WebAuthn response to the Relying Party server

## JavaScript Binary Transformation
The transformation steps are required because binary fields on the response from the Relying Party are most likely base64-encoded for transport over the network, but the WebAuthn JavaScript API requires these to be [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)s. Likewise, the WebAuthn JavaScript API will return binary fields as `ArrayBuffer`s that need to be base64-encoded before sending the response to the Relying Party server.

The following fields on the passkey registration options need to be converted to `ArrayBuffer`s before being passed to the `navigator.credentials.create()` WebAuthn API method:
* `challenge`
* `user.id`
* `excludeCredentials[x].id`

And these passkey assertion options need to be converted to `ArrayBuffer`s before being passed to the `navigator.credentials.get()` method:
* `challenge`
* `allowCredentials[x].id`

The following snippet can perform the conversion from a base64url-encoded string to an `ArrayBuffer`.

```javascript
function base64URLToBuffer(base64URL) {
    const base64 = base64URL.replace(/-/g, '+').replace(/_/g, '/');
    const padLen = (4 - (base64.length % 4)) % 4;
    return Uint8Array.from(atob(base64.padEnd(base64.length + padLen, '=')), c => c.charCodeAt(0));
}
```

The responses from the WebAuthn JavaScript API include binary fields that should be converted to base64url-encoded strings before sending the response to the Relying Party server. The following fields on the `navigator.credentials.create()` response need to be converted to base64url-encoded strings:
* `credential.response.attestationObject`
* `credential.response.clientDataJSON`

And these fields on the `navigator.credentials.get()` response need to be converted:
* `credential.response.authenticatorData`
* `credential.response.clientDataJSON`
* `credential.response.signature`

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
