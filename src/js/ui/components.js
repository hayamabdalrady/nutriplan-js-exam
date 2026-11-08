
export function createLoadingSpinner(elementId) {
  document.getElementById(elementId).innerHTML = `
    <style>
      @keyframes nutri-spin {
        to { transform: rotate(360deg); }
      }
    </style>

    <div style="grid-column: 1 / -1; display: flex; justify-content: center; padding: 48px 0;">
      <div style="width: 48px; height: 48px; border-radius: 50%; border: 4px solid #d1fae5; border-top-color: #059669; animation: nutri-spin 1s linear infinite;"></div>
    </div>`;
}

let categoryStyles = {
  Beef: {
    icon: "fa-drumstick-bite",
    iconBackground: "from-red-400 to-rose-500",
    card: "from-red-50 to-rose-50 border-red-200 hover:border-red-400",
  },
  Chicken: {
    icon: "fa-drumstick-bite",
    iconBackground: "from-amber-400 to-orange-500",
    card: "from-amber-50 to-orange-50 border-amber-200 hover:border-amber-400",
  },
  Dessert: {
    icon: "fa-cake-candles",
    iconBackground: "from-pink-400 to-rose-500",
    card: "from-pink-50 to-rose-50 border-pink-200 hover:border-pink-400",
  },
  Lamb: {
    icon: "fa-drumstick-bite",
    iconBackground: "from-amber-400 to-orange-500",
    card: "from-amber-50 to-orange-50 border-amber-200 hover:border-amber-400",
  },
  Miscellaneous: {
    icon: "fa-bowl-rice",
    iconBackground: "from-slate-400 to-gray-500",
    card: "from-slate-50 to-gray-50 border-slate-200 hover:border-slate-400",
  },
  Pasta: {
    icon: "fa-bowl-food",
    iconBackground: "from-amber-400 to-orange-500",
    card: "from-yellow-50 to-amber-50 border-yellow-200 hover:border-yellow-400",
  },
  Pork: {
    icon: "fa-bacon",
    iconBackground: "from-red-400 to-rose-500",
    card: "from-red-50 to-rose-50 border-red-200 hover:border-red-400",
  },
  Seafood: {
    icon: "fa-fish",
    iconBackground: "from-cyan-400 to-blue-500",
    card: "from-cyan-50 to-blue-50 border-cyan-200 hover:border-cyan-400",
  },
  Side: {
    icon: "fa-plate-wheat",
    iconBackground: "from-green-400 to-emerald-500",
    card: "from-green-50 to-emerald-50 border-green-200 hover:border-green-400",
  },
  Starter: {
    icon: "fa-utensils",
    iconBackground: "from-teal-400 to-cyan-500",
    card: "from-teal-50 to-cyan-50 border-teal-200 hover:border-teal-400",
  },
  Vegan: {
    icon: "fa-leaf",
    iconBackground: "from-emerald-400 to-green-500",
    card: "from-emerald-50 to-green-50 border-emerald-200 hover:border-emerald-400",
  },
  Vegetarian: {
    icon: "fa-seedling",
    iconBackground: "from-lime-400 to-green-500",
    card: "from-lime-50 to-green-50 border-lime-200 hover:border-lime-400",
  },
};

export function createCategoryCard(categories) {
  let temp = "";
  for (let i = 0; i < 12; i++) {
    let style = categoryStyles[categories[i].name];
    temp += ` <div
              class="category-card bg-gradient-to-br ${style.card} rounded-xl p-3 border hover:shadow-md cursor-pointer transition-all group"
              data-category="${categories[i].name}"
            >
              <div class="flex items-center gap-2.5">
                <div
                  class="text-white w-9 h-9 bg-gradient-to-br ${style.iconBackground} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                >
                  <i class="fa-solid ${style.icon}"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900">${categories[i].name}</h3>
                </div>
              </div>
            </div>`;
  }
  document.getElementById("categories-grid").innerHTML = temp;
}

export function createMealCard(meals) {
  let temp = "";
  for (let i = 0; i < meals.length; i++) {
    temp += ` <div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${meals[i].id}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src= "${meals[i].thumbnail}"
                  alt="${meals[i].name}"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    <i class="fa-solid fa-tag text-emerald-600"></i>
                     ${meals[i].category}
                  </span>
                  <span
                    class="px-2 py-1 bg-white/90 text-xs font-semibold rounded-full text-gray-700"
                  >
                  <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${meals[i].area || "International"}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${meals[i].name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${meals[i].instructions[0] || ""}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${meals[i].category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${meals[i].area || "International"}
                  </span>
                </div>
              </div>
            </div>`;
  }
  document.getElementById("recipes-grid").innerHTML = temp;
}

