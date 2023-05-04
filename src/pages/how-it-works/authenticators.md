---
layout: ../../layouts/Layout.astro
section: "How it Works"
title: "Authenticators"
description: "Learn about WebAuthn authenticators, the hardware devices that enable passwordless authentication. Discover the different types of WebAuthn authenticators, their capabilities, how they work, and how they interact with web browsers."
---

There are a wide range of WebAuthn-compatible authenticators available, from mobile phones to dedicated hardware devices, that support a variety of features. Read on for more information on the features that set authenticators apart.

## Requirements
All authenticators must meet a few requirements to be eligible for use with WebAuthn. The first is the ability to generate a public-private key pair that is core to verifying a user's identity during authentication. It must be able to respond to requests by using a passkey to generate a cryptographic signature that can be verified by the Relying Party using the associated public key.

Authenticators must also support some kind of authorization gesture from a user to prove user presence. This could be responding to a prompt on a mobile device, scanning a fingerprint sensor, or touching a capacitive area on a security key.

## User verification
All authenticators must support a test for user presence, but authenticators may also provide user verification. User verification most commonly comes in the form of a PIN, pattern, or biometric scan. One example of user verification is using a fingerprint sensor during a WebAuthn ceremony, which provides both user presence and user verification in one step.

An authenticator that supports user verification can be used in a wider variety of contexts than one that does not and provides two factors of authentication in one step: something you have (the authenticator), and something you know (e.g. PIN) or something you are (e.g. fingerprint).

## Attachment
The "attachment modality" of an authenticator refers to whether it can be used across multiple client devices (cross-platform) or is permanently integrated with a single client device (platform). Client device refers to the hardware device being used to access the web application utilizing WebAuthn such as a laptop or smartphone.

The attachment modality of an authenticator makes it more or less suitable for particular use cases, but one attachment type is not necessarily better than the other.

### Platform authenticator
Platform authenticators are typically not removable from the client device such as an authenticator built into a laptop or smartphone. These are useful for repeat authentications from the same device because the Relying Party can count on the authenticator being available.

Platform authenticators are often able to leverage the device's unlock capabilities such as fingerprint or facial scan to perform user verification during a WebAuthn ceremony.

### Cross-platform authenticator
Cross-platform authenticators, sometimes referred to as roaming authenticators, are removable and can be used across different client devices. Cross-platform authenticators are suitable for cases where a user is authenticating from a new device for the first time. They connect over various transports such as USB, NFC, or Bluetooth.

Security keys are a large category of cross-platform authenticator. Devices such as mobile phones can be considered cross-platform authenticators when attached to another client device via Bluetooth or NFC, but the same device could be serving as a platform authenticator when signing in _from_ that device.

## Signature algorithms
Authenticators also vary in the signature algorithms that they support. When a passkey is created, the list of acceptable signature algorithms is provided in order of preference, and the authenticator will pick the first one it supports.

## Discoverable credentials
A discoverable credential, formerly referred to as a resident credential, is one that can be used during WebAuthn authentication ceremonies without providing a list of eligible credential IDs. The Relying Party queries available authenticators for discoverable passkeys. If one is available, and the user authorizes the action, the Relying Party can use the selected passkey's ID to look up the user that registered that passkey and authenticate them without requiring the user to enter their email address or username. Not all authenticators have the ability to store discoverable credentials.

## Attestation
A Relying Party can request attestation during passkey registration. Attestation provides additional information about the legitimacy of the authenticator device and can be used by the Relying Party to make a trust decision for the authenticator. According to the WebAuthn specification, authenticators _should_ provide some form of attestation, but it is not required, and authenticators vary in the type and format of attestation statements they can provide.