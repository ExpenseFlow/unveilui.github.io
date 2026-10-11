// Pre-fills the form from ?interest= / ?category= and submits it to
// Formspree, tagging the subject with the product and category.
(() => {
  const form = document.getElementById("contactForm");
  const category = document.getElementById("category");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");
  const params = new URLSearchParams(location.search);
  if (params.get("interest") === "access") {
    category.value = "access";
    subject.value = "Early access request";
    message.value = "Team name and size:\nWhat you prototype (and with which tools):\nHow you review prototypes today:\n";
  } else if (params.get("category")) {
    category.value = params.get("category");
  }
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ok = document.getElementById("successMessage");
    const err = document.getElementById("errorMessage");
    ok.hidden = err.hidden = true;
    const data = new FormData(form);
    const label = category.options[category.selectedIndex].text;
    data.set("subject", `[Unveil] [${label}] ${subject.value}`);
    try {
      const res = await fetch(form.action, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      form.hidden = true;
      ok.hidden = false;
      form.reset();
    } catch {
      err.hidden = false;
    }
  });
})();
