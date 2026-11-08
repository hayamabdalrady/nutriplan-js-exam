/**
 * NutriPlan - Main Entry Point
 *
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */

import {
  getCategories,
  searchMeal,
  getMealsByCategory,
  getAreas,
  getMealsByArea,
  getMealById,
  analyzeMeal,
  searchProducts,
  getProductByBarcode
} from "./API/mealdb.js";
import {
  createCategoryCard,
  createMealCard,
  createEmptyState,
  createAreaButtons,
  createMealDetails,
  createProgressBars,
  createLoggedItems,
  createWeeklyOverview,
  createWeeklyStats,
  createProductCard,
  createProductsEmptyState, createLoadingSpinner 
} from "./ui/components.js";

let navLinks = document.querySelectorAll(".nav-link");
let mealsSection = document.getElementById("search-filters-section");
let categoriesSection = document.getElementById("meal-categories-section");
let recipesSection = document.getElementById("all-recipes-section");
let mealDetailsSection = document.getElementById("meal-details");
let productsSection = document.getElementById("products-section");
let foodLogSection = document.getElementById("foodlog-section");
let categoriesGrid = document.getElementById("categories-grid");
let searchInput = document.getElementById("search-input");
let areasContainer = document.getElementById("areas-container");
let recipesGrid = document.getElementById("recipes-grid");
let backBtn = document.getElementById("back-to-meals-btn");
let currentMeal = null;
let currentNutrition = null;
let logMealBtn = document.getElementById("log-meal-btn");
let clearBtn = document.getElementById("clear-foodlog");
let loggedList = document.getElementById("logged-items-list");
let searchProductBtn = document.getElementById("search-product-btn");
let productSearchInput = document.getElementById("product-search-input");
let lookupBarcodeBtn = document.getElementById("lookup-barcode-btn");
let barcodeInput = document.getElementById("barcode-input");


if (mealDetailsSection) mealDetailsSection.style.display = "none";
if (productsSection) productsSection.style.display = "none";
if (foodLogSection) foodLogSection.style.display = "none";

navLinks.forEach((link, index) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    navLinks.forEach((l) => {
      l.classList.remove("bg-emerald-50", "text-emerald-700");
      l.classList.add("text-gray-600", "hover:bg-gray-50");
    });
    link.classList.add("bg-emerald-50", "text-emerald-700");
    link.classList.remove("text-gray-600", "hover:bg-gray-50");

    if (index === 0) {
      mealsSection.style.display = "";
      categoriesSection.style.display = "";
      recipesSection.style.display = "";
      if (mealDetailsSection) mealDetailsSection.style.display = "none";
      productsSection.style.display = "none";
      foodLogSection.style.display = "none";
    } else if (index === 1) {
      mealsSection.style.display = "none";
      categoriesSection.style.display = "none";
      recipesSection.style.display = "none";
      if (mealDetailsSection) mealDetailsSection.style.display = "none";
      productsSection.style.display = "";
      foodLogSection.style.display = "none";
    } else if (index === 2) {
      mealsSection.style.display = "none";
      categoriesSection.style.display = "none";
      recipesSection.style.display = "none";
      if (mealDetailsSection) mealDetailsSection.style.display = "none";
      productsSection.style.display = "none";
      foodLogSection.style.display = "";
      updateFoodLog();
    }
  });
});

function showMeals(meals, label = "") {
  let count = document.getElementById("recipes-count");

  if (meals.length > 0) {
    createMealCard(meals);
    count.innerHTML = `Showing ${meals.length} recipes ${label}`;
  } else {
    createEmptyState();
    count.innerHTML = "Showing 0 recipes";
  }
}

async function display() {
  try {
    let categories = await getCategories();
    createCategoryCard(categories);

    let areas = await getAreas();
    createAreaButtons(areas);

    let meals = await searchMeal("chicken");
    showMeals(meals);

    let recipesCount = document.getElementById("recipes-count");
    if (recipesCount) {
      recipesCount.innerHTML = `Showing ${meals.length} recipes`;
    }
  } catch (error) {
    console.log(error);
  } finally {
    let loadingOverlay = document.getElementById("app-loading-overlay");
    if (loadingOverlay) {
      loadingOverlay.style.display = "none";
    }
  }
}
display();

categoriesGrid.addEventListener("click", async function (e) {
  let card = e.target.closest(".category-card");

  if (card) {
    let selectedCategory = card.getAttribute("data-category");
    createLoadingSpinner("recipes-grid");
    let meals = await getMealsByCategory(selectedCategory);

    createMealCard(meals);

    document.getElementById("recipes-count").innerHTML =
      `Showing ${meals.length} recipes for ${selectedCategory}`;
  }
});

searchInput.addEventListener("input", async function () {
  let searchValue = searchInput.value;
  createLoadingSpinner("recipes-grid");
  let meals = await searchMeal(searchValue || "chicken");
  showMeals(meals, searchValue);
});

