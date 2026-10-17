const form = document.querySelector("#login-form");
const statusMessage = document.querySelector("#auth-status");
const passwordInput = document.querySelector("#password");
const emailInput = form.elements.email;
const rememberInput = form.elements.remember;
const revealButton = document.querySelector("#reveal-password");
const signOutButton = document.querySelector("#sign-out");
const loginSubtitle = document.querySelector(".login-subtitle");
const clients = window.tekGoSupabaseClients;
let activeClient = null;

function showMessage(message) {
  statusMessage.textContent = message;
  statusMessage.classList.add("visible");
}

function showSession(session, client, remembered) {
  if (!session?.user) return;
  activeClient = client;
  rememberInput.checked = remembered;
  form.hidden = true;
  signOutButton.hidden = false;
  loginSubtitle.textContent = "Your account is connected.";
  showMessage(`Signed in as ${session.user.email}. Authentication is connected; file storage is not set up yet.`);
}

function showSignedOut() {
  activeClient = null;
  form.hidden = false;
  signOutButton.hidden = true;
  loginSubtitle.textContent = "Sign in to access your office files.";
  statusMessage.classList.remove("visible");
  statusMessage.textContent = "";
}

revealButton.addEventListener("click", () => {
  const showing = passwordInput.type === "password";
  passwordInput.type = showing ? "text" : "password";
  revealButton.setAttribute("aria-label", showing ? "Hide password" : "Show password");
});

if (!clients) {
  form.addEventListener("submit", (event) => event.preventDefault());
  showMessage(window.tekGoSupabaseError || "Supabase is not configured. Contact your administrator.");
} else {
  const rememberedClient = clients.remembered;
  const temporaryClient = clients.temporary;

  rememberedClient.auth.onAuthStateChange((event, session) => {
    if (session?.user) showSession(session, rememberedClient, true);
    else if (event === "SIGNED_OUT" && activeClient === rememberedClient) showSignedOut();
  });

  temporaryClient.auth.onAuthStateChange((event, session) => {
    if (session?.user) showSession(session, temporaryClient, false);
    else if (event === "SIGNED_OUT" && activeClient === temporaryClient) showSignedOut();
  });

  Promise.all([rememberedClient.auth.getSession(), temporaryClient.auth.getSession()])
    .then(([remembered, temporary]) => {
      if (remembered.data.session) showSession(remembered.data.session, rememberedClient, true);
      else if (temporary.data.session) showSession(temporary.data.session, temporaryClient, false);
    })
    .catch(() => showMessage("Could not restore your session. Please sign in again."));

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector("button[type='submit']");
    const originalLabel = submitButton.querySelector("span").textContent;
    const selectedClient = rememberInput.checked ? rememberedClient : temporaryClient;

    submitButton.disabled = true;
    submitButton.querySelector("span").textContent = "Signing in...";
    statusMessage.classList.remove("visible");

    try {
      const { data, error } = await selectedClient.auth.signInWithPassword({
        email: emailInput.value.trim(),
        password: passwordInput.value,
      });

      if (error) throw error;
      passwordInput.value = "";
      activeClient = selectedClient;
      const otherClient = selectedClient === rememberedClient ? temporaryClient : rememberedClient;
      await otherClient.auth.signOut({ scope: "local" });
      showSession(data.session, selectedClient, selectedClient === rememberedClient);
    } catch {
      showMessage("Sign-in failed. Check your work email and password, or contact your office administrator.");
    } finally {
      submitButton.disabled = false;
      submitButton.querySelector("span").textContent = originalLabel;
    }
  });

  signOutButton.addEventListener("click", async () => {
    if (!activeClient) return;
    signOutButton.disabled = true;
    try {
      const { error } = await activeClient.auth.signOut({ scope: "local" });
      if (error) throw error;
      showSignedOut();
    } catch {
      showMessage("Could not sign out. Please refresh and try again.");
    } finally {
      signOutButton.disabled = false;
    }
  });
}

