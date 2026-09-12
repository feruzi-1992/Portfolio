-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for osx10.10 (x86_64)
--
-- Host: localhost    Database: portfolio
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `portfolio`
--

/*!40000 DROP DATABASE IF EXISTS `portfolio`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `portfolio` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `portfolio`;

--
-- Table structure for table `admin_sessions`
--

DROP TABLE IF EXISTS `admin_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_sessions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int(10) unsigned NOT NULL,
  `token` char(64) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `fk_admin_sessions_user` (`admin_id`),
  CONSTRAINT `fk_admin_sessions_user` FOREIGN KEY (`admin_id`) REFERENCES `admin_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_sessions`
--

LOCK TABLES `admin_sessions` WRITE;
/*!40000 ALTER TABLE `admin_sessions` DISABLE KEYS */;
INSERT INTO `admin_sessions` (`id`, `admin_id`, `token`, `expires_at`, `created_at`) VALUES (1,1,'40710fb561a411a69e15e7388d696032dd39d204cb2d144d7f54881ee1b1691a','2026-09-19 17:10:52','2026-09-12 15:10:52'),(2,1,'c4eca4b387d41be1b7e5c335ca7ea7141c0f660218cb2c2438335dcc8e7c77b6','2026-09-19 17:13:07','2026-09-12 15:13:07');
/*!40000 ALTER TABLE `admin_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(80) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` (`id`, `username`, `password_hash`, `created_at`) VALUES (1,'admin','$2y$10$4qdaZGIyEL7AsnKwMEr4GuVQyyCATf3rVGLfrIpM6pLV.jcilIwKC','2026-09-12 15:07:20');
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_messages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `email` varchar(190) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `message` text NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
INSERT INTO `contact_messages` (`id`, `name`, `email`, `subject`, `message`, `ip_address`, `created_at`) VALUES (1,'Test User','test@example.com','Local hosting check','Habari, testing portfolio database.','127.0.0.1','2026-09-12 14:22:01'),(2,'d','engineerferuzi@gmail.com','efefefe','fff','127.0.0.1','2026-09-12 14:23:11'),(3,'dsfsfds','engineerferuzi@gmail.com','fdf','sdw','127.0.0.1','2026-09-12 14:23:28'),(4,'jscchckdckd','engineerferuzi@gmail.com','fff','feffeff','127.0.0.1','2026-09-12 14:57:15'),(5,'d','engineerferuzi@gmail.com','ddd','ddddddd','127.0.0.1','2026-09-12 15:29:11'),(6,'d','engineerferuzi@gmail.com','ffff','ffeeee','127.0.0.1','2026-09-12 15:33:52');
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_settings`
--

DROP TABLE IF EXISTS `site_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `site_settings` (
  `setting_key` varchar(100) NOT NULL,
  `setting_value` text NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_settings`
--

LOCK TABLES `site_settings` WRITE;
/*!40000 ALTER TABLE `site_settings` DISABLE KEYS */;
INSERT INTO `site_settings` (`setting_key`, `setting_value`, `updated_at`) VALUES ('chatbot_cta_enabled','1','2026-09-12 15:07:20'),('demo_promo_enabled','1','2026-09-12 15:26:29'),('demo_url','https://primosoft.co.tz/register','2026-09-12 15:26:29'),('help_rail_enabled','1','2026-09-12 15:26:29'),('home_content','{\"eyebrow\":\"Portfolio · Mohammed Feruzi\",\"headline\":\"Building Digital Experiences That Solve Real Problems.\",\"subtitle\":\"I am Mohammed Feruzi, a full-stack software developer specializing in modern web applications, business systems, APIs, and scalable software solutions for organizations and businesses.\",\"ctaPrimary\":\"View My Work\",\"ctaSecondary\":\"Let\'s Work Together\",\"exploreLabel\":\"Explore\",\"imageAlt\":\"Mohammed Feruzi — Software Developer\",\"portraitUrl\":\"\",\"trustIndicators\":[\"WhatsApp AI Chatbot\",\"Software Development\",\"SaaS Architecture\",\"Business Systems\",\"API Development\"]}','2026-09-12 16:06:06'),('page_about_enabled','1','2026-09-12 15:44:48'),('page_contact_enabled','1','2026-09-12 15:44:48'),('page_experience_enabled','1','2026-09-12 15:44:48'),('page_home_enabled','1','2026-09-12 15:44:48'),('page_process_enabled','1','2026-09-12 15:44:48'),('page_projects_enabled','1','2026-09-12 15:44:48'),('page_services_enabled','1','2026-09-12 15:44:48'),('page_skills_enabled','1','2026-09-12 15:44:48'),('site_title','Portfolio · Mohammed Feruzi','2026-09-12 15:07:20'),('whatsapp_float_enabled','1','2026-09-12 15:07:20'),('whatsapp_message','Habari Developer Feruzi, ninahitaji WhatsApp AI Chatbot / software help.','2026-09-12 15:07:20'),('whatsapp_number','255658489683','2026-09-12 15:30:52');
/*!40000 ALTER TABLE `site_settings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-12 23:56:57
