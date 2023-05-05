# Webauthn.wtf

This project contains the website for webauth.wtf. This project uses these tools and libraries:

* Astro (static site generator)
* Tailwind (CSS framework)
* PageFind (search)

Pull requests are welcome! Happy coding!

## Astro

We are currently using Astro for our SSG technology. To run the project, just type this:

```
npm install
npm run start
```

## Running in a prod like environment

Some features don't work in dev mode. This includes pagefind search.

In order to test changes to such components, run in `preview` mode:

```
npm run build
npm run preview
```
