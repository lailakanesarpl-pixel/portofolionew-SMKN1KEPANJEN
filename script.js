/* Menu navigasi HP */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {
    const menuTerbuka = navMenu.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", menuTerbuka);
    menuToggle.setAttribute(
        "aria-label",
        menuTerbuka ? "Tutup menu" : "Buka menu"
    );
    menuToggle.textContent = menuTerbuka ? "✕" : "☰";
});

// Tutup menu setelah salah satu link dipilih
navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Buka menu");
        menuToggle.textContent = "☰";
    });
});


/* Animasi saat halaman digulir */
const elemenAnimasi = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const pengamat = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                pengamat.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    elemenAnimasi.forEach(function (elemen) {
        pengamat.observe(elemen);
    });
} else {
    elemenAnimasi.forEach(function (elemen) {
        elemen.classList.add("visible");
    });
}


/* Informasi proyek */
const daftarProyek = [
    {
        judul: "Website Biodata",
        deskripsi: "Website sederhana untuk memperkenalkan diri dan menampilkan informasi biodata.",
        teknologi: "HTML dan CSS"
    },
    {
        judul: "Tabel Data Siswa",
        deskripsi: "Halaman tabel data siswa dengan susunan yang rapi menggunakan HTML dan CSS.",
        teknologi: "HTML dan CSS"
    },
    {
        judul: "Website Portofolio",
        deskripsi: "Website pribadi untuk menampilkan profil, keahlian, proyek, dan informasi kontak.",
        teknologi: "HTML, CSS, dan JavaScript"
    }
];


/* Pop-up detail proyek */
const projectDialog = document.getElementById("projectDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogDescription = document.getElementById("dialogDescription");
const dialogTech = document.getElementById("dialogTech");
const dialogClose = document.getElementById("dialogClose");

document.querySelectorAll(".project-card").forEach(function (kartu) {
    kartu.addEventListener("click", function () {
        const nomorProyek = Number(kartu.dataset.project);
        const proyek = daftarProyek[nomorProyek];

        if (!proyek) return;

        dialogTitle.textContent = proyek.judul;
        dialogDescription.textContent = proyek.deskripsi;
        dialogTech.textContent = "Teknologi: " + proyek.teknologi;

        projectDialog.showModal();
    });
});

dialogClose.addEventListener("click", function () {
    projectDialog.close();
});

// Tutup pop-up saat area luar kotak diklik
projectDialog.addEventListener("click", function (event) {
    if (event.target === projectDialog) {
        projectDialog.close();
    }
});


/* Tahun otomatis di footer */
document.getElementById("currentYear").textContent =
    new Date().getFullYear();


/* Mode terang dan gelap */
const themeToggle = document.getElementById("themeToggle");

// Baca tema yang pernah dipilih
let temaTersimpan = null;

try {
    temaTersimpan = localStorage.getItem("portfolio-theme");
} catch (error) {
    // Website tetap bisa digunakan jika penyimpanan tidak tersedia
}

if (temaTersimpan === "dark") {
    document.body.classList.add("dark-mode");
}

// Sesuaikan tulisan tombol dengan tema aktif
function perbaruiTombolTema() {
    const modeGelap = document.body.classList.contains("dark-mode");

    themeToggle.textContent = modeGelap
        ? "☀ Mode Terang"
        : "☾ Mode Gelap";

    themeToggle.setAttribute("aria-pressed", String(modeGelap));
}

perbaruiTombolTema();

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    const modeGelap = document.body.classList.contains("dark-mode");

    try {
        localStorage.setItem(
            "portfolio-theme",
            modeGelap ? "dark" : "light"
        );
    } catch (error) {
        // Tema tetap berubah meskipun tidak bisa disimpan
    }

    perbaruiTombolTema();
});