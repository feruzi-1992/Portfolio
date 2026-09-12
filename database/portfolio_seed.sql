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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-12 23:47:15
