// BOSC Community Library - Resource Manager
// BUG: Counter includes empty categories, inflating the total

// BOSC Community Library - Resource Manager
// FIXED: Counter now filters out empty entries

const resources = [
  { id: 1, title: "Introduction to Open Source", category: "Software", author: "Jane Doe" },
  { id: 2, title: "Government Digital Transformation", category: "Policy", author: "John Smith" },
  { id: 3, title: "Community Building Guide", category: "Community", author: "Alex Chen" },
  { id: 4, title: "Linux Administration Basics", category: "Software", author: "Maria Garcia" },
  { id: 5, title: "Data Privacy Regulations", category: "Policy", author: "Robert Kim" },
  { id: 6, title: "", category: "", author: "" },
  { id: 7, title: "Open Data Standards", category: "Policy", author: "Sarah Williams" },
  { id: 8, title: "", category: "", author: "" },
];

// FIX: Filter out empty resources before counting
function countAllResources() {
  const validResources = resources.filter(resource => 
    resource.title.trim() !== "" && resource.category.trim() !== ""
  );
  return validResources.length; // Now correctly returns 6
}

// FIX: Also filter empty categories when counting by category
function countByCategory(categoryName) {
  if (!categoryName || categoryName.trim() === "") {
    return 0; // Don't count empty categories
  }
  let count = 0;
  for (let i = 0; i < resources.length; i++) {
    if (resources[i].category === categoryName && 
        resources[i].title.trim() !== "") {
      count++;
    }
  }
  return count;
}

// Display the counter on the page
function displayResourceCount() {
  const counterElement = document.getElementById('resource-count');
  if (counterElement) {
    const validCount = countAllResources();
    counterElement.textContent = validCount; // Now shows 6
  }
}

// NEW: Also display category count
function displayCategoryCount() {
  const categories = new Set();
  resources.forEach(resource => {
    if (resource.category.trim() !== "") {
      categories.add(resource.category);
    }
  });
  const counterElement = document.getElementById('category-count');
  if (counterElement) {
    counterElement.textContent = categories.size; // Shows 3 unique categories
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    resources, 
    countAllResources, 
    countByCategory, 
    displayResourceCount,
    displayCategoryCount 
  };
}

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