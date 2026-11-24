const signupForm = document.querySelector(".signup-form");
const formMessage = document.querySelector(".form-message");

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "Demo only — your email hasn't been sent.";
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

const setMenuOpen = (isOpen) => {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  navLinks.classList.toggle("is-open", isOpen);
};

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});

const pricingSection = document.querySelector(".pricing-section");
const billingSwitch = pricingSection.querySelector(".billing-switch");
const planPrices = [...pricingSection.querySelectorAll(".plan-price")];
const planCards = [...pricingSection.querySelectorAll(".plan-card")];
const priceRange = pricingSection.querySelector("#price-range");
const rangeValue = pricingSection.querySelector(".range-value");

const updateRange = () => {
  const min = Number(priceRange.min);
  const max = Number(priceRange.max);
  const value = Number(priceRange.value);
  const progress = ((value - min) / (max - min)) * 100;

  rangeValue.textContent = `$${value}`;
  priceRange.style.setProperty("--range-progress", `${progress}%`);
  priceRange.parentElement.style.setProperty(
    "--range-position",
    `${progress}%`,
  );

  const closestCard = planCards.reduce((closest, card) => {
    const price = Number(card.querySelector(".plan-price").textContent.slice(1));
    const closestPrice = Number(
      closest.querySelector(".plan-price").textContent.slice(1),
    );
    return Math.abs(price - value) < Math.abs(closestPrice - value)
      ? card
      : closest;
  });

  planCards.forEach((card) => {
    card.classList.toggle("plan-range-active", card === closestCard);
  });
};

const setBilling = (isQuarterly) => {
  billingSwitch.setAttribute("aria-checked", String(isQuarterly));
  billingSwitch.setAttribute(
    "aria-label",
    isQuarterly ? "Quarterly billing" : "Monthly billing",
  );

  planPrices.forEach((price) => {
    price.textContent = `$${price.dataset[isQuarterly ? "quarterly" : "monthly"]}`;
  });

  const displayedPrices = planPrices.map((price) =>
    Number(price.textContent.slice(1)),
  );
  priceRange.max = String(Math.max(...displayedPrices));
  priceRange.value = planPrices[1].textContent.slice(1);
  updateRange();
};

billingSwitch.addEventListener("click", () => {
  setBilling(billingSwitch.getAttribute("aria-checked") !== "true");
});
priceRange.addEventListener("input", updateRange);
updateRange();
