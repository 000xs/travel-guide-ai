const parseItineraryToJSON = (itineraryText) => {
  const days = itineraryText.split("**Day ").slice(1); // Split by days
  const itinerary = [];

  // Extract trip name from the itinerary text
  const tripNameMatch = itineraryText.match(
    /### \*\*Travel Itinerary for (.*?)\*\*/
  );
  const tripName = tripNameMatch ? tripNameMatch[1].trim() : "Unnamed Trip";

  days.forEach((day) => {
    const dayData = {};

    // Extract day number and title
    const dayHeader = day.split(":**")[0].trim();
    dayData.dayNumber = parseInt(dayHeader);
    dayData.title = day.split(":**")[1].split("\n")[0].trim();

    // Extract theme
    const themeMatch = day.match(/\*Theme:\* (.*)/);
    dayData.theme = themeMatch ? themeMatch[1].trim() : "";

    // Extract morning, afternoon, evening, and tips
    const sections = ["Morning", "Afternoon", "Evening", "Tips"];
    sections.forEach((section) => {
      const sectionMatch = day.match(
        new RegExp(`\\*\\*${section}:\\*\\*([\\s\\S]*?)(\\*\\*|$)`)
      );
      if (sectionMatch) {
        dayData[section.toLowerCase()] = sectionMatch[1].trim();
      } else {
        // Default value for empty fields
        dayData[section.toLowerCase()] = "-";
      }
    });

    // Append "Use" to the tips field if it exists
    if (dayData.tips && dayData.tips !== "-") {
      dayData.tips = `Use ${dayData.tips}`;
    }

    itinerary.push(dayData);
  });

  // Return JSON with trip name and itinerary
  return JSON.stringify({ tripName, itinerary }, null, 2);
};

export { parseItineraryToJSON };
