/**
 * Indonesian text for everything in `data.ts` that a visitor reads. Structural fields (slugs,
 * images, links, tech names, years) stay in `data.ts`; only prose lives here.
 * `localized.ts` refuses to build if any project, experience, skill group or post is missing.
 */

export type ProjectText = {
    /** Only for titles that describe rather than name the project. */
    title?: string;
    description: string;
    features?: string[];
    challenges?: string;
};

export const projectsId: Record<string, ProjectText> = {
    seenara: {
        description: 'Arsip pribadi yang bisa dicari pakai bahasa sehari-hari. Simpan foto atau beberapa kata tentang harimu, lalu bertahun-tahun kemudian temukan lagi cukup dengan bertanya seingatnya. Pencarian seperti "tarian yang gue lihat waktu di Bali" tetap menemukan cerita yang tepat, meski kedua kata itu tidak pernah ditulis. Aplikasi iOS native dengan API Python di belakangnya, plus chat AI yang hanya menjawab dari cerita milikmu sendiri dan menyebutkan setiap cerita yang dipakainya.',
        features: [
            'Simpan cerita dalam hitungan detik: foto, beberapa kata, atau keduanya',
            'Pencarian semantik dengan bahasa sehari-hari, jadi cerita tetap ketemu tanpa perlu ingat kata persisnya',
            'Vision model menulis keterangan yang netral, membaca teks di dalam foto, dan memberi tag, sehingga foto tanpa catatan sama sekali pun tetap bisa ditemukan',
            'Tanya langsung ke cerita-ceritamu: chat AI yang hanya menjawab dari arsipmu sendiri dan menyebutkan cerita di balik setiap jawabannya',
            'Cerita yang saling berkaitan terhubung dengan sendirinya',
            'Tampilan jurnal untuk semua yang sudah disimpan, plus langganan Plus lewat RevenueCat',
        ],
        challenges: 'Ukuran keberhasilannya adalah ketemu kembali, bukan AI-nya: momen ketika seseorang mengetik pertanyaan samar tentang sesuatu yang dia lupa pernah simpan, lalu hasilnya muncul. Setiap keputusan teknis diukur dari situ. Pencarian, embedding, dan pencocokan kata berjalan bersamaan dalam satu query ke Postgres dengan pgvector, sehingga data relasional, vektor, dan full text cukup di satu database tanpa vector store terpisah. Di fitur chat, model yang mengutip sebuah cerita itu baru permintaan, bukan jaminan. Karena itu setiap kutipan dicocokkan dengan apa yang benar-benar diambil dari arsip, dan jawaban yang tidak menyisakan satu kutipan pun dibuang. Sebelum aplikasinya dibangun, produk ini harus lolos uji 30 hari dulu sebagai bot Telegram yang saya pakai sendiri setiap hari.',
    },
    'geospatial-facility-validation': {
        title: 'Validasi Fasilitas Geospasial',
        description: 'Alat validasi internal untuk produsen pakan ternak dan akuakultur. Alat ini mengaudit database lokasi pelanggan dengan citra satelit resolusi tinggi, mengelompokkan setiap koordinat sebagai kandang unggas, kolam budidaya, bangunan biasa, atau lahan pertanian dalam radius 150 m, lalu menandai data yang ternyata tidak berada di fasilitas sungguhan.',
        features: [
            'Membaca daftar koordinat langsung dari file CSV atau Excel milik klien, tanpa perlu diubah formatnya dulu',
            'Tiga tampilan satelit untuk setiap koordinat, dari detail jarak dekat sampai lanskap di sekitarnya',
            'Pemeriksaan dua tahap dalam radius 150 m: fasilitas apa yang ada, lalu apakah titik ini benar-benar jatuh di atasnya',
            'Perkiraan posisi fasilitas digambar di peta, dihubungkan ke titik yang tercatat dengan garis putus-putus kalau keduanya tidak cocok',
            'Pengecekan wilayah terhadap kabupaten dan provinsi yang tercatat di file, serta pencocokan dengan data peta publik',
            'Setiap hasil disertai alasannya, diekspor per baris ke spreadsheet yang bisa dibaca langsung oleh staf klien',
            'File koreksi yang memungkinkan manusia mengubah hasil, sambil tetap menyimpan pembacaan aslinya',
        ],
        challenges: 'Sebagian besar pekerjaannya adalah mengukur, bukan menebak. Membedakan kolam dari sawah yang tergenang lewat warna tidak berhasil, karena rata-rata kecerahannya hanya selisih sekitar dua tingkat abu-abu. Setelah diukur, aturannya ditulis ulang berdasarkan tekstur permukaan: air bervariasi sekitar 7 sampai 11 tingkat abu-abu di seluruh permukaannya, sedangkan sawah basah 26 sampai 38. Kegagalan kedua lebih halus. Tampilan lebar terbaca penuh dengan kolam budidaya, lalu sebuah kolam dilaporkan berada dekat titik padahal sebenarnya tidak ada. Ini baru kelihatan setelah lingkaran jarak digambar di atas citra dan kolam aslinya ternyata berjarak 150 sampai 350 m. Resolusi citra menentukan sumber mana yang dipakai: pada 0,6 m per piksel sebuah pasar terbaca seperti deretan kandang, sedangkan pada 0,2 m per piksel terbaca dengan benar, dan mengubah kalimat prompt tidak menolong sama sekali. Karena satu kali proses bisa membalik kira-kira satu dari empat baris pada kasus yang meragukan, setiap perubahan dinilai dari beberapa kali percobaan, bukan dari satu hasil.',
    },
    infonih: {
        description: 'Ringkasan berita pribadi bertenaga AI yang di-hosting sendiri dan dikirim lewat Telegram. Sistem ini memantau sejumlah feed RSS pilihan, memakai Claude (Haiku 4.5) untuk menilai setiap artikel sesuai minat pengguna, lalu mengirim ringkasan harian berisi 5–7 berita pilihan setiap pukul 7 pagi waktu setempat. Dirancang untuk satu pengguna lebih dulu, dengan arsitektur heksagonal dalam sekitar 3.500 baris kode.',
        features: [
            'Polling RSS dengan upsert tiga kemungkinan yang aman dari race condition (insert / tambah sumber / duplikat) dalam satu statement SQL',
            'Penilaian LLM terhadap profil minat yang berversi — mengubah minat hanya menilai ulang baris yang sudah usang',
            'Output terstruktur dari Claude divalidasi dengan skema Pydantic di batas API',
            'Scheduler berbasis database yang disinkronkan setiap 60 detik — tambah, jeda, atau hapus sumber dari Telegram tanpa restart',
            'Deploy dua proses (scheduler + bot worker) yang berbagi satu Postgres, keduanya dibangun dari satu Dockerfile',
            'Antarmuka sengaja hanya lewat Telegram — tanpa dashboard web, tanpa port publik, tanpa domain, tanpa TLS',
            'Cakupan tes sekitar 71% terhadap database Postgres sungguhan (tanpa mocking SQLAlchemy)',
        ],
        challenges: 'Merancang untuk satu pengguna dengan batas biaya bulanan yang tetap memengaruhi setiap keputusan arsitektur: tidak ada multi-tenancy, tidak ada dashboard web, dan tidak ada deduplikasi berbasis embedding di versi pertama. Struktur heksagonal (Protocol domain dipisah dari adapter Postgres) membuat urusan LLM dan Telegram masing-masing cukup diganti di satu file, sehingga pindah ke model lokal atau platform chat lain nanti tetap terkendali. Loop penilaiannya juga butuh kolom minat yang berversi, supaya mengubah minat lewat Telegram hanya menilai ulang baris yang usang, bukan seluruh tabel.',
    },
    'wedding-website': {
        title: 'Website Pernikahan Saya',
        description: 'Website pernikahan pribadi untuk membagikan detail acara, mengumpulkan RSVP, dan menampilkan foto. Dibangun dengan Next.js dan TailwindCSS, proyek ini memadukan desain yang cantik dengan fungsi yang praktis bagi para tamu.',
        features: [
            'Detail acara dan jadwal lengkap',
            'Sistem RSVP digital',
            'Peta interaktif dan informasi lokasi',
            'Galeri foto dan kisah kami berdua',
            'Tampilan yang nyaman di ponsel untuk semua tamu',
        ],
        challenges: 'Membuat website yang cantik sekaligus fungsional, dan tetap cepat dibuka lewat jaringan seluler saat hari acara, membutuhkan optimasi aset yang cermat dan desain responsif yang matang.',
    },
    'sekula-indonesia': {
        description: 'SEKULA Indonesia adalah platform dashboard SaaS yang dirancang khusus untuk institusi pendidikan di Indonesia agar pengelolaan datanya lebih rapi. Sistem ini membantu sekolah, universitas, dan lembaga pendidikan mendigitalkan alur kerja administrasi, mengelola data siswa, dan menghasilkan analitik yang berguna untuk pengambilan keputusan.',
        features: [
            'Pengelolaan data pendidikan yang terpusat',
            'Hak akses bertingkat untuk admin, guru, dan staf',
            'Pengelolaan data siswa beserta pemantauan prestasi akademik',
            'Modul keuangan untuk pengelolaan biaya dan laporan',
            'Dashboard yang bisa disesuaikan dengan analitik real-time',
            'Digitalisasi dan pengelolaan dokumen',
            'Sesuai dengan regulasi dan standar pendidikan di Indonesia',
        ],
        challenges: 'Membangun sistem yang bisa menampung kebutuhan berbagai jenis institusi pendidikan sekaligus mematuhi regulasi di Indonesia membutuhkan riset mendalam dan wawancara dengan banyak pihak. Selain itu, merancang arsitektur yang mampu menangani data dalam jumlah besar dengan performa tetap terjaga di berbagai daerah yang kualitas internetnya berbeda-beda menjadi tantangan teknis tersendiri. Saya menerapkan desain modular, optimasi database yang cermat, dan kemampuan offline-first agar sistem tetap andal di semua kondisi.',
    },
    'ibhc-2024': {
        description: 'Website resmi International Bioethics & Humanities Conference 2024, konferensi bergengsi yang diselenggarakan oleh UNESCO dan Universitas Gadjah Mada (UGM). Saya mengembangkan platform lengkap untuk pendaftaran peserta, informasi program, dan materi konferensi.',
        features: [
            'Sistem pendaftaran peserta yang aman',
            'Pengelolaan jadwal dan program konferensi',
            'Profil pembicara dan materi presentasi',
            'Dashboard admin untuk panitia',
            'Deploy dengan Docker agar lingkungannya konsisten',
        ],
        challenges: 'Membangun sistem yang sanggup menahan lonjakan trafik di masa pendaftaran sambil menjaga keamanan data untuk acara akademik internasional membutuhkan perencanaan arsitektur yang matang. Saya menerapkan optimasi database dan strategi caching agar performanya tetap stabil di bawah beban tinggi.',
    },
    mentorgue: {
        description: 'Aplikasi mobile yang menyediakan buku dan audiobook premium lewat paket langganan. Dikembangkan dengan React Native untuk memberi pengalaman membaca dan mendengarkan yang mulus bagi pengguna yang mencari konten pengembangan diri dan karier.',
        features: [
            'Akses konten premium berbasis langganan',
            'Pemutar audiobook yang tetap berjalan di latar belakang',
            'Bisa membaca dan mendengarkan secara offline',
            'Rekomendasi yang disesuaikan dengan preferensi pengguna',
            'Update over-the-air lewat CodePush untuk iterasi yang cepat',
        ],
        challenges: 'Membuat pemutar audio yang konsisten di berbagai model perangkat, sekaligus menangani pemutaran di latar belakang dan kontrol audionya, cukup menantang secara teknis. Saya memakai TrackPlayer dengan custom hook untuk menghasilkan pengalaman audio yang andal.',
    },
    hellocaddy: {
        description: 'Aplikasi mobile kaya fitur untuk para penggemar golf, untuk menjelajahi dan memesan fasilitas golf. Terintegrasi dengan Bluetooth untuk aksesori golf dan pembayaran aman lewat Stripe.',
        features: [
            'Peta interaktif lapangan golf',
            'Ketersediaan dan pemesanan tee time secara real-time',
            'Integrasi Bluetooth dengan aksesori golf',
            'Pembayaran aman lewat Stripe',
            'Kartu skor digital dan pemantauan performa',
        ],
        challenges: 'Menjaga koneksi Bluetooth tetap andal di berbagai model perangkat tanpa mengorbankan kenyamanan pengguna membutuhkan banyak pengujian dan optimasi. Integrasi dengan beberapa API untuk data lapangan dan pembayaran juga menuntut penanganan error dan state management yang cermat.',
    },
    'fk-trisakti': {
        title: 'Aplikasi Mobile FK Trisakti',
        description: 'Aplikasi mobile yang dirancang khusus untuk pengelolaan kepaniteraan klinik (koas) di Fakultas Kedokteran Universitas Trisakti. Platform ini menyederhanakan urusan administrasi rotasi klinik yang rumit, sehingga mahasiswa bisa fokus belajar alih-alih mengurus berkas. Seluruh proses kepaniteraan didigitalkan, mulai dari dokumentasi, evaluasi, penjadwalan, hingga pemantauan performa.',
        features: [
            'Pembuatan dan pengiriman logbook digital untuk tindakan klinis',
            'Sistem evaluasi lengkap bagi pembimbing untuk menilai performa mahasiswa',
        ],
        challenges: 'Membangun sistem yang sesuai dengan standar pendidikan kedokteran yang ketat, dengan tampilan yang mudah dipakai oleh mahasiswa koas yang sibuk maupun dokter pembimbing, membutuhkan riset domain dan uji coba pengguna yang mendalam. Menjaga privasi data pasien dan kepatuhan pada regulasi kesehatan juga menjadi tantangan besar. Saya menerapkan arsitektur yang aman dengan enkripsi yang kuat dan kontrol akses yang ketat, sambil tetap menjaga aplikasi responsif di berbagai perangkat yang dipakai di lingkungan klinik.',
    },
    'smartcart-itc': {
        description: 'Aplikasi mobile khusus untuk pelanggan International Test Center (ITC), untuk mendaftar ujian sertifikasi dan membeli program pelatihan. Seluruh prosesnya dibuat ringkas, mulai dari melihat kursus yang tersedia sampai pendaftaran dan pembayaran.',
        features: [
            'Sistem pendaftaran ujian sertifikasi',
            'Katalog program pelatihan dengan informasi lengkap',
            'Integrasi payment gateway yang aman',
            'Profil pengguna dengan riwayat sertifikasi',
            'Notifikasi push untuk jadwal dan hasil ujian',
        ],
        challenges: 'Membangun sistem yang andal untuk berbagai jenis sertifikasi beserta persyaratannya masing-masing, sambil menjaga integritas data antara aplikasi dan sistem backend ITC, membutuhkan desain API yang cermat dan penanganan error yang kuat.',
    },
    'gaia-safari': {
        description: 'Website premium untuk layanan perjalanan Gaia Safari yang menampilkan paket tur petualangan dan safari. Dibangun dengan Nuxt.js dan terintegrasi dengan Storyblok CMS agar tim klien mudah mengelola kontennya sendiri.',
        features: [
            'Desain visual yang memikat untuk menonjolkan destinasi safari',
            'Sistem pemesanan tur yang interaktif',
            'Pengelolaan konten lewat Storyblok untuk staf non-teknis',
            'Desain responsif untuk semua perangkat',
            'Optimasi performa untuk konten yang sarat gambar',
        ],
        challenges: 'Mengelola integrasi yang rumit dengan Storyblok CMS sambil menjaga waktu muat tetap cepat untuk gambar beresolusi tinggi cukup menantang. Saya menerapkan lazy loading dan optimasi gambar agar situs tetap terasa mulus meski kontennya sangat kaya.',
    },
    'bikin-acara': {
        description: 'Platform perencanaan acara online yang membuat urusan menyiapkan acara jadi lebih sederhana. Pengguna bisa merencanakan, mengatur anggaran, dan mengelola daftar tamu untuk berbagai perayaan lewat antarmuka yang mudah dipahami.',
        features: [
            'Alat perencanaan acara dengan drag-and-drop',
            'Integrasi marketplace vendor',
            'Pengelolaan daftar tamu dengan pelacakan RSVP',
            'Kalkulator anggaran dan pencatatan pengeluaran',
            'Pembuatan dan pengelolaan timeline acara',
        ],
        challenges: 'Menyeimbangkan state management yang rumit di banyak fitur perencanaan tanpa mengorbankan performa adalah tantangan besar. Saya memakai Recoil bersama React Query untuk membangun aplikasi yang tetap responsif meski kebutuhan state-nya kompleks.',
    },
    tamamedi: {
        description: 'Platform edukasi berisi simulasi ujian lengkap di bidang kesehatan, termasuk uji kompetensi untuk dokter, dokter gigi, perawat, bidan, dan apoteker. Membantu tenaga kesehatan mempersiapkan diri menghadapi ujian sertifikasi dan perizinan.',
        features: [
            'Simulasi ujian khusus untuk tiap bidang kesehatan',
            'Analitik performa dan pemantauan kemajuan belajar',
            'Ujian dengan batas waktu yang meniru ujian sungguhan',
            'Pembahasan lengkap untuk setiap soal',
            'Alat untuk merencanakan dan menjadwalkan belajar',
        ],
        challenges: 'Merancang arsitektur yang mendukung format ujian yang berbeda-beda untuk tiap spesialisasi kesehatan, sekaligus menyajikan analitik performa yang akurat, cukup menuntut secara teknis. Saya membuat mesin render khusus untuk tiap tipe soal dan sistem penilaian yang fleksibel.',
    },
    'hellocaddy-biz': {
        description: 'Aplikasi pendamping Hellocaddy untuk para pengelola fasilitas golf. Aplikasi ini memungkinkan pengelolaan lapangan golf secara menyeluruh, mulai dari penjadwalan tee time, detail fasilitas, hingga data pelanggan, lewat antarmuka mobile yang mudah dipakai.',
        features: [
            'Dashboard pengelolaan fasilitas dengan metrik real-time',
            'Alat penjadwalan dan pengelolaan staf',
            'Pengaturan ketersediaan tee time dan pengelolaan pemesanan',
            'Pencatatan data dan preferensi pelanggan',
            'Pembuatan kode QR untuk akses dan verifikasi fasilitas',
        ],
        challenges: 'Membuat aplikasi bisnis yang fiturnya lengkap tapi tetap mudah dipakai oleh staf non-teknis cukup menantang. Saya fokus pada desain UX yang intuitif tanpa mengurangi fungsi-fungsi penting yang dibutuhkan pengguna bisnis.',
    },
    'golden-mulia': {
        description: 'Aplikasi e-commerce mobile untuk membeli produk emas secara online, dibangun di atas boilerplate Ignite agar performanya optimal dan kodenya mudah dirawat. Menyediakan transaksi yang aman dan pembaruan harga emas secara real-time.',
        features: [
            'Pemantauan harga emas secara real-time',
            'Pemrosesan transaksi yang aman',
            'Katalog produk dengan spesifikasi lengkap',
            'Profil pengguna dengan riwayat pembelian',
            'Fitur wishlist dan favorit',
        ],
        challenges: 'Membangun platform yang aman untuk transaksi bernilai tinggi sambil menampilkan harga yang terus mengikuti pergerakan pasar emas membutuhkan perencanaan arsitektur yang matang. Saya memadukan validasi di server dengan pengecekan di sisi klien untuk memastikan keamanan transaksi.',
    },
    'solo-great-sale': {
        description: 'Aplikasi mobile untuk gelaran tahunan Solo Great Sale tahun 2021, 2022, dan 2023. Platform ini mempertemukan konsumen dengan merchant peserta, mengelola promo, dan memfasilitasi transaksi digital selama festival belanja besar di Solo ini berlangsung.',
        features: [
            'Peta interaktif merchant peserta',
            'Sistem kupon digital dan promo',
            'Jadwal acara dan notifikasi',
            'Program loyalitas dan poin untuk pengguna',
            'Dashboard merchant untuk mengelola promo',
        ],
        challenges: 'Menangani lonjakan trafik selama festival dengan performa yang konsisten di tiga tahun penyelenggaraan menuntut perbaikan arsitektur yang berkelanjutan. Saya menerapkan optimasi backend dan strategi caching untuk mengimbangi jumlah pengguna yang terus bertambah setiap tahunnya.',
    },
    'amazing-force': {
        description: 'Aplikasi perencanaan keuangan untuk membantu pengguna mengatur keuangan, menetapkan target finansial, mencatat pengeluaran, dan merencanakan investasi. Tampilannya intuitif, dibangun dengan React Native dan styling Tailwind.',
        features: [
            'Perencanaan anggaran dan pencatatan pengeluaran',
            'Penetapan target finansial dan pemantauan kemajuannya',
            'Pengelolaan portofolio investasi',
            'Pengelompokan dan analisis pengeluaran',
            'Indikator kesehatan finansial beserta rekomendasinya',
        ],
        challenges: 'Menyajikan informasi keuangan yang rumit dalam visualisasi yang mudah dipahami, sambil menjaga privasi dan keamanan data, menjadi tantangan besar. Saya membuat komponen grafik sendiri dan menerapkan strategi penyimpanan lokal yang aman untuk menjawab kedua hal itu.',
    },
    takenaka: {
        description: 'Aplikasi manajemen tugas internal untuk staf dan manajemen, agar alur kerja proyek dan pelaporannya lebih ringkas. Dikembangkan dengan boilerplate Osmi Kit, aplikasi ini memudahkan pembagian tugas, pemantauan progres, dan pembuatan laporan.',
        features: [
            'Sistem pembagian dan pendelegasian tugas',
            'Pemantauan progres secara real-time',
            'Pembuatan laporan otomatis',
            'Analitik performa tim',
            'Pengelolaan tenggat waktu dan notifikasi',
        ],
        challenges: 'Membangun alat internal yang memenuhi kebutuhan staf sekaligus manajemen, dengan tingkat akses dan alur kerja yang berbeda, membutuhkan perencanaan UX yang cermat. Saya menerapkan kontrol akses berbasis peran dan tampilan yang bisa disesuaikan untuk tiap jenis pengguna.',
    },
    'batik-senowati': {
        description: 'Platform e-commerce yang menampilkan produk batik tradisional dari Senowati. Websitenya menghadirkan pengalaman belanja yang mulus dengan pembayaran aman lewat integrasi Midtrans, pilihan kustomisasi produk, dan informasi lengkap tentang proses pembuatan batik.',
        features: [
            'Katalog produk dengan filter lengkap',
            'Pembayaran aman lewat Midtrans',
            'Akun pengguna dengan riwayat pesanan',
            'Pilihan kustomisasi motif batik',
            'Konten edukasi tentang tradisi batik',
        ],
        challenges: 'Membangun sistem yang bisa menangani pesanan khusus dengan variasi motif batik, sambil terintegrasi dengan payment gateway Midtrans, membutuhkan desain API yang cermat dan logika validasi yang kuat.',
    },
    edvisee: {
        description: 'Aplikasi web berbasis blockchain untuk lowongan kerja dan pengelolaan dokumen. Edvisee memungkinkan pengguna melamar pekerjaan dan mengelola dokumen profesionalnya dengan aman, memakai teknologi blockchain untuk verifikasi dan autentikasi.',
        features: [
            'Penyimpanan dokumen yang terverifikasi blockchain',
            'Sistem lowongan dan lamaran kerja',
            'Pengelolaan profil pengguna yang aman',
            'Verifikasi keaslian dokumen',
            'Dashboard perusahaan untuk mengelola pelamar',
        ],
        challenges: 'Mengintegrasikan blockchain untuk verifikasi dokumen sambil tetap memberi pengalaman yang mudah bagi pengguna awam menuntut konsep-konsep blockchain yang rumit disembunyikan di balik antarmuka yang sederhana.',
    },
    'akuntan-pribadiku': {
        description: 'Landing page profesional untuk perusahaan jasa akuntansi, untuk menampilkan layanan, keahlian tim, dan testimoni klien. Desainnya modern dengan animasi yang halus dan tata letak responsif, dibangun dengan Next.js dan TailwindCSS.',
        features: [
            'Etalase layanan dengan penjelasan lengkap',
            'Profil anggota tim beserta keahliannya',
            'Testimoni dan kisah sukses klien',
            'Formulir kontak dengan pilihan layanan',
            'Desain responsif dengan animasi modern',
        ],
        challenges: 'Membuat situs profesional yang bisa menjelaskan layanan akuntansi yang rumit kepada calon klien membutuhkan perencanaan UX dan penyusunan konten yang cermat, agar informasi teknisnya tetap mudah dicerna.',
    },
    'soulna-entertainment': {
        description: 'Landing page dinamis untuk Soulna Entertainment yang menampilkan layanan manajemen acara, penampilan sebelumnya, dan informasi pemesanan. Desainnya modern dengan elemen interaktif dan galeri media.',
        features: [
            'Galeri acara-acara sebelumnya',
            'Paket layanan dengan informasi lengkap',
            'Profil artis dan contoh penampilan',
            'Sistem pemesanan dengan kalender ketersediaan',
            'Testimoni dari klien sebelumnya',
        ],
        challenges: 'Membuat konten yang kaya media tetap cepat dimuat tanpa mengorbankan kualitas visual membutuhkan strategi lazy loading yang matang dan format gambar generasi terbaru.',
    },
};

