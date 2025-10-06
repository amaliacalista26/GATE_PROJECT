document.addEventListener("DOMContentLoaded", function () {
  const btnDaftar = document.getElementById("btnDaftar");
  const roleSelect = document.getElementById("roleSelect");

  btnDaftar.addEventListener("click", function() {
    const role = roleSelect.value;

    if (role === "freelancer") {
      window.location.href = "freelancer/freelancer.html";
    } else if (role === "employer") {
      window.location.href = "employer/employer.html";
    } else {
      alert("Mohon diisi peran Anda sebelum melanjutkan.");
    }
  });
});


document.getElementById("signin").addEventListener("click", function(event) {
  event.preventDefault(); // cegah form benar-benar dikirim
  window.location.href = "foundation/foundation.html"; // pindah ke halaman foundation.html
});


