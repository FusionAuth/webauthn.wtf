---
layout: ../../layouts/Layout.astro
title: "Glossary"
description: "Reference"
---

In this glossary, we define and explain common terms and acronyms to help you get a better understanding of the WebAuthn ecosystem.

* **2FA**: Two-Factor Authentication. 2FA requires users to provide a second factor of authentication in addition to their password. The second factor falls into one of the following categories:
  * _Something you know_: a PIN, pattern, or answer to a "secret question"
  * _Something you have_: a security key, app on a mobile device, or a one-time code
  * _Something you are_: biometric data in the form a fingerprint, facial scan, or voice print
* **CTAP**: Client-to-Authenticator Protocol. A FIDO Alliance standard that defines communication between a client device and an authenticator, such as a security passkey.
  * _CTAP1_: the first version of CTAP which supports authentication using a security key but does not provide support for biometric authentication. Designed to work with the original U2F standard.
  * _CTAP2_: is the second version of CTAP which supports , as well as other authentication methods, such as PIN codes. Designed to work with the newer FIDO2 standard.
* **FIDO2**: Fast Identity Online 2.0. Published by the FIDO Alliance. It’s the parent standard that includes WebAuthn and CTAP2.
* **MFA**: Multi-Factor Authentication. Often used synonymously with 2FA. MFA may require more than two factors of authentication, but 2FA always requires two.
* **UAF**: Universal Authentication Framework. It is a protocol released by the FIDO Alliance that enables passwordless authentication using biometrics such as fingerprints or facial recognition.
* **U2F**: Universal 2nd Factor. It is a two-factor authentication standard that combines a user's password with a physical security key.
* **WebAuthn**: Web Authentication. An API specification for creating and using public-key credentials as a means of authentication.
