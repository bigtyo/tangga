-- MySQL dump 10.13  Distrib 5.5.32, for Win32 (x86)
--
-- Host: localhost    Database: tangga
-- ------------------------------------------------------
-- Server version	5.5.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `achievement`
--

DROP TABLE IF EXISTS `achievement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `achievement` (
  `ACHIEVEMENT_ID` varchar(100) NOT NULL,
  `GAMEID` bigint(20) DEFAULT NULL,
  `ACHIEVEMENT_NAME` varchar(1024) DEFAULT NULL,
  `CONDITIONAL_DESCRIPTION` varchar(2000) DEFAULT NULL,
  `DESCRIPTION` varchar(2000) DEFAULT NULL,
  `POINT` bigint(20) DEFAULT NULL,
  `BADGE` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ACHIEVEMENT_ID`),
  KEY `FK_RELATIONSHIP_4` (`GAMEID`),
  CONSTRAINT `FK_RELATIONSHIP_4` FOREIGN KEY (`GAMEID`) REFERENCES `game` (`GAMEID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `achievement`
--

LOCK TABLES `achievement` WRITE;
/*!40000 ALTER TABLE `achievement` DISABLE KEYS */;
/*!40000 ALTER TABLE `achievement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api`
--

DROP TABLE IF EXISTS `api`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api` (
  `APIID` bigint(20) NOT NULL AUTO_INCREMENT,
  `API_NAME` varchar(200) DEFAULT NULL,
  `DESCRIPTION` varchar(2000) DEFAULT NULL,
  `METHOD` varchar(45) DEFAULT NULL,
  `PROTOCOL` varchar(45) DEFAULT NULL,
  `RETURN` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`APIID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api`
--

LOCK TABLES `api` WRITE;
/*!40000 ALTER TABLE `api` DISABLE KEYS */;
INSERT INTO `api` VALUES (1,'/score/getmyscore','get player score by his token','get','https','score object');
/*!40000 ALTER TABLE `api` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_param`
--

DROP TABLE IF EXISTS `api_param`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_param` (
  `PARAMID` bigint(20) NOT NULL AUTO_INCREMENT,
  `APIID` bigint(20) DEFAULT NULL,
  `PARAM_NAME` varchar(200) DEFAULT NULL,
  `PARAM_TYPE` varchar(200) DEFAULT NULL,
  `DESCRIPTION` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`PARAMID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_param`
--

LOCK TABLES `api_param` WRITE;
/*!40000 ALTER TABLE `api_param` DISABLE KEYS */;
INSERT INTO `api_param` VALUES (1,1,'player_token','varchar','player token auto generated when player logged in');
/*!40000 ALTER TABLE `api_param` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `developer`
--

DROP TABLE IF EXISTS `developer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `developer` (
  `DEVELOPER_NAME` varchar(1024) DEFAULT NULL,
  `DEVELOPER_EMAIL` varchar(1024) DEFAULT NULL,
  `DEVELOPER_STORE_ID` varchar(1024) DEFAULT NULL,
  `DEVELOPER_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `PASSWORD` varchar(200) NOT NULL,
  `TOKEN` varchar(200) NOT NULL,
  `WAKTUUPDATE` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`DEVELOPER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `developer`
--

LOCK TABLES `developer` WRITE;
/*!40000 ALTER TABLE `developer` DISABLE KEYS */;
INSERT INTO `developer` VALUES ('Maleo Works','maleo@gmail.com','zxx23e122dsaadasd',1,'','',NULL);
/*!40000 ALTER TABLE `developer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game` (
  `GAMEID` bigint(20) NOT NULL AUTO_INCREMENT,
  `DEVELOPER_ID` bigint(20) DEFAULT NULL,
  `GAME_TOKEN` varchar(1024) DEFAULT NULL,
  `DEV_ID` bigint(20) DEFAULT NULL,
  `GAME_NAME` varchar(1024) DEFAULT NULL,
  `GENRE` int(11) DEFAULT NULL,
  `DESCRIPTION` varchar(2000) DEFAULT NULL,
  `ICON` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`GAMEID`),
  KEY `FK_RELATIONSHIP_1` (`DEVELOPER_ID`),
  CONSTRAINT `FK_RELATIONSHIP_1` FOREIGN KEY (`DEVELOPER_ID`) REFERENCES `developer` (`DEVELOPER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,1,'cascascas',0,'Jump Jump',1,NULL,NULL),(2,1,'asdfsdadg3243dfsaf',1,'Fying Jelly',0,'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',NULL),(3,1,'sdfdsgsgdfdg3242drs',1,'Run The night',0,'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',NULL);
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `score`
--

DROP TABLE IF EXISTS `score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `score` (
  `SCORE_ID` varchar(200) NOT NULL,
  `GAMEID` bigint(20) DEFAULT NULL,
  `USER_ID` varchar(200) DEFAULT NULL,
  `SCORE` decimal(16,2) DEFAULT NULL,
  PRIMARY KEY (`SCORE_ID`),
  KEY `FK_RELATIONSHIP_2` (`GAMEID`),
  KEY `FK_RELATIONSHIP_3` (`USER_ID`),
  CONSTRAINT `FK_RELATIONSHIP_2` FOREIGN KEY (`GAMEID`) REFERENCES `game` (`GAMEID`),
  CONSTRAINT `FK_RELATIONSHIP_3` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `score`
--

LOCK TABLES `score` WRITE;
/*!40000 ALTER TABLE `score` DISABLE KEYS */;
INSERT INTO `score` VALUES ('0',2,'bigtyo2',0.00),('1',2,'bigtyo',10000.00);
/*!40000 ALTER TABLE `score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `USER_ID` varchar(200) NOT NULL,
  `PASSWORD` varchar(200) DEFAULT NULL,
  `WAKTUUPDATE` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `EMAIL` varchar(200) NOT NULL,
  `TOKEN` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('bigtyo','aaaa','2014-06-18 08:34:33','mochammad.raditya@gmail.com','asdasdasd'),('bigtyo2','bbbbb','2014-06-02 09:00:21','mochammad.raditya2@gmail.com','bbbbb');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_achievement`
--

DROP TABLE IF EXISTS `user_achievement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_achievement` (
  `USER_ID` varchar(200) DEFAULT NULL,
  `ACHIEVEMENT_ID` varchar(100) DEFAULT NULL,
  `ACHIEVED_TIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `FK_RELATIONSHIP_5` (`USER_ID`),
  KEY `FK_RELATIONSHIP_6` (`ACHIEVEMENT_ID`),
  CONSTRAINT `FK_RELATIONSHIP_5` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`),
  CONSTRAINT `FK_RELATIONSHIP_6` FOREIGN KEY (`ACHIEVEMENT_ID`) REFERENCES `achievement` (`ACHIEVEMENT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_achievement`
--

LOCK TABLES `user_achievement` WRITE;
/*!40000 ALTER TABLE `user_achievement` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_achievement` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-06-26 20:21:41
