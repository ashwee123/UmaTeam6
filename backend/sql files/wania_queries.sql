-- ============================================================
-- QUERY 1: DINING
-- Frontend: Single button "View Dining Options"
-- No filter needed — shows all 11 restaurants at once
-- Open restaurants appear first, sorted by price (cheapest first)
-- ============================================================
SELECT 
    ar.AreaName,
    d.RestaurantName,
    d.CuisineType,
    d.Price,
    a.Status,

    CASE 
        WHEN d.Price <= 10 THEN 'Budget'
        WHEN d.Price <= 18 THEN 'Standard'
        ELSE 'Premium'
    END AS PriceLevel,

    -- CrowdLevel only shows for Open restaurants
    -- Closed/Under Maintenance/Limited Operation show as 'Unavailable'
    CASE
        WHEN a.Status != 'Open' THEN 'Unavailable'
        WHEN (d.Capacity - a.QueueCount) * 100.0 / d.Capacity >= 50 THEN 'Plenty of Space'
        WHEN (d.Capacity - a.QueueCount) * 100.0 / d.Capacity >= 20 THEN 'Moderate'
        ELSE 'Crowded'
    END AS CrowdLevel

FROM dining d
JOIN attraction a ON d.AttractionID = a.AttractionID
JOIN area ar ON a.Location = ar.AreaID
ORDER BY a.Status ASC, d.Price ASC;

-- ============================================================
-- QUERY 1.1: ARCADE
-- Frontend: 3 filter buttons
--   Button 1: "All Games"         → SET @player_type = 'All'
--   Button 2: "Group Games"       → SET @player_type = 'Group Game'
--   Button 3: "Solo / Small Group"→ SET @player_type = 'Solo/Small Group'
-- Only shows Open arcade zones
-- ============================================================
SET @player_type = 'All'; -- Change this value based on visitor button click

SELECT 
    ar.AreaName,
    a.AttractionName AS ArcadeZone,
    g.GameName,
    g.GameType,
    g.PlayCost,

    CASE 
        WHEN g.PlayCost <= 3 THEN 'Cheap'
        WHEN g.PlayCost <= 7 THEN 'Standard'
        ELSE 'Premium'
    END AS CostLevel,

    CASE 
        WHEN g.MaxPlayers >= 4 THEN 'Group Game'
        ELSE 'Solo/Small Group'
    END AS PlayerType

FROM arcade g
JOIN attraction a ON g.AttractionID = a.AttractionID
JOIN area ar ON a.Location = ar.AreaID
WHERE a.Status = 'Open'
AND (@player_type = 'All' OR 
    (@player_type = 'Group Game'        AND g.MaxPlayers >= 4) OR
    (@player_type = 'Solo/Small Group'  AND g.MaxPlayers < 4))
ORDER BY g.PlayCost ASC;

-- ============================================================
-- QUERY 2: MOST POPULAR RIDES
-- Frontend: 4 filter buttons
--   Button 1: "All Rides"      → SET @crowd = 'All'
--   Button 2: "Less Busy"      → SET @crowd = 'Less Busy'      (QueueCount < 30)
--   Button 3: "Popular"        → SET @crowd = 'Popular'        (QueueCount 30–69)
--   Button 4: "Very Popular"   → SET @crowd = 'Very Popular'   (QueueCount >= 70)
-- Only shows Open rides, Top 10 by queue count
-- ============================================================
SET @crowd = 'All'; -- Change this value based on visitor button click

SELECT 
    a.AttractionName,
    a.AttractionType,
    a.QueueCount,
    r.RideDuration AS DurationMins,

    -- EstimatedWaitMins = (queue / vehicle capacity) * ride duration
    ROUND((a.QueueCount / NULLIF(r.VehicleCapacity, 0)) * r.RideDuration) AS EstimatedWaitMins,

    CASE 
        WHEN a.QueueCount >= 70 THEN 'Very Popular'
        WHEN a.QueueCount >= 30 THEN 'Popular'
        ELSE 'Less Busy'
    END AS PopularityLevel

FROM attraction a
JOIN ride r ON a.AttractionID = r.RideID
WHERE a.Status = 'Open'
AND a.AttractionType IN ('Roller Coaster', 'Water Ride', 'Drop Tower', 'Dark Ride', 'Simulator')
AND (@crowd = 'All' OR 
    (@crowd = 'Very Popular' AND a.QueueCount >= 70) OR
    (@crowd = 'Popular'      AND a.QueueCount >= 30 AND a.QueueCount < 70) OR
    (@crowd = 'Less Busy'    AND a.QueueCount < 30))
ORDER BY a.QueueCount DESC
LIMIT 10;

-- ============================================================
-- QUERY 3: PARKING AVAILABILITY
-- Frontend: Single button "Find Parking"
-- No filter needed — shows all lots sorted by price (cheapest first)
-- Visitor can see availability status and cost level at a glance
-- ============================================================
SELECT 
    ar.AreaName,
    p.LocationDescription,
    p.FeePerHour,

    CASE 
        WHEN p.Capacity = 0   THEN 'Full'
        WHEN p.Capacity > 200 THEN 'Plenty of Space'
        WHEN p.Capacity > 100 THEN 'Moderate Space'
        ELSE 'Limited Space'
    END AS AvailabilityStatus,

    CASE
        WHEN p.FeePerHour <= 7.00  THEN 'Budget Friendly'
        WHEN p.FeePerHour <= 12.00 THEN 'Standard Pricing'
        ELSE 'Premium Pricing'
    END AS CostLevel,

    GROUP_CONCAT(a.AttractionName ORDER BY a.AttractionName SEPARATOR ', ') AS NearbyAttractions

FROM parking p
JOIN area ar ON p.AreaID = ar.AreaID
LEFT JOIN attraction a ON ar.AreaID = a.Location
GROUP BY ar.AreaName, p.LocationDescription, p.FeePerHour, p.Capacity
ORDER BY p.FeePerHour ASC;

-- ============================================================
-- QUERY 4: SHOWS
-- Frontend: 2 filter buttons
--   Button 1: "Upcoming Shows" → SET @filter = 'upcoming'
--   Button 2: "Past Shows"     → SET @filter = 'past'
-- Upcoming shows display availability status
-- Past shows display 'Show Ended' — no availability info shown
-- Only shows Open attractions with AttractionType = 'Show'
-- ============================================================
SET @filter = 'upcoming'; -- Change this value based on visitor button click

SELECT 
    a.AttractionName AS ShowName,
    s.ShowLocation,
    s.ShowTimes,
    (s.SeatingCapacity - a.QueueCount) AS SeatsRemaining,

    CASE
        WHEN @filter = 'past'                              THEN 'Show Ended'
        WHEN (s.SeatingCapacity - a.QueueCount) <= 0      THEN 'Sold Out'
        WHEN (s.SeatingCapacity - a.QueueCount) <= 10     THEN 'Almost Full'
        WHEN (s.SeatingCapacity - a.QueueCount) <= 30     THEN 'Filling Up'
        ELSE                                                    'Good Availability'
    END AS AvailabilityStatus

FROM shows s
JOIN attraction a ON s.AttractionID = a.AttractionID
WHERE a.Status = 'Open'
AND a.AttractionType = 'Show'
AND (
    (@filter = 'upcoming' AND s.ShowTimes >= NOW())
    OR
    (@filter = 'past'     AND s.ShowTimes <  NOW())
)
ORDER BY s.ShowTimes ASC;
