---
layout: ../../layouts/Layout.astro
title: "Relying Party"
description: "How it Works"
---

The Relying Party (RP) is the entity whose web application is using WebAuthn to register and authenticate users. The RP controls WebAuthn API options during registration and authentication ceremonies. They can use these options to enhance security, increase trust in the authenticator, and improve the user experience. The Relying Party must also validate WebAuthn API responses from the authenticator and make a trust decision before registering a passkey.

# Relying Party ID
One of the most important decisions for a Relying Party is the identifier that it will use during WebAuthn ceremonies. This identifier must match the browser's request origin during the WebAuthn or be a "registrable suffix" of the origin. For example, if the login page using WebAuthn is at `login.example.com`, the ID will default to `login.example.com`. It could also be explicitly specified as `login.example.com` or `example.com`, but not `m.login.example.com` or `com`.

The same value must be provided during registration and authentication ceremonies for that Relying Party. Specifying a suffix allows passkeys to be used across subdomains the Relying Party controls. For example, if `example.com` is chosen as the Relying Party ID, then passkeys registered on `login.example.com` could also be used on `auth.example.com` or `sso.example.com`.

# Registration
There are a number of [options](https://www.w3.org/TR/webauthn-2/#dictdef-publickeycredentialcreationoptions) the Relying Party can specify during the registration ceremony. These can be used to limit the authenticators considered for registration to those that support a particular use case for a passkey. For example, limiting authenticator selection based on its ability to provide user verification or its attachment. These options are covered in more detail in [Registration Flow](/how-it-works/registration).

# Authentication
The [options](https://www.w3.org/TR/webauthn-2/#dictdef-publickeycredentialrequestoptions) that a Relying Party can provide during an authentication ceremony are more limited. Aside from specifying a list of passkey identifiers that can be used to complete the authentication, the other main option is whether user verification is required for the particular ceremony. A Relying Party may decide to require user verification when using WebAuthn in place of a password, but choose to make it optional when WebAuthn is being used as a second factor after the user has entered their password. The options are covered in more detail in [Authentication Flow](https://www.w3.org/TR/webauthn-2/#dictdef-publickeycredentialrequestoptions).

# Guiding the user experience
Aside from guiding authenticator selection to meet security and trust requirements, the Relying Party can also use its powers to guide the user experience. Specifying a complementary set of options when the user is registering a passkey for a particular use case (e.g. re-authenticating from a device that they use frequently) can streamline future authentication workflows.