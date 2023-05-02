---
layout: ../../layouts/Layout.astro
title: "Glossary"
description: "Reference"
---

In this glossary, we define and explain common terms and acronyms to help you get a better understanding of the WebAuthn ecosystem.

* **2FA**: Two-Factor Authentication. 2FA requires users to provide a second factor of authentication in addition to their password. The second factor falls into one of the following categories:
  * _Something you know_: a PIN, pattern, or answer to a "secret question"
  * _Something you have_: a security key, app on a mobile device, or a one-time code
  * _Something you are_: biometric data in the form a fingerprint, facial scan, or voiceprint
* **Attachment modality**: The attachment modality of an authenticator refers to its ability to be used across multiple devices. A "platform" is integrated with the client device while a "cross-platform" authenticator is removable and can be used across multiple client devices.
* **Authenticator**: An entity, existing in hardware or software, that is capable of registering a user with a Relying Party and then later asserting the possession of a registered credential. Software-based authenticators are typically used for development or debugging purposes.
* **Ceremony**: The WebAuthn specification uses "ceremony" to extend the concept of a protocol to include human interaction. The two primary operations in WebAuthn, registration and authentication, require interaction from a human as a test of user presence in addition to the protocol components of the specification.
* **Credential**: See **Passkey**
* **CTAP**: Client-to-Authenticator Protocol. A FIDO Alliance standard that defines communication between a client device and an authenticator, such as a security passkey.
  * _CTAP1_: the first version of CTAP which supports authentication using a security key but does not provide support for biometric authentication. Designed to work with the original U2F standard.
  * _CTAP2_: is the second version of CTAP which supports , as well as other authentication methods, such as PIN codes. Designed to work with the newer FIDO2 standard.
* **FIDO2**: Fast Identity Online 2.0. Published by the FIDO Alliance. It’s the parent standard that includes WebAuthn and CTAP2.
* **MFA**: Multi-Factor Authentication. Often used synonymously with 2FA. MFA may require more than two factors of authentication, but 2FA always requires two.
* **Passkey**: Originally used to refer to a WebAuthn credential that could be synced between devices via some external mechanism, it is now the general term used to refer to any WebAuthn credential.
* **Public-key cryptography**: Also referred to as asymmetric cryptography. A form of cryptography that uses a pair of keys, one public and one private, to encrypt/decrypt messages. Messages encrypted with one key can only be decrypted with the other. WebAuthn relies on public-key cryptography to sign and validate authentication assertions.
* **Relying Party**: The entity utilizing WebAuthn to register and authenticate users.
* **RP**: See **Relying Party**
* **UAF**: Universal Authentication Framework. It is a protocol released by the FIDO Alliance that enables passwordless authentication using biometrics such as fingerprints or facial recognition.
* **U2F**: Universal 2nd Factor. It is a two-factor authentication standard that combines a user's password with a physical security key.
* **W3C**: World Wide Web Consortium. An international community working together to develop Web standards. ([link](https://www.w3.org/))
* **WebAuthn**: Web Authentication. An API specification for creating and using public-key credentials as a means of authentication.
