-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 02 Sep 2020 pada 20.39
-- Versi server: 10.1.38-MariaDB
-- Versi PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gi-pos`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL,
  `category_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `category_update_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `category_created_at`, `category_update_at`) VALUES
(1, 'Food', '2020-08-12 11:22:55', '0000-00-00 00:00:00'),
(3, 'Drinks', '2020-08-29 03:30:09', '2020-08-29 03:30:08');

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
--

CREATE TABLE `history` (
  `history_id` int(11) NOT NULL,
  `invoice` int(11) NOT NULL,
  `subtotal` int(11) NOT NULL DEFAULT '0',
  `history_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `history`
--

INSERT INTO `history` (`history_id`, `invoice`, `subtotal`, `history_created_at`) VALUES
(91, 220646, 107800, '2020-08-25 17:00:00'),
(92, 100532, 5500, '2020-08-21 02:09:18'),
(93, 536661, 165000, '2020-08-31 02:49:04'),
(94, 818722, 9900, '2020-08-31 05:01:18'),
(95, 427143, 165000, '2020-08-31 06:11:37'),
(96, 622448, 13200, '2020-08-31 06:27:53'),
(97, 648100, 66000, '2020-08-31 06:33:51');

-- --------------------------------------------------------

--
-- Struktur dari tabel `order_product`
--

CREATE TABLE `order_product` (
  `order_id` int(11) NOT NULL,
  `history_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `order_qty` int(11) NOT NULL,
  `order_total` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `order_product`
--

INSERT INTO `order_product` (`order_id`, `history_id`, `product_id`, `order_qty`, `order_total`) VALUES
(59, 91, 10, 1, 60000),
(60, 91, 7, 1, 33000),
(61, 91, 6, 1, 5000),
(62, 92, 6, 1, 5000),
(63, 93, 10, 2, 120000),
(64, 93, 9, 1, 30000),
(65, 94, 15, 2, 4000),
(66, 94, 6, 1, 5000),
(67, 95, 9, 1, 30000),
(68, 95, 10, 2, 120000),
(69, 96, 16, 2, 10000),
(70, 96, 15, 1, 2000),
(71, 97, 10, 1, 60000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_image` varchar(100) NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `product_update_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`product_id`, `id_category`, `product_name`, `product_image`, `product_price`, `product_created_at`, `product_update_at`, `status`) VALUES
(1, 3, 'Espresso', 'espresso.png', 10000, '2020-08-28 04:33:02', '2020-08-15 13:45:27', 1),
(3, 3, 'Coffe Latte', 'coffe_latte.png', 15000, '2020-08-28 04:33:36', '2020-08-28 04:31:14', 0),
(6, 3, 'Cappucino', 'cappucino.png', 5000, '2020-08-28 04:49:15', '2020-08-28 04:49:15', 1),
(7, 1, 'Red Velvet Latte', 'velvet.png', 33000, '2020-08-23 12:00:26', '0000-00-00 00:00:00', 1),
(10, 1, 'Chicken Katsu Dabu-dabu', 'chicken_katsu.png', 60000, '2020-08-28 04:47:25', '2020-08-28 04:34:29', 1),
(11, 11, 'Choco Rhum', 'rum.png', 28000, '2020-09-02 07:16:58', '2020-09-02 07:16:58', 0),
(12, 1, 'Wiener Schnitzel', 'wiener_schnitzel.png', 69000, '2020-08-28 04:49:28', '2020-08-28 04:49:28', 1),
(15, 1, 'Pisang Goreng', 'pisanggoreng', 2000, '2020-08-31 04:02:47', '0000-00-00 00:00:00', 1),
(16, 1, 'Mineral water', 'mineral', 5000, '2020-08-31 05:06:38', '0000-00-00 00:00:00', 1),
(17, 3, 'choco vanilla', 'terserah', 10000, '2020-08-31 06:30:06', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(150) NOT NULL,
  `user_email` varchar(150) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_role` int(1) NOT NULL,
  `user_status` int(1) NOT NULL,
  `user_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_password`, `user_role`, `user_status`, `user_created_at`, `user_updated_at`) VALUES
(1, 'galuh', 'galuh@gmail.com', '$2b$10$Q7Ow56Pab3hrjKDOFE4f4OdBl.dYrURtaeSlTwrrXinBMGoO9JWaq', 1, 1, '2020-09-02 06:39:23', '0000-00-00 00:00:00'),
(2, 'galuh', 'galuh1@gmail.com', '$2b$10$H2XunV24jElLPpKy..4FKeoEJ3USz68Nd.LixKbZTeDyi5TqJpEnW', 1, 1, '2020-09-02 06:42:31', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indeks untuk tabel `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_id`);

--
-- Indeks untuk tabel `order_product`
--
ALTER TABLE `order_product`
  ADD PRIMARY KEY (`order_id`);

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT untuk tabel `order_product`
--
ALTER TABLE `order_product`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
