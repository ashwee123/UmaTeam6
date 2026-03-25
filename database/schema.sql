DROP DATABASE IF EXISTS ThemeParkDB;
CREATE DATABASE ThemeParkDB;
USE ThemeParkDB;

-- ---------------------------
-- AREA
-- ---------------------------
CREATE TABLE Area (
    AreaID BIGINT AUTO_INCREMENT PRIMARY KEY,
    AreaName VARCHAR(100) NOT NULL UNIQUE,
    Theme VARCHAR(100),
    Size INT CHECK (Size >= 0)
);

-- ---------------------------
-- MANAGER
-- ---------------------------
CREATE TABLE Manager (
    ManagerID BIGINT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Phone VARCHAR(20),
    Email VARCHAR(100),
    Salary DECIMAL(10,2) CHECK (Salary >= 0),
    AreaAssigned BIGINT UNIQUE,
    FOREIGN KEY (AreaAssigned) REFERENCES Area(AreaID)
);

-- ---------------------------
-- EMPLOYEE
-- ---------------------------
CREATE TABLE Employee (
    EmployeeID BIGINT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Position VARCHAR(50),
    Salary DECIMAL(10,2) CHECK (Salary >= 0),
    HireDate DATE,
    ManagerID BIGINT,
    AreaID BIGINT,
    FOREIGN KEY (ManagerID) REFERENCES Manager(ManagerID),
    FOREIGN KEY (AreaID) REFERENCES Area(AreaID)
);

-- ---------------------------
-- ATTRACTION
-- ---------------------------
CREATE TABLE Attraction (
    AttractionID BIGINT AUTO_INCREMENT PRIMARY KEY,
    AttractionName VARCHAR(100) NOT NULL,
    AttractionType ENUM('Ride','Show','Game'),
    Location BIGINT NOT NULL,
    Status ENUM('Open','Closed','Under Maintenance','Limited Operation'),
    QueueCount INT CHECK (QueueCount >= 0),
    FOREIGN KEY (Location) REFERENCES Area(AreaID)
);

-- ---------------------------
-- RIDE SUBTYPE
-- ---------------------------
CREATE TABLE Ride (
    RideID BIGINT PRIMARY KEY,
    RideDuration INT CHECK (RideDuration >= 0),
    RideLocation VARCHAR(100),
    VehicleCapacity INT CHECK (VehicleCapacity >= 0),
    FOREIGN KEY (RideID) REFERENCES Attraction(AttractionID)
);

-- ---------------------------
-- SHOW SUBTYPE
-- ---------------------------
CREATE TABLE Shows (
    ShowID BIGINT PRIMARY KEY,
    ShowTimes VARCHAR(200),
    ShowLocation VARCHAR(100),
    SeatingCapacity INT CHECK (SeatingCapacity >= 0),
    FOREIGN KEY (ShowID) REFERENCES Attraction(AttractionID)
);

-- ---------------------------
-- GAME SUBTYPE (ARCADE)
-- ---------------------------
CREATE TABLE Arcade (
    GameID BIGINT PRIMARY KEY,
    PrizeID BIGINT,
    GameBuildingID BIGINT,
    AreaID BIGINT,
    BuildingCapacity INT CHECK (BuildingCapacity >= 0),
    FOREIGN KEY (GameID) REFERENCES Attraction(AttractionID),
    FOREIGN KEY (AreaID) REFERENCES Area(AreaID)
);

-- ---------------------------
-- RESTAURANT (DINING)
-- ---------------------------
CREATE TABLE Dining (
    RestaurantID BIGINT AUTO_INCREMENT PRIMARY KEY,
    RestaurantName VARCHAR(100),
    CuisineType VARCHAR(100),
    Capacity INT CHECK (Capacity >= 0),
    Location BIGINT,
    ManagerID BIGINT,
    FOREIGN KEY (Location) REFERENCES Area(AreaID),
    FOREIGN KEY (ManagerID) REFERENCES Manager(ManagerID)
);

-- ---------------------------
-- SHOP ITEM
-- ---------------------------
CREATE TABLE ShopItem (
    ItemID BIGINT AUTO_INCREMENT PRIMARY KEY,
    ItemName VARCHAR(100),
    BuyPrice DECIMAL(10,2),
    SellPrice DECIMAL(10,2),
    DiscountPrice DECIMAL(10,2),
    Quantity INT,
    DayBought DATE,
    ShopLocation BIGINT,
    FOREIGN KEY (ShopLocation) REFERENCES Area(AreaID)
);

