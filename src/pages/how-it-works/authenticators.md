---
layout: ../../layouts/Layout.astro
title: "Authenticators"
description: "How it Works"
---

# Cross-Platform Authenticators
Cross-platform authentications (also known as Roaming Authenticators) are a type of WebAuthn authenticator that is typically a portable hardware device. Such devices can be  a USB security key (Yubikey) or mobile phone.

For users who need access to multiple systems, cross-platform authenticators allow for a consistent and secure authentication experience across different environments while providing an additional layer of security, as the user's private key is stored on the physical hardware device itself rather than on the device being authenticated.

# Platform Authenticators
Platform authenticators are a type of WebAuthn authenticator that is built directly into the user's device operating system or browser. This means that they do not require a separate physical device or additional software to enable WebAuthn-based authentication.

Instead, they leverage the built-in security features of the user’s device, such as the secure enclave in a mobile device or the Trusted Platform Module (TPM) in a computer.

Platform authenticators are often used in conjunction with biometric sensors, such as fingerprint readers or facial recognition systems, to provide an additional layer of security and convenience for users.

Platform authenticators include Touch ID and Face ID in Apple iOS, the Windows Hello feature built into Windows, and Android’s fingerprint/face recognition.