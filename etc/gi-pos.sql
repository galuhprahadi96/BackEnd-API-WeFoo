-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 07 Sep 2020 pada 13.50
-- Versi server: 10.4.11-MariaDB
-- Versi PHP: 7.4.2

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
  `category_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `category_update_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `category_created_at`, `category_update_at`) VALUES
(1, 'Food', '2020-08-12 11:22:55', '0000-00-00 00:00:00'),
(3, 'Drink', '2020-09-06 13:22:35', '2020-09-06 13:22:35');

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
--

CREATE TABLE `history` (
  `history_id` int(11) NOT NULL,
  `invoice` int(11) NOT NULL,
  `subtotal` int(11) NOT NULL DEFAULT 0,
  `history_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `history`
--

INSERT INTO `history` (`history_id`, `invoice`, `subtotal`, `history_created_at`) VALUES
(100, 144218, 71500, '2020-09-06 13:26:39');

-- --------------------------------------------------------

--
-- Struktur dari tabel `order_product`
--

CREATE TABLE `order_product` (
  `order_id` int(11) NOT NULL,
  `history_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `order_qty` int(11) NOT NULL,
  `order_total` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `order_product`
--

INSERT INTO `order_product` (`order_id`, `history_id`, `product_id`, `order_qty`, `order_total`) VALUES
(76, 100, 30, 2, 60000),
(77, 100, 27, 1, 5000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `product_update_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`product_id`, `id_category`, `product_name`, `product_image`, `product_price`, `product_created_at`, `product_update_at`, `status`) VALUES
(25, 3, 'Espresso', '2020-09-06T13-10-00.488Z-espresso.png', 10000, '2020-09-06 13:10:00', '0000-00-00 00:00:00', 1),
(26, 3, 'Coffe Latte', '2020-09-06T13-11-00.035Z-coffelatte.png', 15000, '2020-09-06 13:11:00', '0000-00-00 00:00:00', 1),
(27, 3, 'Cappucino', '2020-09-06T13-12-00.320Z-cappucino.png', 5000, '2020-09-06 13:12:00', '0000-00-00 00:00:00', 1),
(28, 3, 'Red Velvet Latte', '2020-09-06T13-13-12.221Z-redvelvet.png', 33000, '2020-09-06 13:13:12', '0000-00-00 00:00:00', 1),
(29, 1, 'Choco Rhum', '2020-09-06T13-14-59.959Z-chocorum.png', 28000, '2020-09-06 13:15:00', '0000-00-00 00:00:00', 1),
(30, 1, 'Black Forest', '2020-09-06T13-15-46.411Z-blackforest.png', 30000, '2020-09-06 13:15:46', '0000-00-00 00:00:00', 1),
(31, 1, 'Chicken Katsu Dabu-dabu', '2020-09-06T13-16-37.001Z-chickenkatsu.png', 60000, '2020-09-06 13:16:37', '0000-00-00 00:00:00', 1),
(32, 1, 'Salmon Truffle Teriyaki', '2020-09-06T13-17-06.776Z-salmon.png', 10000, '2020-09-06 13:17:06', '0000-00-00 00:00:00', 1),
(33, 1, 'Wiener Schnitzel', '2020-09-06T13-18-01.483Z-wiener.png', 69000, '2020-09-06 13:18:01', '0000-00-00 00:00:00', 1);

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
  `user_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_password`, `user_role`, `user_status`, `user_created_at`, `user_updated_at`) VALUES
(3, 'admin', 'admin@gmail.com', '$2b$10$CDCS.xKBGT30B2MDNUFLBeMRy86hKF4m/7MzKcE54uGImjbnzmS3u', 1, 1, '2020-09-04 14:59:23', '0000-00-00 00:00:00'),
(4, 'user', 'user@gmail.com', '$2b$10$Jg1HzWQSe9oQ81iETDoZHOtHR0JqYpyQM0.prHGMBT5cp8pu1.Hq.', 2, 1, '2020-09-07 11:48:52', '2020-09-06 13:40:20');

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
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT untuk tabel `order_product`
--
ALTER TABLE `order_product`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
