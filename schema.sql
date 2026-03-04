DROP DATABASE IF EXISTS ThemeParkDB;
CREATE DATABASE ThemeParkDB;
USE ThemeParkDB;
-- ---------- AREA ----------
CREATE TABLE Area (
 AreaID BIGINT AUTO_INCREMENT PRIMARY KEY,
 AreaName VARCHAR(100) NOT NULL UNIQUE,
 Theme VARCHAR(100) NOT NULL,
 Size DECIMAL(10,2) NOT NULL CHECK (Size >= 0)
) ENGINE=InnoDB;
-- ---------- VISITOR ----------
CREATE TABLE Visitor (
 VisitorID BIGINT AUTO_INCREMENT PRIMARY KEY,
 Name VARCHAR(120) NOT NULL,
 Phone VARCHAR(30),
 Email VARCHAR(120) UNIQUE
) ENGINE=InnoDB;
-- ---------- EMPLOYEE ----------
CREATE TABLE Employee (
 EmployeeID BIGINT AUTO_INCREMENT PRIMARY KEY,
 Name VARCHAR(120) NOT NULL,
 Position VARCHAR(80) NOT NULL,
 Salary DECIMAL(12,2) NOT NULL CHECK (Salary >= 0),
 HireDate DATE NOT NULL,
 AreaID BIGINT NOT NULL,
 ManagerID BIGINT NULL,
 CONSTRAINT fk_employee_area FOREIGN KEY (AreaID) REFERENCES Area(AreaID)
) ENGINE=InnoDB;
-- ---------- MANAGER (subtype of Employee) ----------
CREATE TABLE Manager (
 ManagerID BIGINT PRIMARY KEY,
 Phone VARCHAR(30),
 Email VARCHAR(120) UNIQUE,
 AreaAssigned BIGINT NOT NULL UNIQUE,
 CONSTRAINT fk_manager_employee FOREIGN KEY (ManagerID) REFERENCES 
Employee(EmployeeID) ON DELETE CASCADE,
 CONSTRAINT fk_manager_area FOREIGN KEY (AreaAssigned) REFERENCES Area(AreaID)
) ENGINE=InnoDB;
ALTER TABLE Employee
 ADD CONSTRAINT fk_employee_manager FOREIGN KEY (ManagerID) REFERENCES 