/** Tech tags that are descriptions rather than product names. Anything not listed stays as is. */
export const techId: Record<string, string> = {
    'Satellite Imagery': 'Citra Satelit',
    'Geospatial Analysis': 'Analisis Geospasial',
    Geospatial: 'Geospasial',
    'Web Application': 'Aplikasi Web',
    Performance: 'Performa',
    Security: 'Keamanan',
    Payments: 'Pembayaran',
};

export type ExperienceText = {
    location: string;
    type: string;
    duration: string;
    description: string[];
};

/** Keyed by `company|duration` as written in `data.ts`. */
export const experiencesId: Record<string, ExperienceText> = {
    'Yindjin Genggam Bersama|Jan 2025 — Present': {
        location: 'Indonesia (Remote)',
        type: 'Kontrak',
        duration: 'Jan 2025 — Sekarang',
        description: [
            'Mengembangkan layanan Java untuk menangani callback dari payment gateway, memproses event callback, dan meneruskan pembaruannya ke Solace untuk dipakai layanan lain.',
            'Membangun job rekonsiliasi berbasis cron dan penanganan pembayaran sebagian agar database tetap sinkron dengan data callback dari payment gateway.',
            'Membangun alat AI yang memvalidasi database koordinat pelanggan sebuah perusahaan pakan dengan citra satelit, memakai vision model untuk membedakan kandang unggas dan kolam budidaya dari bangunan biasa dan lahan pertanian, lewat pipeline citra multi-skala dan prompt yang terukur serta berversi.',
        ],
    },
    'Gani.ai|Jun 2025 — Jun 2026': {
        location: 'Indonesia (Remote)',
        type: 'Kontrak',
        duration: 'Jun 2025 — Jun 2026',
        description: [
            'Membangun fitur chat AI dengan streaming real-time dan Contract Lifecycle Management (CLM), sehingga konsultasi hukum dengan asisten AI berjalan mulus.',
            'Mengembangkan fitur chat dengan dokumen, termasuk penyusunan dokumen dengan AI, review dokumen di dalam chat, dan document canvas untuk alur kerja dokumen hukum dari awal sampai akhir.',
            'Bekerja sama dengan tim Backend dan AI untuk mengintegrasikan berbagai kemampuan AI, agar informasi hukum tersampaikan dengan akurat dan mudah diakses di seluruh fitur platform.',
        ],
    },
    'Hyperhire|Nov 2024 — Apr 2025': {
        location: 'Seoul, Korea Selatan (Remote)',
        type: 'Kontrak',
        duration: 'Nov 2024 — Apr 2025',
        description: [
            'Mengembangkan dashboard kepatuhan internal untuk klien hukum skala enterprise dalam mengelola perkara, sehingga pelacakan kasus dan pelaporannya lebih ringkas.',
            'Membangun platform komunitas ala Reddit untuk penggemar kripto, lengkap dengan diskusi real-time, kurasi konten, dan fitur yang mendorong interaksi.',
            'Menyelesaikan proyek dengan tenggat yang sangat ketat, konsisten tepat waktu tanpa mengorbankan kualitas kode maupun fungsinya.',
        ],
    },
    'ATech Solution Limited|Sep 2023 — Dec 2024': {
        location: 'Hong Kong (Remote)',
        type: 'Full-time',
        duration: 'Sep 2023 — Des 2024',
        description: [
            'Mengembangkan sistem keamanan penting dengan AWS Cognito dan Lambda, memastikan autentikasi yang aman dan andal.',
            'Menyelesaikan proyek-proyek kunci: Authentication Security, Vulnerability Scanning, Log Search System, dan template CI/CD.',
            'Mempelajari dan langsung menerapkan fitur-fitur AWS tingkat lanjut sambil merilis fitur penting dengan tenggat yang sangat ketat.',
        ],
    },
    'Dagangan Indonesia|Dec 2020 — Sep 2023': {
        location: 'Yogyakarta (Remote)',
        type: 'Full-time',
        duration: 'Des 2020 — Sep 2023',
        description: [
            'Mengembangkan dan mengoptimalkan aplikasi mobile dengan React Native, melayani ribuan pedagang di pedesaan di seluruh Indonesia.',
            'Memimpin deploy ke Play Store dan build production, memastikan siklus rilis yang lancar dan aplikasi yang stabil.',
            'Merilis fitur Payment System, Event Tracking, A/B Testing, dan In-App Update yang mendorong pertumbuhan bisnis dan retensi pengguna.',
        ],
    },
    'Self-employed|Apr 2020 — Present': {
        location: 'Remote',
        type: 'Per proyek',
        duration: 'Apr 2020 — Sekarang',
        description: [
            'Bekerja sama dengan beragam klien untuk merancang dan membangun aplikasi web dan mobile dengan Next.js, Nuxt.js, React Native, dan Go.',
            'Mengelola siklus proyek secara penuh, dari pengumpulan kebutuhan, pengembangan, sampai deploy, termasuk menerapkan alur CI/CD dengan Docker dan GitHub Actions.',
        ],
    },
    'Gomodo Technologies|Feb 2020 — Nov 2020': {
        location: 'Yogyakarta',
        type: 'Full-time',
        duration: 'Feb 2020 — Nov 2020',
        description: [
            'Ikut mengembangkan fitur frontend dan merawat produk web yang berfokus pada pengguna untuk klien e-commerce B2B.',
        ],
    },
};

