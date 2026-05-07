# 📘 SUBMISSION LOG

## Project: BOSC Community Library

This document tracks weekly progress, issues, fixes, and feature implementations for the project.

---

## 🗓️ DAY 5: Friday, May 9, 2026

### 🐛 Issue #3: Bug Fix — Resource Counter Inaccuracy

**Problem:**
The resource counter displayed incorrect totals by including hidden or filtered items.

**Cause:**
The counting function did not account for elements with `display: none` or dynamically removed items.

**Solution Implemented:**

* Updated JavaScript counter logic to count only visible `.resource-card` elements
* Ensured counter updates after filtering actions

**Code Fix:**

```javascript
function updateCounter() {
  const items = document.querySelectorAll(".resource-card");
  const visibleItems = Array.from(items).filter(
    item => item.style.display !== "none"
  );

  document.getElementById("counter").textContent = visibleItems.length;
}
```

**Status:** ✅ Fixed

---

### 🚀 Issue #4: Feature — Search Functionality

**Feature Description:**
Implemented a real-time search feature allowing users to filter resources by title, category, or keyword.

**Implementation Details:**

* Added search input field
* Used JavaScript event listener for `keyup`
* Filtered `.resource-card` elements dynamically
* Integrated with counter update function

**Code Implementation:**

```javascript
document.getElementById("searchInput").addEventListener("keyup", function () {
  const query = this.value.toLowerCase();
  const items = document.querySelectorAll(".resource-card");

  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    if (text.includes(query)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

  updateCounter();
});
```

**Status:** ✅ Completed

---

## 📊 Summary

* Fixed resource counter bug
* Added real-time search functionality
* Improved user experience and accuracy of displayed data

---

## 🧠 Notes

* Ensure future features update the counter function when modifying resource visibility
* Consider adding debounce for search optimization in future updates

---

**End of Log**
