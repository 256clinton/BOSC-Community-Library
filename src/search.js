// BOSC Community Library Search Feature

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const resourceList = document.getElementById("resourceList");
    const resources = resourceList.getElementsByTagName("li");

    searchInput.addEventListener("keyup", () => {
        const filter = searchInput.value.toLowerCase();

        for (let i = 0; i < resources.length; i++) {
            const text = resources[i].textContent || resources[i].innerText;

            if (text.toLowerCase().includes(filter)) {
                resources[i].style.display = "";
            } else {
                resources[i].style.display = "none";
            }
        }
    });
});