/** Experience fields that are not prose but still read differently in Indonesian. */
export const experienceCompanyId: Record<string, string> = {
    'Self-employed': 'Mandiri',
};

export const skillGroupsId: Record<string, { group: string; items?: Record<string, string> }> = {
    Frameworks: { group: 'Framework' },
    Languages: { group: 'Bahasa' },
    'AI / LLM': {
        group: 'AI / LLM',
        items: {
            'RAG pipelines': 'Pipeline RAG',
            'Vector DBs': 'Vector database',
            'OpenAI / Anthropic APIs': 'API OpenAI / Anthropic',
        },
    },
    Data: { group: 'Data' },
    Infra: { group: 'Infrastruktur' },
    Practice: { group: 'Praktik' },
};

export type PostText = {
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    content: string;
};

export const blogPostsId: Record<string, PostText> = {
    'mastering-typescript-advanced-types-patterns': {
        title: 'Menguasai TypeScript: Tipe dan Pola Tingkat Lanjut',
        date: '15 Mei 2025',
        excerpt: 'Menjelajahi fitur TypeScript tingkat lanjut seperti conditional types, mapped types, dan utility types untuk menulis kode yang lebih kokoh dan mudah dirawat.',
        tags: ['TypeScript', 'JavaScript', 'Pengembangan Web'],
        content: `<p>TypeScript berhenti jadi sekadar <em>JavaScript plus tipe</em> begitu kamu mulai menulis tipe yang <em>ikut bekerja</em>. Tulisan ini mengajak berkeliling ke pola-pola yang paling sering saya pakai saat merancang API library dan utilitas internal bersama.</p>
<h2>1. Conditional types sebagai alur kontrol</h2>
<p>Conditional types memungkinkan kita bercabang berdasarkan bentuk sebuah generic. Cara kerjanya mirip bahasa kecil yang murni di dalam sistem tipe — dan begitu kamu memperlakukannya seperti itu, <code>Pick</code>, <code>Omit</code>, dan <code>ReturnType</code> dari standard library tidak lagi terasa seperti sulap.</p>
<h2>2. Mapped types untuk transformasi</h2>
<p>Mapped types melakukan iterasi atas key sebuah tipe. Padukan dengan remapping <code>as</code>, dan kamu bisa mengganti nama, menyaring, atau merombak total sebuah tipe hanya dalam satu deklarasi.</p>
<h2>3. Template literal types untuk permukaan API</h2>
<p>Kalau library-mu menerima string berbentuk <code>"on:click"</code> atau <code>"user.profile.name"</code>, tata bahasanya bisa dituliskan langsung di sistem tipe, alih-alih bergantung pada validasi saat runtime.</p>
<h2>Penutup</h2>
<p>Intinya bukan soal pintar-pintaran — melainkan API yang tipenya rapi akan mengajari orang berikutnya cara memakainya, tanpa mereka perlu membuka dokumentasi.</p>`,
    },
};
