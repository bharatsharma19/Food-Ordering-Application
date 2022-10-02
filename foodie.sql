-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: foodie
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adminlogin`
--

DROP TABLE IF EXISTS `adminlogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adminlogin` (
  `adminid` int NOT NULL AUTO_INCREMENT,
  `adminname` varchar(64) NOT NULL,
  `adminemail` varchar(64) NOT NULL,
  `admincontact` varchar(45) NOT NULL,
  `adminpassword` varchar(45) NOT NULL,
  PRIMARY KEY (`adminid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminlogin`
--

LOCK TABLES `adminlogin` WRITE;
/*!40000 ALTER TABLE `adminlogin` DISABLE KEYS */;
INSERT INTO `adminlogin` VALUES (1,'Bharat Sharma','1@gmail.com','7000192752','123'),(2,'Vivek Sharma','2@gmail.com','123456789','1');
/*!40000 ALTER TABLE `adminlogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foodcategory`
--

DROP TABLE IF EXISTS `foodcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foodcategory` (
  `foodcategoryid` int NOT NULL AUTO_INCREMENT,
  `foodcategoryname` varchar(45) NOT NULL,
  PRIMARY KEY (`foodcategoryid`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foodcategory`
--

LOCK TABLES `foodcategory` WRITE;
/*!40000 ALTER TABLE `foodcategory` DISABLE KEYS */;
INSERT INTO `foodcategory` VALUES (1,'North Indian'),(15,'South Indian');
/*!40000 ALTER TABLE `foodcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fooditems`
--

DROP TABLE IF EXISTS `fooditems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fooditems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `foodcategoryid` varchar(45) NOT NULL,
  `foodsubcategoryid` varchar(45) NOT NULL,
  `price` varchar(45) NOT NULL,
  `offerprice` varchar(45) NOT NULL,
  `rating` decimal(2,1) NOT NULL,
  `picture` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fooditems`
--

LOCK TABLES `fooditems` WRITE;
/*!40000 ALTER TABLE `fooditems` DISABLE KEYS */;
INSERT INTO `fooditems` VALUES (21,'Special Shahi Paneer','1','1','2','199','149',4.7,'cfa09280-ef1b-4b5d-bb05-18ae42b2a946.jpg'),(23,'Masala Dosa','1','15','34','149','99',4.9,'ec2e200b-4fc2-4d6f-a086-4f376e16cabe.jpg'),(24,'Chicken Dosa','2','15','34','199','179',3.2,NULL),(25,'Lachcha Parantha','1','1','5','49','35',4.1,NULL);
/*!40000 ALTER TABLE `fooditems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foodsubcategory`
--

DROP TABLE IF EXISTS `foodsubcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foodsubcategory` (
  `foodsubcategoryid` int NOT NULL AUTO_INCREMENT,
  `foodcategoryid` int NOT NULL,
  `foodsubcategoryname` varchar(45) NOT NULL,
  PRIMARY KEY (`foodsubcategoryid`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foodsubcategory`
--

LOCK TABLES `foodsubcategory` WRITE;
/*!40000 ALTER TABLE `foodsubcategory` DISABLE KEYS */;
INSERT INTO `foodsubcategory` VALUES (2,1,'Shahi Paneer'),(3,1,'Tandoori Roti'),(4,1,'Naan'),(5,1,'Lachcha Paratha'),(33,1,'Special'),(34,15,'Dosa');
/*!40000 ALTER TABLE `foodsubcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sell`
--

DROP TABLE IF EXISTS `sell`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sell` (
  `sellid` int NOT NULL,
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `offerprice` varchar(45) NOT NULL,
  PRIMARY KEY (`sellid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sell`
--

LOCK TABLES `sell` WRITE;
/*!40000 ALTER TABLE `sell` DISABLE KEYS */;
/*!40000 ALTER TABLE `sell` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `type` varchar(63) NOT NULL,
  `foodid` varchar(45) NOT NULL,
  PRIMARY KEY (`foodid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES ('Veg','1'),('Non-Veg','2');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userlogin`
--

DROP TABLE IF EXISTS `userlogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userlogin` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `useremail` varchar(45) NOT NULL,
  `usercontact` varchar(45) NOT NULL,
  `useraddress` varchar(128) NOT NULL,
  `userpincode` varchar(6) NOT NULL,
  `userpassword` varchar(45) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userlogin`
--

LOCK TABLES `userlogin` WRITE;
/*!40000 ALTER TABLE `userlogin` DISABLE KEYS */;
INSERT INTO `userlogin` VALUES (5,'Vivek Sharma','12@gmail.com','7999812406','Gayatri Vihar, Pinto Park','474020','12');
/*!40000 ALTER TABLE `userlogin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-02 15:45:08
