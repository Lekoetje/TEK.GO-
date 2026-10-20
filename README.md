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


## Phase 1 workspace engine

The workspace provides owner-scoped case records, private document uploads, metadata indexing, a manual review queue, and user-confirmed hearing/deadline entries. Apply `supabase/schema.sql` in the Supabase SQL Editor before using these features. Files are private and limited to 25 MB.

This first phase does **not** include OCR/document text extraction, automated conflict matching, legal-source crawling, Google Calendar sync, or email/phone notifications. Document details and dates must be checked by a person. Records are scoped to individual users for this initial phase; shared firm/team access needs an explicit organization-and-membership model before production use.
