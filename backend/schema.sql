CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` varchar(64) NOT NULL UNIQUE,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `expires_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `attacks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) DEFAULT NULL,
  `severity` varchar(50) DEFAULT NULL,
  `ip` varchar(45) DEFAULT NULL,
  `timestamp` varchar(100) DEFAULT NULL,
  `confidence` decimal(5,2) DEFAULT NULL,
  `explanation` text,
  `status` varchar(50) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX (`severity`),
  INDEX (`status`),
  INDEX (`ip`),
  INDEX (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `attack_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `attack_id` int(11) NOT NULL,
  `log_text` text NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`attack_id`) REFERENCES `attacks`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `attack_timelines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `attack_id` int(11) NOT NULL,
  `timestamp` varchar(100) DEFAULT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`attack_id`) REFERENCES `attacks`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
