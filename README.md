# TEK.Go

A responsive TEK.Go landing page and email/password sign-in screen, built from the supplied brand and website references.

## Run locally

Serve this folder with any static web server, then open its local URL. For example:

```bash
python -m http.server 8000
```

The Supabase client is loaded from jsDelivr at the pinned `@supabase/supabase-js` version in `index.html`.

## Supabase

The project connects to the TEK.Go Supabase project for Auth. `supabase-config.js` contains the project URL and a **publishable** key, which is designed for browser use. Never add a Supabase secret or `service_role` key to this public repository.

Users must be provisioned by an administrator in Supabase Auth. Public self-signup is not enabled in this site. The sign-in field uses email because Supabase password sign-in accepts an email address or phone number, not an arbitrary username.

Authentication is connected. Office file storage, database tables, and Storage policies have not been added yet. Before adding private data, design the tenant access model and enable Row Level Security on every exposed table.

## Publish

The site is static and can be hosted from this folder on Cloudflare Pages. Configure the Supabase Auth redirect/site URL to match the final published domain before adding password recovery or OAuth flows.

