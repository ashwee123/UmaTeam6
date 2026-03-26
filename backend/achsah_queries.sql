-- Revenue summary by ticket type
SELECT 
    TicketType,
    COUNT(*) AS TotalTicketsSold,   -- number of tickets
    SUM(Price) AS TotalRevenue,     -- total money earned
    AVG(Price) AS AvgTicketPrice    -- average price
FROM ticket
GROUP BY TicketType
ORDER BY TotalRevenue DESC;
-- Accident count per attraction and severity
SELECT 
    a.AttractionName,
    ah.Severity,
    COUNT(*) AS TotalAccidents
FROM AccidentHistory ah
JOIN attraction a 
    ON ah.AttractionID = a.AttractionID
GROUP BY a.AttractionName, ah.Severity;
-- Overall visitor feedback stats
SELECT 
    AVG(Feedback) AS AvgFeedback,
    COUNT(*) AS TotalReviews,
    MIN(Feedback) AS Lowest,
    MAX(Feedback) AS Highest
FROM Review;
-- Maintenance workload per attraction
SELECT 
    a.AttractionName,
    COUNT(m.MaintenanceID) AS Jobs,
    SUM(DATEDIFF(m.DateEnd, m.DateStart)) AS DaysSpent
FROM Maintenance m
JOIN attraction a 
    ON m.AttractionID = a.AttractionID
GROUP BY a.AttractionName;