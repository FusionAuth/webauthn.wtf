---
layout: ../../layouts/Layout.astro
title: "Common Questions"
description: "Reference"
---

## What is WebAuthn?
WebAuthn (Web Authentication) is an API specification to enable passwordless authentication on the web via public-key cryptography. WebAuthn requires a compliant authenticator to create public-key credentials and later sign challenges to assert possession of the credential.

## What is a WebAuthn authenticator?
A WebAuthn authenticator is a hardware or software entity that implements the WebAuthn specification. A compliant authenticator must be able to register a user and then later use a registered passkey to authenticate that user. [Authenticators](/how-it-works/authenticators) all have a minimum set of requirements but may vary in their support for certain features, signature algorithms, and attachment options.

## Are FIDO2 and WebAuthn the same?
[FIDO2](/history/fido-protocols) (Fast Identity Online 2.0) is an open authentication standard developed by the FIDO Alliance. WebAuthn, a W3C specification, is one half of that standard with the other half being FIDO's Client-to-Authenticator-Protocol (CTAP) which enables supported browsers and operating systems to communicate with available authenticators.

## Is WebAuthn 2FA/MFA?
WebAuthn is suitable for a number of use cases, including as a second factor of authentication. When using an authenticator that support user verification, WebAuthn can provide two factors of authentication in a single action. It can also be used alongside a traditional password as a phishing-resistant second factor.