areasContainer.addEventListener("click", async function (e) {
  let btn = e.target.closest(".area-btn");

  if (btn) {
    let selectedArea = btn.getAttribute("data-area");

    let allBtns = document.querySelectorAll(".area-btn");
    for (let i = 0; i < allBtns.length; i++) {
      allBtns[i].classList.remove("bg-emerald-600", "text-white");
      allBtns[i].classList.add("bg-gray-100", "text-gray-700");
    }

    btn.classList.remove("bg-gray-100", "text-gray-700");
    btn.classList.add("bg-emerald-600", "text-white");

    createLoadingSpinner("recipes-grid");

    if (selectedArea === "") {
      let meals = await searchMeal("chicken");
      showMeals(meals);
    } else {
      let meals = await getMealsByArea(selectedArea);
      showMeals(meals, selectedArea);
    }
  }
});

recipesGrid.addEventListener("click", async function (e) {
  let card = e.target.closest(".recipe-card");

  if (card) {
    let mealId = card.getAttribute("data-meal-id");
    let meal = await getMealById(mealId);
    currentMeal = meal;
    currentNutrition = null;

    createMealDetails(meal);

    mealsSection.style.display = "none";
    categoriesSection.style.display = "none";
    recipesSection.style.display = "none";
    mealDetailsSection.style.display = "";

    let nutrition = await analyzeMeal(meal);
    currentNutrition = nutrition;

    document.getElementById("hero-servings").innerHTML =
      `${nutrition.servings} servings`;
    document.getElementById("hero-calories").innerHTML =
      `${nutrition.perServing.calories} cal/serving`;
  }
});

backBtn.addEventListener("click", function () {
  mealDetailsSection.style.display = "none";
  mealsSection.style.display = "";
  categoriesSection.style.display = "";
  recipesSection.style.display = "";
});

logMealBtn.addEventListener("click", async function () {
  let servingNutrition = currentNutrition.perServing;
  let servingsInput;

  let result = await Swal.fire({
    html: `
      <div class="text-left">
        <div class="flex items-center gap-4 mb-6">
          <img src="${currentMeal.thumbnail}" class="w-16 h-16 rounded-xl object-cover" />
          <div>
          <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
          <p class="text-gray-500 text-sm">${currentMeal.name}</p>
          </div>
        </div>

        <p class="text-sm font-semibold text-gray-700 mb-2">Number of Servings</p>
        <div class="flex items-center gap-3 mb-6">
          <button id="minus-btn" type="button" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
          <i class="fa-solid fa-minus text-gray-600"></i>
          </button>
          <input id="servings-input" type="number" min="0.5" step="0.5" value="1"
                 class="w-20 text-center text-xl font-bold border-2 border-gray-200 rounded-lg py-2" />
          <button id="plus-btn" type="button" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
          <i class="fa-solid fa-plus text-gray-600"></i>
          </button>
        </div>

        <div class="bg-emerald-50 rounded-xl p-4 mb-6">
          <p class="text-sm text-gray-600 mb-2">Estimated nutrition per serving:</p>
          <div class="grid grid-cols-4 text-center">
            <div><p id="modal-calories" class="text-lg font-bold text-emerald-600">${servingNutrition.calories}</p><p class="text-xs text-gray-500">Calories</p></div>
            <div><p id="modal-protein" class="text-lg font-bold text-blue-600">${servingNutrition.protein}g</p><p class="text-xs text-gray-500">Protein</p></div>
            <div><p id="modal-carbs" class="text-lg font-bold text-amber-600">${servingNutrition.carbs}g</p><p class="text-xs text-gray-500">Carbs</p></div>
            <div><p id="modal-fat" class="text-lg font-bold text-purple-600">${servingNutrition.fat}g</p><p class="text-xs text-gray-500">Fat</p></div>
          </div>
        </div>
      </div>`,
    showCancelButton: true,
    confirmButtonText:
      '<i class="fa-solid fa-clipboard-list mr-2"></i>Log Meal',
    cancelButtonText: "Cancel",
    buttonsStyling: false,
    customClass: {
      popup: "rounded-xl p-6",
      actions: "w-full gap-3 mt-6",
      confirmButton:
        "flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all",
      cancelButton:
        "flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all",
    },

    didOpen: function () {
      servingsInput = document.getElementById("servings-input");

      function updateNumbers() {
        let servingsCount = Number(servingsInput.value);
        document.getElementById("modal-calories").textContent = Number(
          (servingNutrition.calories * servingsCount).toFixed(0),
        );
        document.getElementById("modal-protein").innerHTML =
          Number((servingNutrition.protein * servingsCount).toFixed(0)) + "g";
        document.getElementById("modal-carbs").innerHTML =
          Number((servingNutrition.carbs * servingsCount).toFixed(0)) + "g";
        document.getElementById("modal-fat").innerHTML =
          Number((servingNutrition.fat * servingsCount).toFixed(0)) + "g";
      }

      document
        .getElementById("plus-btn")
        .addEventListener("click", function () {
          servingsInput.value = Number(servingsInput.value) + 0.5;
          updateNumbers();
        });

      document
        .getElementById("minus-btn")
        .addEventListener("click", function () {
          if (Number(servingsInput.value) > 0.5) {
            servingsInput.value = Number(servingsInput.value) - 0.5;
            updateNumbers();
          }
        });

      servingsInput.addEventListener("input", updateNumbers);
    },

    preConfirm: function () {
      return Number(servingsInput.value);
    },
  });

  if (result.isConfirmed) {
    let servings = result.value;

    let item = {
      id: currentMeal.id,
      name: currentMeal.name,
      image: currentMeal.thumbnail,
      servings: servings,
      calories: Number((servingNutrition.calories * servings).toFixed(0)),
      protein: Number((servingNutrition.protein * servings).toFixed(0)),
      carbs: Number((servingNutrition.carbs * servings).toFixed(0)),
      fat: Number((servingNutrition.fat * servings).toFixed(0)),
      type: "meal",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    let saved = localStorage.getItem("foodLog");
    let log = saved ? JSON.parse(saved) : [];
    log.push(item);
    localStorage.setItem("foodLog", JSON.stringify(log));
    updateFoodLog();

    Swal.fire({
      icon: "success",
      title: "Meal Logged!",
      html: `${item.name} (${servings} serving) has been added to your daily log.<br><b style="color:#16a34a">+${item.calories} calories</b>`,
    });
  }
});

function updateFoodLog() {
  document.getElementById("foodlog-date").innerHTML =
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

  let saved = localStorage.getItem("foodLog");
  let log = saved ? JSON.parse(saved) : [];
  let today = new Date().toISOString().split("T")[0];

  let todayItems = [];
  let totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };

  for (let i = 0; i < log.length; i++) {
    if (log[i].date === today) {
      log[i].index = i;
      todayItems.push(log[i]);

      totals.calories += log[i].calories;
      totals.protein += log[i].protein;
      totals.carbs += log[i].carbs;
      totals.fat += log[i].fat;
    }
  }

  createProgressBars(totals);
  createLoggedItems(todayItems);
  updateWeekly();
}

