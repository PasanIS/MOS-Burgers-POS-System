document.addEventListener("DOMContentLoaded", () => {
  const itemForm = document.getElementById("itemForm");
  const clearFormBtn = document.getElementById("clearFormBtn");
  const itemsTableBody = document.getElementById("itemsTableBody");
  const noItemsMessage = document.getElementById("noItemsMessage");

  let items = [];

  // Utility function to render items in the table
  function renderItems() {
    itemsTableBody.innerHTML = "";

    if (items.length === 0) {
      noItemsMessage.classList.remove("hidden");
      return;
    }

    noItemsMessage.classList.add("hidden");

    items.forEach((item, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td><img src="${item.image}" alt="${item.name}" /></td>
        <td>${item.name}</td>
        <td>${item.code}</td>
        <td>LKR ${item.price.toFixed(2)}</td>
        <td>${item.discount ? item.discount + "%" : "-"}</td>
        <td>${item.category}</td>
        <td class="text-center">
          <button class="btn btn-sm btn-outline-primary me-2" onclick="editItem(${index})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${index})">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      `;

      itemsTableBody.appendChild(row);
    });
  }

  // Update date and time
  function updateDateTime() {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    document.getElementById("current-date").textContent =
      now.toLocaleDateString("en-US", options);

    // Update order date
    const dateOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    document.getElementById("orderDate").textContent = now.toLocaleDateString(
      "en-US",
      dateOptions
    );
  }

  // Add or Update Item
  itemForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const item = {
      name: document.getElementById("itemName").value.trim(),
      price: parseFloat(document.getElementById("itemPrice").value),
      discount: parseInt(document.getElementById("itemDiscount").value) || 0,
      code: document.getElementById("itemCode").value.trim(),
      image:
        document.getElementById("itemImage").value.trim() ||
        "IMG/placeholder.jpg",
      category: document.getElementById("itemCategory").value,
    };

    // Check if updating
    const existingIndex = items.findIndex((i) => i.code === item.code);
    if (existingIndex !== -1) {
      items[existingIndex] = item;
      alert("Item updated successfully!");
    } else {
      items.push(item);
      alert("Item added successfully!");
    }

    clearForm();
    renderItems();
  });

  // Clear form
  function clearForm() {
    itemForm.reset();
  }

  clearFormBtn.addEventListener("click", clearForm);

  // Expose edit and remove functions to window
  window.editItem = function (index) {
    const item = items[index];

    document.getElementById("itemName").value = item.name;
    document.getElementById("itemPrice").value = item.price;
    document.getElementById("itemDiscount").value = item.discount;
    document.getElementById("itemCode").value = item.code;
    document.getElementById("itemImage").value = item.image;
    document.getElementById("itemCategory").value = item.category;

    alert("Item loaded for editing. Click Save/Update to confirm changes.");
  };

  window.removeItem = function (index) {
    if (confirm("Are you sure you want to delete this item?")) {
      items.splice(index, 1);
      renderItems();
    }
  };

  // Show today's date
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  document.getElementById("current-date").textContent = today;
});
