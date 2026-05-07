// BOSC Community Library - Resource Manager
// BUG: Counter includes empty categories, inflating the total

const resources = [
  { id: 1, title: "Introduction to Open Source", category: "Software", author: "Jane Doe" },
  { id: 2, title: "Government Digital Transformation", category: "Policy", author: "John Smith" },
  { id: 3, title: "Community Building Guide", category: "Community", author: "Alex Chen" },
  { id: 4, title: "Linux Administration Basics", category: "Software", author: "Maria Garcia" },
  { id: 5, title: "Data Privacy Regulations", category: "Policy", author: "Robert Kim" },
  { id: 6, title: "", category: "", author: "" },  // Empty entry - should not be counted
  { id: 7, title: "Open Data Standards", category: "Policy", author: "Sarah Williams" },
  { id: 8, title: "", category: "", author: "" },  // Another empty entry
];

// BUG: This function counts ALL resources including empty ones
function countAllResources() {
  return resources.length; // Returns 8, but should return 6 (only valid resources)
}

// Function to count by category (also buggy - counts empty categories)
function countByCategory(categoryName) {
  let count = 0;
  for (let i = 0; i < resources.length; i++) {
    if (resources[i].category === categoryName) {
      count++;
    }
  }
  return count; // Empty strings === empty strings get counted as a category
}

// Display the counter on the page
function displayResourceCount() {
  const counterElement = document.getElementById('resource-count');
  if (counterElement) {
    counterElement.textContent = countAllResources(); // Shows 8 instead of 6
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { resources, countAllResources, countByCategory, displayResourceCount };
}