updateFoodLog();

clearBtn.addEventListener("click", function () {
  localStorage.removeItem("foodLog");
  updateFoodLog();
});

loggedList.addEventListener("click", function (e) {
  let btn = e.target.closest(".delete-item-btn");

  if (btn) {
    let index = Number(btn.getAttribute("data-index"));

    let log = JSON.parse(localStorage.getItem("foodLog"));
    log.splice(index, 1);
    localStorage.setItem("foodLog", JSON.stringify(log));

    updateFoodLog();
  }
});

function updateWeekly() {
  let saved = localStorage.getItem("foodLog");
  let log;
  if (saved) {
    log = JSON.parse(saved);
  } else {
    log = [];
  }

  let now = new Date();
  let weekDay = now.getDay();

  let daysFromMonday;
  if (weekDay === 0) {
    daysFromMonday = 6;
  } else {
    daysFromMonday = weekDay - 1;
  }

  let dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let days = [];
  let weekCalories = 0;
  let weekItems = 0;
  let daysOnGoal = 0;

  for (let i = 0; i < 7; i++) {
    let day = new Date();
    day.setHours(12, 0, 0, 0);
    day.setDate(now.getDate() - daysFromMonday + i);
    let dayText = day.toISOString().split("T")[0];

    let dayCalories = 0;
    let dayItems = 0;

    for (let j = 0; j < log.length; j++) {
      if (log[j].date === dayText) {
        dayCalories += log[j].calories;
        dayItems += 1;
      }
    }

    weekCalories += dayCalories;
    weekItems += dayItems;

    if (dayCalories > 0 && dayCalories <= 2000) {
      daysOnGoal += 1;
    }

    days.push({
      name: dayNames[i],
      number: day.getDate(),
      calories: dayCalories,
      items: dayItems,
      isToday: i === daysFromMonday,
    });
  }

  let average = Number((weekCalories / 7).toFixed(0));

  createWeeklyOverview(days);
  createWeeklyStats(average, weekItems, daysOnGoal);
}

function showProducts(products) {
  let count = document.getElementById("products-count");

  if (products.length > 0) {
    createProductCard(products);
    count.innerHTML = `Showing ${products.length} products`;
  } else {
    createProductsEmptyState();
    count.innerHTML = "No products found";
    console.log(products[0]);
  }
}

searchProductBtn.addEventListener("click", async function () {
  let name = productSearchInput.value.trim();

  if (name.length > 0) {
    createLoadingSpinner("recipes-grid");
    let products = await searchProducts(name);
    showProducts(products);
  }
});


lookupBarcodeBtn.addEventListener("click", async function () {
  let code = barcodeInput.value.trim();

  if (code.length > 0) {
    createLoadingSpinner("recipes-grid");
    let product = await getProductByBarcode(code);

    if (product.name) {
      showProducts([product]);
    } else {
      showProducts([]);
    }
  }
});