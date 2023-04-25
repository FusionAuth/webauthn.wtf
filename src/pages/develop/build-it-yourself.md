---
layout: ../../layouts/Layout.astro
title: "Build it Yourself"
description: "Develop"
---

In order to build your own WebAuthn implementation, you will need to implement the code to act as a WebAuthn Relying Party. There are two components to this implementation:
* Server-side - The server-side code, written in your language of choice, is responsible for generating the options for WebAuthn ceremonies, validating responses, and storing passkeys.
* Client-side - The client-side code, primarily JavaScript, is responsible for communicating with the server, invoking the WebAuthn API, and translating between message formats required for each.

Continue reading for more detail on each side of the implementation and some sample code for WebAuthn registration and authentication ceremonies.