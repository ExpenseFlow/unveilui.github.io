(() => {
  const steps = [
    { path: "index.html", tag: "01 / 03 · DETAILS", title: "Good things\nare on their way.", description: "A simple, calm checkout for the things you love.", form: "Your details", count: "STEP 1 OF 3", labels: ["Full name", "Email address"], values: ["Alex Morgan", "alex@example.com"], action: "Continue to delivery", cursor: ["61%", "65%"] },
    { path: "delivery.html", tag: "02 / 03 · DELIVERY", title: "Almost\nthere.", description: "A delivery step that asks only what it needs.", form: "Delivery details", count: "STEP 2 OF 3", labels: ["Address", "Postal code"], values: ["18 Orchard Street", "M5V 2K7"], action: "Review your order", cursor: ["74%", "72%"] },
    { path: "review.html", tag: "03 / 03 · REVIEW", title: "One last\nlook.", description: "Everything in place before the order is confirmed.", form: "Your order", count: "STEP 3 OF 3", labels: ["Delivery", "Total"], values: ["Standard · 3–5 days", "$84.00"], action: "Place order", cursor: ["73%", "72%"] }
  ];
  const get = id => document.getElementById(id);
  const stepItems = [...document.querySelectorAll("#step-list li")];
  let step = 0;
  function render() {
    const data = steps[step];
    get("preview-path").textContent = data.path;
    get("prototype-step").textContent = data.tag;
    get("prototype-title").textContent = data.title;
    get("prototype-description").textContent = data.description;
    get("form-label").textContent = data.form;
    get("form-count").textContent = data.count;
    get("field-one-label").textContent = data.labels[0];
    get("field-two-label").textContent = data.labels[1];
    get("field-one-value").textContent = data.values[0];
    get("field-two-value").textContent = data.values[1];
    get("fake-next").firstChild.textContent = `${data.action} `;
    get("play-cursor").style.left = data.cursor[0];
    get("play-cursor").style.top = data.cursor[1];
    get("preview-progress").textContent = `Step ${step + 1} of 3`;
    get("prev-step").disabled = step === 0;
    get("next-step").firstChild.textContent = step === steps.length - 1 ? "Replay " : "Next step ";
    stepItems.forEach((item, index) => item.classList.toggle("current", index === step));
  }
  get("next-step").addEventListener("click", () => { step = (step + 1) % steps.length; render(); });
  get("prev-step").addEventListener("click", () => { if (step > 0) { step -= 1; render(); } });
  get("toggle-comment").addEventListener("click", event => {
    const visible = get("prototype").classList.toggle("show-feedback");
    event.currentTarget.setAttribute("aria-pressed", String(visible));
    event.currentTarget.firstChild.textContent = visible ? "Hide sample feedback " : "Show sample feedback ";
  });
  render();
})();
