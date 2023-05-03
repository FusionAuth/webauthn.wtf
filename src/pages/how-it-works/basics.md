---
layout: ../../layouts/Layout.astro
title: "WebAuthn Basics"
description: "How it Works"
---

WebAuthn is an API specification that allows authenticating users via public-key cryptography. Continue reading for the basics of WebAuthn, or check out the other pages in this section to dive into the details.

## The players
There are two parties involved in any WebAuthn workflow: the user wishing to authenticate and the entity wishing to authenticate a user (called the Relying Party, or RP, in the WebAuthn world).

The Relying Party will typically have both client-side code to invoke the WebAuthn API on the client and server-side code to validate responses and store details about registered passkeys. The user needs to possess an authenticator that is able to meet the requirements the Relying Party has requested.

## The authenticator
An authenticator is a piece of dedicated hardware, a hardware subsystem, or software that is able to generate public-private key pairs to register the user with a Relying Party and later assert possession of that passkey for authentication. Software-based authenticators are typically used for testing.

Authenticators vary in a few areas such as whether they are able to verify users and the list of signature algorithms they support, but they all generate key pairs and then use the private key to sign a challenge presented by the Relying Party. Authenticators must also be able to test for user presence by requiring some "authorization gesture" from the user to indicate they consent to the operation.

## The ceremonies
The two WebAuthn workflows are registration and authentication. These workflows are referred to as "ceremonies" by the WebAuthn specification because they combine aspects of a protocol, which exists only in the digital space, with human interaction in the form of an authorization gesture. This site uses the term _ceremony_ to refer to a specific, standardized workflow while _flow_ is used to refer to the user journey more generally.

In the registration ceremony a Relying Party provides a set of options for generating a new passkey. If the client has access to an authenticator that can meet the requirements provided in the options, it can be selected to generate a passkey, sign the challenge from the Relying Party, and complete the registration ceremony.

The authentication ceremony uses a different set of options to locate an eligible passkey to complete the authentication. If the client has access to one of the requested passkeys via an attached authenticator, the passkey can be used to sign the challenge and complete the authentication ceremony.

## The benefits
The benefits of WebAuthn broadly fall into two categories: security and user experience.

Security benefits include:
* **Secure context**: WebAuthn can only be used when a valid HTTPS connection exists
* **Phishing resistant**: passkeys are scoped to a Relying Party based on the secure context and cannot be used on other domains
* **No secrets**: unlike traditional passwords, there is nothing for a hacker to steal from the Relying Party that could compromise the account

User experience is improved because:
* **No password**: there is no password for the user to remember, protect, or forget
* **Streamlined authentication**: WebAuthn features such as discoverable credentials can further streamline authentication