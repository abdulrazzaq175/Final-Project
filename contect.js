// ===== CONTACT.JS =====

// Initialize EmailJS
(function() {
  emailjs.init("iSzY3bzzEdXySMbD4"); // ✅ Your Public Key
})();

// Form Submit Event
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("service_vrh3a4a", "template_8n02xic", this)
    .then(() => {
      alert("✅ Message sent successfully!");
      this.reset();
    }, (error) => {
      alert("❌ Failed to send message: " + JSON.stringify(error));
    });
});