-- ---------------------------
-- RESTOCK LOG
-- ---------------------------
CREATE TABLE RestockLog (
    ItemID BIGINT,
    Quantity INT CHECK (Quantity >= 0),
    ShopID BIGINT,
    AreaID BIGINT,
    Cost DECIMAL(10,2) CHECK (Cost >= 0),
    PRIMARY KEY (ItemID),
    FOREIGN KEY (ItemID) REFERENCES ShopItem(ItemID),
    FOREIGN KEY (AreaID) REFERENCES Area(AreaID)
);

-- ---------------------------
-- VISITOR
-- ---------------------------
CREATE TABLE Visitor (
    VisitorID BIGINT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    Phone VARCHAR(20),
    Email VARCHAR(100)
);

-- ---------------------------
-- TICKET
-- ---------------------------
CREATE TABLE Ticket (
    TicketNumber BIGINT AUTO_INCREMENT PRIMARY KEY,
    TicketType ENUM('General','VIP','Membership'),
    Price DECIMAL(10,2) CHECK (Price >= 0),
    VIPID BIGINT NULL,
    MembershipID BIGINT NULL,
    IssueDate DATE,
    ExpiryDate DATE,
    VisitorID BIGINT,
    FOREIGN KEY (VisitorID) REFERENCES Visitor(VisitorID),
    CHECK (IssueDate < ExpiryDate)
);

-- ---------------------------
-- REVIEW
-- ---------------------------
CREATE TABLE Review (
    ReviewID BIGINT AUTO_INCREMENT PRIMARY KEY,
    VisitorID BIGINT UNIQUE,
    Feedback INT CHECK (Feedback BETWEEN 1 AND 10),
    Comment TEXT,
    DateSubmitted DATE,
    FOREIGN KEY (VisitorID) REFERENCES Visitor(VisitorID)
);

-- ---------------------------
-- MAINTENANCE
-- ---------------------------
CREATE TABLE Maintenance (
    MaintenanceID BIGINT AUTO_INCREMENT PRIMARY KEY,
    AttractionID BIGINT,
    DateStart DATE,
    DateEnd DATE,
    IssueSeverity ENUM('Low','Medium','High'),
    Status VARCHAR(50),
    EmployeeID BIGINT,
    FOREIGN KEY (AttractionID) REFERENCES Attraction(AttractionID),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
);

-- ---------------------------
-- ACCIDENT HISTORY
-- ---------------------------
CREATE TABLE AccidentHistory (
    AccidentID BIGINT AUTO_INCREMENT PRIMARY KEY,
    AttractionID BIGINT,
    DateOfAccident DATE,
    Severity ENUM('Low','Medium','High'),
    Description TEXT,
    FOREIGN KEY (AttractionID) REFERENCES Attraction(AttractionID)
);

-- ---------------------------
-- FACILITY
-- ---------------------------
CREATE TABLE Facility (
    FacilityID BIGINT AUTO_INCREMENT PRIMARY KEY,
    FacilityType ENUM('Restroom','Guest Services','Locker','Hotel'),
    Location BIGINT,
    Status VARCHAR(50),
    FOREIGN KEY (Location) REFERENCES Area(AreaID)
);

-- ---------------------------
-- HOTEL SUBTYPE
-- ---------------------------
CREATE TABLE Hotel (
    HotelID BIGINT PRIMARY KEY,
    HotelName VARCHAR(100),
    Location BIGINT,
    StarRating ENUM('1','2','3','4','5'),
    TotalRooms INT CHECK (TotalRooms >= 0),
    ContactNumber VARCHAR(20),
    FOREIGN KEY (HotelID) REFERENCES Facility(FacilityID),
    FOREIGN KEY (Location) REFERENCES Area(AreaID)
);

-- ---------------------------
-- PARKING
-- ---------------------------
CREATE TABLE Parking (
    LotID BIGINT AUTO_INCREMENT PRIMARY KEY,
    Capacity INT CHECK (Capacity >= 0),
    LocationDescription VARCHAR(200),
    FeePerHour DECIMAL(10,2) CHECK (FeePerHour >= 0)
);

-- ---------------------------
-- WEATHER
-- ---------------------------
CREATE TABLE Weather (
    WeatherID BIGINT AUTO_INCREMENT PRIMARY KEY,
    WeatherDate DATE,
    HighTemp INT,
    LowTemp INT,
    SeverityLevel ENUM('Low','Medium','High'),
    AttractionOperationStatus VARCHAR(100)
);