export function createEmptyState(message = "No recipes found") {
  document.getElementById("recipes-grid").innerHTML = `
    <div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No recipes found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>`;
}

export function createAreaButtons(areas) {
  let temp = `
    <button
              class="area-btn px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap hover:bg-emerald-700 transition-all"
              data-area=""
            >
              All Cuisines
            </button>`;

  for (let i = 0; i < 10; i++) {
    temp += `
    <button
              class="area-btn px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
              data-area="${areas[i].name}"
              >
              ${areas[i].name}
            </button>`;
  }

  document.getElementById("areas-container").innerHTML = temp;
}

export function createMealDetails(meal) {
  document.getElementById("detail-image").src = meal.thumbnail;
  document.getElementById("detail-name").innerHTML = meal.name;

  document.getElementById("detail-tags").innerHTML = `
    <span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">${meal.category}</span>
    <span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">${meal.area || "International"}</span>
  `;

  let ingredientsHtml = "";
  for (let i = 0; i < meal.ingredients.length; i++) {
    ingredientsHtml += `
      <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
        <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
        <span class="text-gray-700">
          <span class="font-medium text-gray-900">${meal.ingredients[i].measure}</span>
          ${meal.ingredients[i].ingredient}
        </span>
      </div>`;
  }
  document.getElementById("detail-ingredients").innerHTML = ingredientsHtml;
  document.getElementById("detail-ingredients-count").innerHTML =
    meal.ingredients.length + " items";

  let stepsHtml = "";
  for (let i = 0; i < meal.instructions.length; i++) {
    stepsHtml += `
      <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
        <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">${i + 1}</div>
        <p class="text-gray-700 leading-relaxed pt-2">${meal.instructions[i]}</p>
      </div>`;
  }
  document.getElementById("detail-instructions").innerHTML = stepsHtml;

  if (meal.youtube) {
    let videoId = meal.youtube.split("v=")[1];
    document.getElementById("detail-video").src =
      "https://www.youtube.com/embed/" + videoId;
  }
}

export function createProgressBars(totals) {
  let caloriesPercent = (totals.calories / 2000) * 100;
  let caloriesBar = document.getElementById("calories-bar");
  if (caloriesPercent > 100) {
    caloriesBar.style.backgroundColor = "#ef4444";
    caloriesPercent = 100;
  } else {
    caloriesBar.style.backgroundColor = "#10b981";
  }
  document.getElementById("calories-text").innerHTML =
    totals.calories + " / 2000 kcal";
  document.getElementById("calories-bar").style.width = caloriesPercent + "%";

  let proteinPercent = (totals.protein / 50) * 100;
  let proteinBar = document.getElementById("protein-bar");
  if (proteinPercent > 100) {
    proteinBar.style.backgroundColor = "#ef4444";
    proteinPercent = 100;
  } else {
    proteinBar.style.backgroundColor = "#3b82f6";
  }
  document.getElementById("protein-text").innerHTML =
    totals.protein + " / 50 g";
  document.getElementById("protein-bar").style.width = proteinPercent + "%";

  let carbsPercent = (totals.carbs / 250) * 100;
  let carbsBar = document.getElementById("carbs-bar");
  if (carbsPercent > 100) {
    carbsBar.style.backgroundColor = "#ef4444";
    carbsPercent = 100;
  } else {
    carbsBar.style.backgroundColor = "#f59e0b";
  }
  document.getElementById("carbs-text").innerHTML = totals.carbs + " / 250 g";
  document.getElementById("carbs-bar").style.width = carbsPercent + "%";

  let fatPercent = (totals.fat / 65) * 100;
  let fatBar = document.getElementById("fat-bar");
  if (fatPercent > 100) {
    fatBar.style.backgroundColor = "#ef4444";
    fatPercent = 100;
  } else {
    fatBar.style.backgroundColor = "#a855f7";
  }
  document.getElementById("fat-text").innerHTML = totals.fat + " / 65 g";
  document.getElementById("fat-bar").style.width = fatPercent + "%";
}

export function createLoggedItems(items) {
  let list = document.getElementById("logged-items-list");
  let clearBtn = document.getElementById("clear-foodlog");

  document.getElementById("logged-count").innerHTML =
    `Logged Items (${items.length})`;
  if (items.length === 0) {
    list.innerHTML = `
      <div class="text-center py-8 text-gray-500">
        <i class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"></i>
        <p class="font-medium">No meals logged today</p>
        <p class="text-sm">Add meals from the Meals page or scan products</p>
      </div>`;
    clearBtn.style.display = "none";
    return;
  }

  let cards = "";
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    cards += `
      <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
        <img src="${item.image}" alt="${item.name}" class="w-14 h-14 rounded-lg object-cover" />
        <div class="flex-1">
          <p class="font-semibold text-gray-900">${item.name}</p>
          <p class="text-xs text-gray-500">${item.servings} servings · ${item.time}</p>
        </div>
        <div class="text-right">
          <p class="font-bold text-emerald-600">${item.calories} kcal</p>
          <p class="text-xs text-gray-500">${item.protein}g P · ${item.carbs}g C · ${item.fat}g F</p>
        </div>
        <button class="delete-item-btn text-gray-400 hover:text-red-500" data-index="${item.index}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>`;
  }

  list.innerHTML = cards;
  clearBtn.style.display = "";
}

