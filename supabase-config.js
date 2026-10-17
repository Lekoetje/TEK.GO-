// This browser key is intentionally public. Never place a Supabase secret or service_role key here.
(() => {
  const { createClient } = window.supabase || {};

  if (!createClient) {
    window.tekGoSupabaseError = "Supabase could not be loaded. Refresh the page and try again.";
    return;
  }

  const projectUrl = "https://virjxpykkjvqolzcyswp.supabase.co";
  const publishableKey = "sb_publishable_97h4QeNtYMGI1UayG3dwLw_tbwKxCNO";

  const makeClient = (storage, storageKey) => createClient(projectUrl, publishableKey, {
    auth: {
      autoRefreshToken: true,
      detectSessionInUrl: true,
      persistSession: true,
      storage,
      storageKey,
    },
  });

  window.tekGoSupabaseClients = {
    remembered: makeClient(window.localStorage, "tekgo-auth-remembered"),
    temporary: makeClient(window.sessionStorage, "tekgo-auth-temporary"),
  };
})();

