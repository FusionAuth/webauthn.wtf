---
layout: ../layouts/Layout.astro
section: "WebAuthn"
title: "FIDO Alliance"
description: "Learn about the FIDO Alliance, the organization behind the development of WebAuthn and other authentication standards. Discover the history, goals, and achievements of the FIDO Alliance, and its impact on the future of online authentication."
---

The [FIDO (Fast IDentity Online) Alliance](https://fidoalliance.org/) is an open industry association of leading technology companies that works to develop, promote, and establish open standards for stronger authentication. Their mission is to create “authentication standards to help reduce the world’s over-reliance on passwords.” It was launched publicly in 2013 and has since grown to include over 300 companies.

As part of their mission, the FIDO Alliance has developed a number of [protocols](https://fidoalliance.org/specifications/) including U2F, UAF, and FIDO2. FIDO2, which includes the W3C's WebAuthn specification, is the most comprehensive and widely adopted standard for passwordless authentication on the web while U2F and UAF are earlier attempts to enhance security and user-experience with more limited capabilities.

## U2F (Universal 2nd Factor)
Universal 2nd Factor relies on physical hardware connected via USB, NFC, or Bluetooth in order to provide a strong second factor in addition to a username and password. The strong second factor allows for simpler passwords without compromising security. After the release of FIDO2, U2F has been relabeled CTAP1 (Client-to-Authenticator Protocol). FIDO U2F devices can also be used as a second factor on browsers and operating systems that support the newer FIDO2 specification.

## UAF (Universal Authentication Framework)
Universal Authentication Framework is an earlier protocol that supports a passwordless experience. Supported devices can be registered with an online service. The protocol allows the service to specify which authentication mechanisms are acceptable, such as fingerprint, facial scan, voice recognition, or PIN. Once a device is registered, the user can authenticate from that device without using their password.

## FIDO2
FIDO2 is the evolution of U2F and UAF. It’s the most recent standard and encompasses multiple specifications.
* **Web Authentication (WebAuthn)** - the W3C specification for a browser API to enable FIDO authentication on supported browsers and platforms
* **CTAP1 (Client-to-Authenticator Protocol)** - the renamed U2F allows the use of FIDO U2F devices as a second factor on FIDO2 browsers and operating systems
* **CTAP2** - the updated CTAP allows the use of authenticators for passwordless, second factor, and multi-factor

FIDO2 expands the capabilities and uses cases of earlier specifications to enable a true passwordless experience. 