export function createWeeklyOverview(days) {
  let temp = "";

  for (let i = 0; i < days.length; i++) {
    let day = days[i];

    let tileStyle = "";
    if (day.isToday) {
      tileStyle = "background:#e0e7ff;";
    }

    let caloriesColor = "#d1d5db";
    if (day.calories > 0) {
      caloriesColor = "#059669";
    }

    let itemsText = "";
    if (day.items > 0) {
      itemsText = `<p class="text-xs text-gray-500">${day.items} items</p>`;
    }

    temp += `
      <div class="text-center p-3 rounded-xl" style="${tileStyle}">
        <p class="text-xs text-gray-500">${day.name}</p>
        <p class="font-semibold text-gray-900 mb-2">${day.number}</p>
        <p class="text-xl font-bold" style="color:${caloriesColor}">${day.calories}</p>
        <p class="text-xs text-gray-400">kcal</p>
        ${itemsText}
      </div>`;
  }

  document.getElementById("weekly-days").innerHTML = temp;
}

export function createWeeklyStats(average, totalItems, daysOnGoal) {
  document.getElementById("weekly-average").innerHTML = average + " kcal";
  document.getElementById("weekly-items").innerHTML = totalItems + " items";
  document.getElementById("days-on-goal").innerHTML = daysOnGoal + " / 7";
}

function getNumber(value) {
  let result;

  if (value === undefined || value === null) {
    result = 0;
  } else {
    result = value;
  }

  return result;
}

export function createProductCard(products) {
  let temp = "";

  for (let i = 0; i < products.length; i++) {
    let product = products[i];

    let nutrients = product.nutrients || {};
    let brand = product.brand || "";
    let grade = product.nutritionGrade || "?";

    let calories = Number(nutrients.calories || 0).toFixed(0);
    let protein = Number(nutrients.protein || 0).toFixed(0);
    let carbs = Number(nutrients.carbs || 0).toFixed(0);
    let fat = Number(nutrients.fat || 0).toFixed(0);
    let sugar = Number(nutrients.sugar || 0).toFixed(0);

    temp += `
      <div class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group" data-barcode="${product.barcode}">
        <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" src="${product.image}" alt="${product.name}" loading="lazy" />
          <div class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
            Nutri-Score ${grade}
          </div>
        </div>

        <div class="p-4">
          <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">${brand}</p>
          <h3 class="font-bold text-gray-900 mb-2 line-clamp-2">${product.name}</h3>

          <p class="text-xs text-gray-500 mb-3">
            <i class="fa-solid fa-fire mr-1"></i>${calories} kcal/100g
          </p>

          <div class="grid grid-cols-4 gap-1 text-center">
            <div class="bg-emerald-50 rounded p-1.5">
              <p class="text-xs font-bold text-emerald-700">${protein}g</p>
              <p class="text-[10px] text-gray-500">Protein</p>
            </div>
            <div class="bg-blue-50 rounded p-1.5">
              <p class="text-xs font-bold text-blue-700">${carbs}g</p>
              <p class="text-[10px] text-gray-500">Carbs</p>
            </div>
            <div class="bg-purple-50 rounded p-1.5">
              <p class="text-xs font-bold text-purple-700">${fat}g</p>
              <p class="text-[10px] text-gray-500">Fat</p>
            </div>
            <div class="bg-orange-50 rounded p-1.5">
              <p class="text-xs font-bold text-orange-700">${sugar}g</p>
              <p class="text-[10px] text-gray-500">Sugar</p>
            </div>
          </div>
        </div>
      </div>`;
  }

  document.getElementById("products-grid").innerHTML = temp;
}

export function createProductsEmptyState() {
  document.getElementById("products-grid").innerHTML = `
    <div class="col-span-full text-center py-16">
      <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
        <i class="fa-solid fa-box-open text-3xl text-gray-300"></i>
      </div>
      <p class="font-semibold text-lg text-gray-700">No products found</p>
      <p class="text-sm text-gray-500 mt-1">Try a different name or barcode</p>
    </div>`;
}
