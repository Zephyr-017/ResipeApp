# ResepKita - Recipe Application

UTS Pemrograman Mobile Lanjut.

## Identitas Mahasiswa
- **Nama**: Muhamad Zidan Rabani
- **NIM**: 2410501036
- **Kelas**: B
- **Tema Projek**: Tema A - ResepKita

## Tech Stack & Versi
- **Framework**: React Native (v0.81.5) dengan Expo SDK (v54.0.33)
- **State Management**: Zustand (v5.0.12)
- **Navigation**: React Navigation Native (v7.2.2), Bottom Tabs (v7.15.9), Stack (v7.8.10)
- **Local Storage**: AsyncStorage (v2.2.0)
- **API**: Fetch API native (Endpoint: TheMealDB API)

## Cara Install & Menjalankan Aplikasi

Pastikan Anda sudah menginstall **Node.js** dan memiliki akun **Expo Go** di HP Anda.

1. Clone repositori ini:
   ```bash
   git clone https://github.com/Zephyr-017/uts-mobile-lanjut-2410501036-MuhamadZidanRabani.git
   ```
2. Pindah ke direktori proyek:
   ```bash
   cd RecipeApp
   ```
3. Install dependensi:
   ```bash
   npm install
   ```
4. Jalankan aplikasi:
   ```bash
   npx expo start
   ```
5. Buka aplikasi **Expo Go** di HP (Android/iOS) dan scan QR Code yang muncul di terminal.

## Screenshots (5 Screen)
Berikut adalah tampilan antarmuka dari aplikasi ResepKita:

<p align="center">
  <img src="./assets/screenshots/ss_home.jpeg" width="250" alt="Home Screen">
  <img src="./assets/screenshots/ss_search.jpeg" width="250" alt="Search Screen">
  <img src="./assets/screenshots/ss_fav.jpeg" width="250" alt="Favorites Screen">
</p>
<p align="center">
  <img src="./assets/screenshots/ss_detail.jpeg" width="250" alt="Detail Screen">
  <img src="./assets/screenshots/ss_about.jpeg" width="250" alt="About Screen">
</p>

## Link Video Demo
Tonton video demo penggunaan aplikasi ResepKita di bawah ini:
https://drive.google.com/file/d/1zVqoIjaHtfO8l1TWIa8GvETdPbB3qr40/view?usp=drive_link

## Justifikasi Pemilihan State Management (Zustand)
Saya memilih Zustand sebagai pengelola state dalam proyek ini karena caranya yang sangat simpel dan ringan, sehingga kita tidak perlu menulis banyak kode rumit seperti pada Redux. Penggunaannya terasa sangat alami bagi pengembang React karena berbasis hooks, namun tetap memberikan performa yang cepat karena hanya memperbarui komponen yang memang membutuhkan data tersebut. Selain itu, Zustand sudah dilengkapi fitur canggih untuk menyimpan data secara otomatis ke memori perangkat (AsyncStorage), yang sangat memudahkan kita dalam mengelola fitur seperti daftar favorit tanpa konfigurasi yang membingungkan.

## Daftar Referensi
1. [React Native Official Documentation](https://reactnative.dev/docs/getting-started)
2. [Expo SDK Documentation](https://docs.expo.dev/)
3. [React Navigation 7.x](https://reactnavigation.org/)
4. [Zustand State Management](https://github.com/pmndrs/zustand)
5. [AsyncStorage Documentation](https://react-native-async-storage.github.io/async-storage/docs/usage/)
6. [Expo Vector Icons (Ionicons)](https://icons.expo.fyi/Index)
7. [TheMealDB Free API](https://www.themealdb.com/api.php)
8. [YouTube Tutorial - Recipe](https://youtu.be/iPVaAy2LzPY?si=ZddgKavCXesrwBGg)
9. [React Navigation - Bottom Tab Navigator](https://reactnavigation.org/docs/bottom-tab-navigator/)
10. [React Navigation - Stack Navigator](https://reactnavigation.org/docs/stack-navigator/)
11. [YouTube Tutorial - Recipe App](https://youtu.be/cdnneQjsoT0?si=lpCC9u6fS9J6_M6p)
12. [React Custom Hooks Concept](https://react.dev/learn/reusing-logic-with-custom-hooks)

## Refleksi Pembuatan Aplikasi

Selama mengerjakan aplikasi ResepKita, saya mendapatkan banyak pelajaran mengenai pengembangan aplikasi mobile menggunakan React Native dan Expo.
Saya belajar cara menyusun navigasi yang nyaman bagi pengguna dengan menggabungkan Bottom Tabs untuk menu utama dan Stack Navigator untuk halaman detail. 
Lalu saya memisahkan logika dari tampilan antarmuka menggunakan Custom Hooks seperti useSearch dan useMealDetail. Dengan cara ini, kode menjadi jauh lebih rapi dan mudah dibaca
Saya juga menggunakan Zustand untuk mengelola data favorit, yang kemudian saya hubungkan dengan AsyncStorage agar data tetap tersimpan meski aplikasi ditutup.

Namun, proses pengerjaan ini tidak selalu mulus karena saya menghadapi beberapa masalah.
Saya sempat mengalami kesulitan besar saat mencoba mengurus logika Zustand untuk pertama kalinya agar bisa berjalan sinkron dengan penyimpanan lokal. 
Selain itu, saya juga sempat berencana menggunakan fitur Category Chips (pilihan kategori berbentuk tombol kecil), namun karena implementasi logikanya ternyata cukup rumit dan memakan waktu, akhirnya saya memutuskan untuk tidak jadi menggunakannya agar bisa lebih fokus mematangkan fitur utama lainnya.

Meskipun sempat ada kendala, saya berhasil menyelesaikan berbagai bug. 
Dimulai dari perbaikan layout pesan error pada kolom pencarian agar posisinya lebih presisi, hingga menyelesaikan masalah data bahan-bahan dari API yang awalnya sangat berantakan. 
Saya membuat fungsi logika khusus untuk merapikan data tersebut agar enak dilihat oleh pengguna. 
Dari sisi visual, saya melakukan perombakan tema dari warna merah menjadi hijau elegan, merapikan urutan informasi pada halaman detail, dan memastikan semua komponen memiliki desain yang konsisten. 
Pengalaman ini benar-benar mematangkan pemahaman saya, terutama dalam hal menyelesaikan masalah teknis secara mandiri dan membangun aplikasi yang efisien.