Manager(ManagerID);
-- ---------- ATTRACTION (supertype) ----------
CREATE TABLE Attraction (
 AttractionID BIGINT AUTO_INCREMENT PRIMARY KEY,
 AttractionName VARCHAR(120) NOT NULL,
 AttractionType ENUM('Ride','Show','Game') NOT NULL,
 AreaID BIGINT NOT NULL,
 Status ENUM('Open','Closed','Under Maintenance','Limited Operation') NOT NULL DEFAULT 
'Open',
 QueueCount INT NOT NULL DEFAULT 0 CHECK (QueueCount >= 0),
 MaxQueueCapacity INT NOT NULL DEFAULT 0 CHECK (MaxQueueCapacity >= 0),
 CONSTRAINT fk_attraction_area FOREIGN KEY (AreaID) REFERENCES Area(AreaID)
) ENGINE=InnoDB;
-- ---------- RIDE (subtype) ----------
CREATE TABLE Ride (
 RideID BIGINT PRIMARY KEY,
 RideDurationMin INT NOT NULL CHECK (RideDurationMin > 0),
 VehicleCapacity INT NOT NULL CHECK (VehicleCapacity > 0),
 CONSTRAINT fk_ride_attraction FOREIGN KEY (RideID) REFERENCES Attraction(AttractionID) ON 
DELETE CASCADE
) ENGINE=InnoDB;
-- ---------- SHOW (subtype) ----------
CREATE TABLE `Show` (
 ShowID BIGINT PRIMARY KEY,
 SeatingCapacity INT NOT NULL CHECK (SeatingCapacity > 0),
 CONSTRAINT fk_show_attraction FOREIGN KEY (ShowID) REFERENCES Attraction(AttractionID) 
ON DELETE CASCADE
) ENGINE=InnoDB;
CREATE TABLE ShowTime (
 ShowID BIGINT NOT NULL,
 StartTime DATETIME NOT NULL,
 PRIMARY KEY (ShowID, StartTime),
 CONSTRAINT fk_showtime_show FOREIGN KEY (ShowID) REFERENCES `Show`(ShowID) ON 
DELETE CASCADE
) ENGINE=InnoDB;
-- ---------- GAME (subtype) ----------
CREATE TABLE Game (
 GameID BIGINT PRIMARY KEY,
 GameType ENUM('Skill-based','Arcade','Prize','Interactive') NOT NULL,
 PlayDurationMin INT NOT NULL CHECK (PlayDurationMin > 0),
 MaxPlayers INT NOT NULL CHECK (MaxPlayers >= 1),
 BuildingCapacity INT NOT NULL CHECK (BuildingCapacity >= 0),
 CONSTRAINT fk_game_attraction FOREIGN KEY (GameID) REFERENCES Attraction(AttractionID) 
ON DELETE CASCADE
) ENGINE=InnoDB;
-- ---------- RESTAURANT ----------
CREATE TABLE Restaurant (
 RestaurantID BIGINT AUTO_INCREMENT PRIMARY KEY,
 RestaurantName VARCHAR(120) NOT NULL,
 CuisineType VARCHAR(80) NOT NULL,
 Capacity INT NOT NULL CHECK (Capacity >= 0),
 AreaID BIGINT NOT NULL,
 ManagerID BIGINT NULL,
 CONSTRAINT fk_restaurant_area FOREIGN KEY (AreaID) REFERENCES Area(AreaID),
 CONSTRAINT fk_restaurant_manager FOREIGN KEY (ManagerID) REFERENCES 
Manager(ManagerID)
) ENGINE=InnoDB;
-- ---------- VENDOR ----------
CREATE TABLE Vendor (
 VendorID BIGINT AUTO_INCREMENT PRIMARY KEY,
 VendorName VARCHAR(140) NOT NULL UNIQUE,
 Phone VARCHAR(30),
 Email VARCHAR(120)
) ENGINE=InnoDB;
-- ---------- ITEM (master) ----------
CREATE TABLE Item (
 ItemID BIGINT AUTO_INCREMENT PRIMARY KEY,
 ItemName VARCHAR(140) NOT NULL,
 VendorID BIGINT NULL,
 DefaultBuyPrice DECIMAL(10,2) NOT NULL CHECK (DefaultBuyPrice >= 0),
 CONSTRAINT fk_item_vendor FOREIGN KEY (VendorID) REFERENCES Vendor(VendorID)
) ENGINE=InnoDB;
-- ---------- SHOP ----------
CREATE TABLE Shop (
 ShopID BIGINT AUTO_INCREMENT PRIMARY KEY,
 ShopName VARCHAR(120) NOT NULL,
 AreaID BIGINT NOT NULL,
 ManagerID BIGINT NULL,
 Status ENUM('Open','Closed') NOT NULL DEFAULT 'Open',
 CONSTRAINT fk_shop_area FOREIGN KEY (AreaID) REFERENCES Area(AreaID),
 CONSTRAINT fk_shop_manager FOREIGN KEY (ManagerID) REFERENCES Manager(ManagerID)
) ENGINE=InnoDB;
-- ---------- SHOP INVENTORY (per shop) ----------
CREATE TABLE ShopInventory (
 ShopID BIGINT NOT NULL,
 ItemID BIGINT NOT NULL,
 Quantity INT NOT NULL DEFAULT 0 CHECK (Quantity >= 0),
 SellPrice DECIMAL(10,2) NOT NULL CHECK (SellPrice >= 0),
 DiscountPrice DECIMAL(10,2) NULL CHECK (DiscountPrice >= 0),
 RestockThreshold INT NOT NULL DEFAULT 0 CHECK (RestockThreshold >= 0),
 PRIMARY KEY (ShopID, ItemID),
 CONSTRAINT fk_inv_shop FOREIGN KEY (ShopID) REFERENCES Shop(ShopID) ON DELETE 
CASCADE,
 CONSTRAINT fk_inv_item FOREIGN KEY (ItemID) REFERENCES Item(ItemID),
 CHECK (DiscountPrice IS NULL OR DiscountPrice <= SellPrice)
) ENGINE=InnoDB;
-- ---------- RESTOCK LOG ----------
CREATE TABLE RestockLog (
 RestockID BIGINT AUTO_INCREMENT PRIMARY KEY,
 ShopID BIGINT NOT NULL,
 ItemID BIGINT NOT NULL,
 Quantity INT NOT NULL CHECK (Quantity > 0),
 Cost DECIMAL(12,2) NOT NULL CHECK (Cost >= 0),
 RestockDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT fk_restock_shop FOREIGN KEY (ShopID) REFERENCES Shop(ShopID),
 CONSTRAINT fk_restock_item FOREIGN KEY (ItemID) REFERENCES Item(ItemID)
) ENGINE=InnoDB;
-- ---------- SALES (profit + popular items) ----------
CREATE TABLE Sale (
 SaleID BIGINT AUTO_INCREMENT PRIMARY KEY,
 SaleDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 ShopID BIGINT NOT NULL,
 VisitorID BIGINT NULL,
 TotalAmount DECIMAL(12,2) NOT NULL CHECK (TotalAmount >= 0),
 CONSTRAINT fk_sale_shop FOREIGN KEY (ShopID) REFERENCES Shop(ShopID),
 CONSTRAINT fk_sale_visitor FOREIGN KEY (VisitorID) REFERENCES Visitor(VisitorID)
) ENGINE=InnoDB;
CREATE TABLE SaleLineItem (
 SaleID BIGINT NOT NULL,
 ItemID BIGINT NOT NULL,
 Quantity INT NOT NULL CHECK (Quantity > 0),
 UnitSellPrice DECIMAL(10,2) NOT NULL CHECK (UnitSellPrice >= 0),
 UnitBuyPrice DECIMAL(10,2) NOT NULL CHECK (UnitBuyPrice >= 0),
 DiscountApplied DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (DiscountApplied >= 0),
 PRIMARY KEY (SaleID, ItemID),
 CONSTRAINT fk_sli_sale FOREIGN KEY (SaleID) REFERENCES Sale(SaleID) ON DELETE CASCADE,
 CONSTRAINT fk_sli_item FOREIGN KEY (ItemID) REFERENCES Item(ItemID),
 CHECK (DiscountApplied <= UnitSellPrice)
) ENGINE=InnoDB;
-- ---------- TICKET ----------
CREATE TABLE Ticket (
 TicketNumber BIGINT AUTO_INCREMENT PRIMARY KEY,
 TicketType ENUM('General','VIP','Membership') NOT NULL,
 Price DECIMAL(10,2) NOT NULL CHECK (Price >= 0),
 VIPID VARCHAR(50) NULL,
 MembershipID VARCHAR(50) NULL,
 IssueDate DATE NOT NULL,
 ExpiryDate DATE NOT NULL,
 VisitorID BIGINT NOT NULL,
 CONSTRAINT fk_ticket_visitor FOREIGN KEY (VisitorID) REFERENCES Visitor(VisitorID),
 CHECK (ExpiryDate >= IssueDate),
 CHECK (
 (TicketType='VIP' AND VIPID IS NOT NULL AND MembershipID IS NULL) OR
 (TicketType='Membership' AND MembershipID IS NOT NULL AND VIPID IS NULL) OR
 (TicketType='General' AND VIPID IS NULL AND MembershipID IS NULL)
 )
) ENGINE=InnoDB;
-- ---------- PARK VISIT (attendance by day) ----------
CREATE TABLE ParkVisit (
 ParkVisitID BIGINT AUTO_INCREMENT PRIMARY KEY,
 VisitorID BIGINT NOT NULL,
 TicketNumber BIGINT NOT NULL,
 VisitDate DATE NOT NULL,
 UNIQUE KEY uq_visit (VisitorID, TicketNumber, VisitDate),
 CONSTRAINT fk_parkvisit_visitor FOREIGN KEY (VisitorID) REFERENCES Visitor(VisitorID),
 CONSTRAINT fk_parkvisit_ticket FOREIGN KEY (TicketNumber) REFERENCES 
Ticket(TicketNumber)
) ENGINE=InnoDB;
-- ---------- VISITOR ↔ ATTRACTION VISITS (M:N) ----------
CREATE TABLE AttractionVisit (
 VisitorID BIGINT NOT NULL,
 AttractionID BIGINT NOT NULL,
 VisitTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 TicketNumber BIGINT NULL,
 PRIMARY KEY (VisitorID, AttractionID, VisitTime),
 CONSTRAINT fk_av_visitor FOREIGN KEY (VisitorID) REFERENCES Visitor(VisitorID),
 CONSTRAINT fk_av_attraction FOREIGN KEY (AttractionID) REFERENCES Attraction(AttractionID),
 CONSTRAINT fk_av_ticket FOREIGN KEY (TicketNumber) REFERENCES Ticket(TicketNumber)
) ENGINE=InnoDB;
-- ---------- EMPLOYEE ↔ ATTRACTION ASSIGNMENT (M:N) ----------
CREATE TABLE AttractionStaffAssignment (
 EmployeeID BIGINT NOT NULL,
 AttractionID BIGINT NOT NULL,
 ShiftStart DATETIME NOT NULL,
 ShiftEnd DATETIME NOT NULL,
 RoleOnAttraction VARCHAR(80),
 PRIMARY KEY (EmployeeID, AttractionID, ShiftStart),
 CONSTRAINT fk_asa_employee FOREIGN KEY (EmployeeID) REFERENCES 
Employee(EmployeeID),
 CONSTRAINT fk_asa_attraction FOREIGN KEY (AttractionID) REFERENCES 
Attraction(AttractionID),
 CHECK (ShiftEnd > ShiftStart)
) ENGINE=InnoDB;
-- ---------- REVIEW (many reviews, exactly one target) ----------
CREATE TABLE Review (
 ReviewID BIGINT AUTO_INCREMENT PRIMARY KEY,
 VisitorID BIGINT NOT NULL,
 Rating INT NOT NULL CHECK (Rating BETWEEN 1 AND 10),
 Comment TEXT,
 DateSubmitted DATE NOT NULL,
 AttractionID BIGINT NULL,
 RestaurantID BIGINT NULL,
 ShopID BIGINT NULL,
 CONSTRAINT fk_review_visitor FOREIGN KEY (VisitorID) REFERENCES Visitor(VisitorID),
 CONSTRAINT fk_review_attraction FOREIGN KEY (AttractionID) REFERENCES 
Attraction(AttractionID),
 CONSTRAINT fk_review_restaurant FOREIGN KEY (RestaurantID) REFERENCES 
Restaurant(RestaurantID),
 CONSTRAINT fk_review_shop FOREIGN KEY (ShopID) REFERENCES Shop(ShopID)
) ENGINE=InnoDB;
-- ---------- MAINTENANCE ----------
CREATE TABLE Maintenance (
 MaintenanceID BIGINT AUTO_INCREMENT PRIMARY KEY,
 AttractionID BIGINT NOT NULL,
 DateStart DATETIME NOT NULL,
 DateEnd DATETIME NULL,
 IssueSeverity ENUM('Low','Medium','High') NOT NULL,
 Status ENUM('Planned','In Progress','Completed','Cancelled') NOT NULL,
 EmployeeID BIGINT NOT NULL,
 CONSTRAINT fk_maint_attraction FOREIGN KEY (AttractionID) REFERENCES 
Attraction(AttractionID),
 CONSTRAINT fk_maint_employee FOREIGN KEY (EmployeeID) REFERENCES 
Employee(EmployeeID),
 CHECK (DateEnd IS NULL OR DateEnd >= DateStart)
) ENGINE=InnoDB;
-- ---------- ACCIDENT HISTORY ----------
CREATE TABLE AccidentHistory (
 AccidentID BIGINT AUTO_INCREMENT PRIMARY KEY,
 AttractionID BIGINT NOT NULL,
 DateOfAccident DATETIME NOT NULL,
 Severity ENUM('Low','Medium','High') NOT NULL,
 Description TEXT NOT NULL,
 CONSTRAINT fk_acc_attraction FOREIGN KEY (AttractionID) REFERENCES Attraction(AttractionID)
) ENGINE=InnoDB;
-- ---------- FACILITY + HOTEL ----------
CREATE TABLE Facility (
 FacilityID BIGINT AUTO_INCREMENT PRIMARY KEY,
 FacilityType ENUM('Restroom','Guest Services','Locker','Hotel','Other') NOT NULL,
 AreaID BIGINT NOT NULL,
 Status ENUM('Open','Closed') NOT NULL DEFAULT 'Open',
 CONSTRAINT fk_facility_area FOREIGN KEY (AreaID) REFERENCES Area(AreaID)
) ENGINE=InnoDB;
CREATE TABLE Hotel (
 HotelID BIGINT PRIMARY KEY,
 HotelName VARCHAR(140) NOT NULL,
 StarRating INT NOT NULL CHECK (StarRating BETWEEN 1 AND 5),
 TotalRooms INT NOT NULL CHECK (TotalRooms >= 0),
 ContactNumber VARCHAR(30),
 CONSTRAINT fk_hotel_facility FOREIGN KEY (HotelID) REFERENCES Facility(FacilityID) ON 
DELETE CASCADE
) ENGINE=InnoDB;
CREATE TABLE HotelRoom (
 RoomID BIGINT AUTO_INCREMENT PRIMARY KEY,
 HotelID BIGINT NOT NULL,
 RoomNumber VARCHAR(20) NOT NULL,
 Capacity INT NOT NULL CHECK (Capacity >= 1),
 NightlyRate DECIMAL(10,2) NOT NULL CHECK (NightlyRate >= 0),
 Status ENUM('Available','OutOfService') NOT NULL DEFAULT 'Available',
 UNIQUE KEY uq_room (HotelID, RoomNumber),
 CONSTRAINT fk_room_hotel FOREIGN KEY (HotelID) REFERENCES Hotel(HotelID) ON DELETE 
CASCADE
) ENGINE=InnoDB;
CREATE TABLE Reservation (
 ReservationID BIGINT AUTO_INCREMENT PRIMARY KEY,
 VisitorID BIGINT NOT NULL,
 RoomID BIGINT NOT NULL,
 CheckInDate DATE NOT NULL,
 CheckOutDate DATE NOT NULL,
 TotalPrice DECIMAL(12,2) NOT NULL CHECK (TotalPrice >= 0),
 Status ENUM('Booked','Cancelled','Completed') NOT NULL DEFAULT 'Booked',
 CONSTRAINT fk_res_visitor FOREIGN KEY (VisitorID) REFERENCES Visitor(VisitorID),
 CONSTRAINT fk_res_room FOREIGN KEY (RoomID) REFERENCES HotelRoom(RoomID),
 CHECK (CheckOutDate > CheckInDate)
) ENGINE=InnoDB;
-- ---------- PARKING ----------
CREATE TABLE ParkingLot (
 LotID BIGINT AUTO_INCREMENT PRIMARY KEY,
 Capacity INT NOT NULL CHECK (Capacity >= 0),
 LocationDescription VARCHAR(200) NOT NULL,
 FeePerHour DECIMAL(10,2) NOT NULL CHECK (FeePerHour >= 0)
) ENGINE=InnoDB;
-- ---------- WEATHER + IMPACT (M:N) ----------
CREATE TABLE Weather (
 WeatherID BIGINT AUTO_INCREMENT PRIMARY KEY,
 WeatherDate DATE NOT NULL UNIQUE,
 HighTemp DECIMAL(5,2) NULL,
 LowTemp DECIMAL(5,2) NULL,
 SeverityLevel ENUM('Low','Medium','High') NOT NULL
) ENGINE=InnoDB;
CREATE TABLE AttractionWeatherImpact (
 WeatherID BIGINT NOT NULL,
 AttractionID BIGINT NOT NULL,
 ImpactStatus ENUM('Open','Closed','Under Maintenance','Limited Operation') NOT NULL,
 Notes TEXT,
 PRIMARY KEY (WeatherID, AttractionID),
 CONSTRAINT fk_awi_weather FOREIGN KEY (WeatherID) REFERENCES Weather(WeatherID) ON 
DELETE CASCADE,
 CONSTRAINT fk_awi_attraction FOREIGN KEY (AttractionID) REFERENCES Attraction(AttractionID) 
ON DELETE CASCADE
) ENGINE=InnoDB;
-- ---------- WAIT TIME SNAPSHOT ----------
CREATE TABLE WaitTimeSnapshot (
 SnapshotID BIGINT AUTO_INCREMENT PRIMARY KEY,
 AttractionID BIGINT NOT NULL,
 SnapshotTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 QueueCount INT NOT NULL CHECK (QueueCount >= 0),
 EstimatedWaitMin INT NOT NULL CHECK (EstimatedWaitMin >= 0),
 CONSTRAINT fk_wts_attraction FOREIGN KEY (AttractionID) REFERENCES Attraction(AttractionID)
) ENGINE=InnoDB;