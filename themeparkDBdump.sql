-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: themepark6.mysql.database.azure.com    Database: themeparkdb
-- ------------------------------------------------------
-- Server version	8.0.42-azure

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
-- Table structure for table `accidenthistory`
--

DROP TABLE IF EXISTS `accidenthistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accidenthistory` (
  `AccidentID` bigint NOT NULL AUTO_INCREMENT,
  `AttractionID` bigint DEFAULT NULL,
  `DateOfAccident` date DEFAULT NULL,
  `Severity` enum('Low','Medium','High') DEFAULT NULL,
  `Description` text,
  PRIMARY KEY (`AccidentID`),
  KEY `AttractionID` (`AttractionID`),
  CONSTRAINT `accidenthistory_ibfk_1` FOREIGN KEY (`AttractionID`) REFERENCES `attraction` (`AttractionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accidenthistory`
--

LOCK TABLES `accidenthistory` WRITE;
/*!40000 ALTER TABLE `accidenthistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `accidenthistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area` (
  `AreaID` bigint NOT NULL AUTO_INCREMENT,
  `AreaName` varchar(100) NOT NULL,
  `Theme` varchar(100) DEFAULT NULL,
  `Size` int DEFAULT NULL,
  PRIMARY KEY (`AreaID`),
  UNIQUE KEY `AreaName` (`AreaName`),
  CONSTRAINT `area_chk_1` CHECK ((`Size` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attraction`
--

DROP TABLE IF EXISTS `attraction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attraction` (
  `AttractionID` bigint NOT NULL AUTO_INCREMENT,
  `AttractionName` varchar(100) NOT NULL,
  `AttractionType` enum('Ride','Show','Game') DEFAULT NULL,
  `Location` bigint NOT NULL,
  `Status` enum('Open','Closed','Under Maintenance','Limited Operation') DEFAULT NULL,
  `QueueCount` int DEFAULT NULL,
  PRIMARY KEY (`AttractionID`),
  KEY `Location` (`Location`),
  CONSTRAINT `attraction_ibfk_1` FOREIGN KEY (`Location`) REFERENCES `area` (`AreaID`),
  CONSTRAINT `attraction_chk_1` CHECK ((`QueueCount` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attraction`
--

LOCK TABLES `attraction` WRITE;
/*!40000 ALTER TABLE `attraction` DISABLE KEYS */;
/*!40000 ALTER TABLE `attraction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `EmployeeID` bigint NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Position` varchar(50) DEFAULT NULL,
  `Salary` decimal(10,2) DEFAULT NULL,
  `HireDate` date DEFAULT NULL,
  `ManagerID` bigint DEFAULT NULL,
  `AreaID` bigint DEFAULT NULL,
  PRIMARY KEY (`EmployeeID`),
  KEY `ManagerID` (`ManagerID`),
  KEY `AreaID` (`AreaID`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`ManagerID`) REFERENCES `manager` (`ManagerID`),
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`AreaID`) REFERENCES `area` (`AreaID`),
  CONSTRAINT `employee_chk_1` CHECK ((`Salary` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facility`
--

DROP TABLE IF EXISTS `facility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facility` (
  `FacilityID` bigint NOT NULL AUTO_INCREMENT,
  `FacilityType` enum('Restroom','Guest Services','Locker','Hotel') DEFAULT NULL,
  `Location` bigint DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`FacilityID`),
  KEY `Location` (`Location`),
  CONSTRAINT `facility_ibfk_1` FOREIGN KEY (`Location`) REFERENCES `area` (`AreaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facility`
--

LOCK TABLES `facility` WRITE;
/*!40000 ALTER TABLE `facility` DISABLE KEYS */;
/*!40000 ALTER TABLE `facility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `GameID` bigint NOT NULL,
  `PrizeID` bigint DEFAULT NULL,
  `GameBuildingID` bigint DEFAULT NULL,
  `AreaID` bigint DEFAULT NULL,
  `BuildingCapacity` int DEFAULT NULL,
  PRIMARY KEY (`GameID`),
  KEY `AreaID` (`AreaID`),
  CONSTRAINT `game_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `attraction` (`AttractionID`),
  CONSTRAINT `game_ibfk_2` FOREIGN KEY (`AreaID`) REFERENCES `area` (`AreaID`),
  CONSTRAINT `game_chk_1` CHECK ((`BuildingCapacity` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotel`
--

DROP TABLE IF EXISTS `hotel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotel` (
  `HotelID` bigint NOT NULL,
  `HotelName` varchar(100) DEFAULT NULL,
  `Location` bigint DEFAULT NULL,
  `StarRating` enum('1','2','3','4','5') DEFAULT NULL,
  `TotalRooms` int DEFAULT NULL,
  `ContactNumber` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`HotelID`),
  KEY `Location` (`Location`),
  CONSTRAINT `hotel_ibfk_1` FOREIGN KEY (`HotelID`) REFERENCES `facility` (`FacilityID`),
  CONSTRAINT `hotel_ibfk_2` FOREIGN KEY (`Location`) REFERENCES `area` (`AreaID`),
  CONSTRAINT `hotel_chk_1` CHECK ((`TotalRooms` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotel`
--

LOCK TABLES `hotel` WRITE;
/*!40000 ALTER TABLE `hotel` DISABLE KEYS */;
/*!40000 ALTER TABLE `hotel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maintenance`
--

DROP TABLE IF EXISTS `maintenance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maintenance` (
  `MaintenanceID` bigint NOT NULL AUTO_INCREMENT,
  `AttractionID` bigint DEFAULT NULL,
  `DateStart` date DEFAULT NULL,
  `DateEnd` date DEFAULT NULL,
  `IssueSeverity` enum('Low','Medium','High') DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  `EmployeeID` bigint DEFAULT NULL,
  PRIMARY KEY (`MaintenanceID`),
  KEY `AttractionID` (`AttractionID`),
  KEY `EmployeeID` (`EmployeeID`),
  CONSTRAINT `maintenance_ibfk_1` FOREIGN KEY (`AttractionID`) REFERENCES `attraction` (`AttractionID`),
  CONSTRAINT `maintenance_ibfk_2` FOREIGN KEY (`EmployeeID`) REFERENCES `employee` (`EmployeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maintenance`
--

LOCK TABLES `maintenance` WRITE;
/*!40000 ALTER TABLE `maintenance` DISABLE KEYS */;
/*!40000 ALTER TABLE `maintenance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manager`
--

DROP TABLE IF EXISTS `manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manager` (
  `ManagerID` bigint NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Salary` decimal(10,2) DEFAULT NULL,
  `AreaAssigned` bigint DEFAULT NULL,
  PRIMARY KEY (`ManagerID`),
  UNIQUE KEY `AreaAssigned` (`AreaAssigned`),
  CONSTRAINT `manager_ibfk_1` FOREIGN KEY (`AreaAssigned`) REFERENCES `area` (`AreaID`),
  CONSTRAINT `manager_chk_1` CHECK ((`Salary` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager`
--

LOCK TABLES `manager` WRITE;
/*!40000 ALTER TABLE `manager` DISABLE KEYS */;
/*!40000 ALTER TABLE `manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parking`
--

DROP TABLE IF EXISTS `parking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parking` (
  `LotID` bigint NOT NULL AUTO_INCREMENT,
  `Capacity` int DEFAULT NULL,
  `LocationDescription` varchar(200) DEFAULT NULL,
  `FeePerHour` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`LotID`),
  CONSTRAINT `parking_chk_1` CHECK ((`Capacity` >= 0)),
  CONSTRAINT `parking_chk_2` CHECK ((`FeePerHour` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parking`
--

LOCK TABLES `parking` WRITE;
/*!40000 ALTER TABLE `parking` DISABLE KEYS */;
/*!40000 ALTER TABLE `parking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant` (
  `RestaurantID` bigint NOT NULL AUTO_INCREMENT,
  `RestaurantName` varchar(100) DEFAULT NULL,
  `CuisineType` varchar(100) DEFAULT NULL,
  `Capacity` int DEFAULT NULL,
  `Location` bigint DEFAULT NULL,
  `ManagerID` bigint DEFAULT NULL,
  PRIMARY KEY (`RestaurantID`),
  KEY `Location` (`Location`),
  KEY `ManagerID` (`ManagerID`),
  CONSTRAINT `restaurant_ibfk_1` FOREIGN KEY (`Location`) REFERENCES `area` (`AreaID`),
  CONSTRAINT `restaurant_ibfk_2` FOREIGN KEY (`ManagerID`) REFERENCES `manager` (`ManagerID`),
  CONSTRAINT `restaurant_chk_1` CHECK ((`Capacity` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restocklog`
--

DROP TABLE IF EXISTS `restocklog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restocklog` (
  `ItemID` bigint NOT NULL,
  `Quantity` int DEFAULT NULL,
  `ShopID` bigint DEFAULT NULL,
  `AreaID` bigint DEFAULT NULL,
  `Cost` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ItemID`),
  KEY `AreaID` (`AreaID`),
  CONSTRAINT `restocklog_ibfk_1` FOREIGN KEY (`ItemID`) REFERENCES `shopitem` (`ItemID`),
  CONSTRAINT `restocklog_ibfk_2` FOREIGN KEY (`AreaID`) REFERENCES `area` (`AreaID`),
  CONSTRAINT `restocklog_chk_1` CHECK ((`Quantity` >= 0)),
  CONSTRAINT `restocklog_chk_2` CHECK ((`Cost` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restocklog`
--

LOCK TABLES `restocklog` WRITE;
/*!40000 ALTER TABLE `restocklog` DISABLE KEYS */;
/*!40000 ALTER TABLE `restocklog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `ReviewID` bigint NOT NULL AUTO_INCREMENT,
  `VisitorID` bigint DEFAULT NULL,
  `Feedback` int DEFAULT NULL,
  `Comment` text,
  `DateSubmitted` date DEFAULT NULL,
  PRIMARY KEY (`ReviewID`),
  UNIQUE KEY `VisitorID` (`VisitorID`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`VisitorID`) REFERENCES `visitor` (`VisitorID`),
  CONSTRAINT `review_chk_1` CHECK ((`Feedback` between 1 and 10))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ride`
--

DROP TABLE IF EXISTS `ride`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ride` (
  `RideID` bigint NOT NULL,
  `RideDuration` int DEFAULT NULL,
  `RideLocation` varchar(100) DEFAULT NULL,
  `VehicleCapacity` int DEFAULT NULL,
  PRIMARY KEY (`RideID`),
  CONSTRAINT `ride_ibfk_1` FOREIGN KEY (`RideID`) REFERENCES `attraction` (`AttractionID`),
  CONSTRAINT `ride_chk_1` CHECK ((`RideDuration` >= 0)),
  CONSTRAINT `ride_chk_2` CHECK ((`VehicleCapacity` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ride`
--

LOCK TABLES `ride` WRITE;
/*!40000 ALTER TABLE `ride` DISABLE KEYS */;
/*!40000 ALTER TABLE `ride` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopitem`
--

DROP TABLE IF EXISTS `shopitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopitem` (
  `ItemID` bigint NOT NULL AUTO_INCREMENT,
  `ItemName` varchar(100) DEFAULT NULL,
  `BuyPrice` decimal(10,2) DEFAULT NULL,
  `SellPrice` decimal(10,2) DEFAULT NULL,
  `DiscountPrice` decimal(10,2) DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  `DayBought` date DEFAULT NULL,
  `ShopLocation` bigint DEFAULT NULL,
  PRIMARY KEY (`ItemID`),
  KEY `ShopLocation` (`ShopLocation`),
  CONSTRAINT `shopitem_ibfk_1` FOREIGN KEY (`ShopLocation`) REFERENCES `area` (`AreaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopitem`
--

LOCK TABLES `shopitem` WRITE;
/*!40000 ALTER TABLE `shopitem` DISABLE KEYS */;
/*!40000 ALTER TABLE `shopitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `showattraction`
--

DROP TABLE IF EXISTS `showattraction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `showattraction` (
  `ShowID` bigint NOT NULL,
  `ShowTimes` varchar(200) DEFAULT NULL,
  `ShowLocation` varchar(100) DEFAULT NULL,
  `SeatingCapacity` int DEFAULT NULL,
  PRIMARY KEY (`ShowID`),
  CONSTRAINT `showattraction_ibfk_1` FOREIGN KEY (`ShowID`) REFERENCES `attraction` (`AttractionID`),
  CONSTRAINT `showattraction_chk_1` CHECK ((`SeatingCapacity` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `showattraction`
--

LOCK TABLES `showattraction` WRITE;
/*!40000 ALTER TABLE `showattraction` DISABLE KEYS */;
/*!40000 ALTER TABLE `showattraction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `TicketNumber` bigint NOT NULL AUTO_INCREMENT,
  `TicketType` enum('General','VIP','Membership') DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `VIPID` bigint DEFAULT NULL,
  `MembershipID` bigint DEFAULT NULL,
  `IssueDate` date DEFAULT NULL,
  `ExpiryDate` date DEFAULT NULL,
  `VisitorID` bigint DEFAULT NULL,
  PRIMARY KEY (`TicketNumber`),
  KEY `VisitorID` (`VisitorID`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`VisitorID`) REFERENCES `visitor` (`VisitorID`),
  CONSTRAINT `ticket_chk_1` CHECK ((`Price` >= 0)),
  CONSTRAINT `ticket_chk_2` CHECK ((`IssueDate` < `ExpiryDate`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor`
--

DROP TABLE IF EXISTS `visitor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visitor` (
  `VisitorID` bigint NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`VisitorID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor`
--

LOCK TABLES `visitor` WRITE;
/*!40000 ALTER TABLE `visitor` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weather`
--

DROP TABLE IF EXISTS `weather`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weather` (
  `WeatherID` bigint NOT NULL AUTO_INCREMENT,
  `WeatherDate` date DEFAULT NULL,
  `HighTemp` int DEFAULT NULL,
  `LowTemp` int DEFAULT NULL,
  `SeverityLevel` enum('Low','Medium','High') DEFAULT NULL,
  `AttractionOperationStatus` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`WeatherID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weather`
--

LOCK TABLES `weather` WRITE;
/*!40000 ALTER TABLE `weather` DISABLE KEYS */;
/*!40000 ALTER TABLE `weather` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-05  0:54:47
