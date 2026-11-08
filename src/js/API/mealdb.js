export async function getCategories() {
  let req = await fetch(
    "https://nutriplan-api.vercel.app/api/meals/categories",
  );
  let data = await req.json();
  return data.results ;
}

export async function searchMeal(meal) {
  let req = await fetch(
    "https://nutriplan-api.vercel.app/api/meals/search?q=" +
      meal +
      "&page=1&limit=25",
  );
  let data = await req.json();
  return data.results ;
}

export async function getMealsByCategory(category) {
  let req = await fetch(
    "https://nutriplan-api.vercel.app/api/meals/filter?category=" +
      category +
      "&page=1&limit=25",
  );
  let data = await req.json();
  return data.results ;
}

export async function getAreas() {
  let req = await fetch("https://nutriplan-api.vercel.app/api/meals/areas");
  let data = await req.json();
  return data.results ;
}

export async function getMealsByArea(area) {
  let req = await fetch('https://nutriplan-api.vercel.app/api/meals/filter?area=' + area + '&page=1&limit=25');
  let data = await req.json();
  return data.results ;
}

export async function getMealById(id) {
  let req = await fetch("https://nutriplan-api.vercel.app/api/meals/" + id);
  let data = await req.json();
  return data.result;
}

export async function analyzeMeal(meal) {
  let ingredientsList = [];

  for (let i = 0; i < meal.ingredients.length; i++) {
    let item = meal.ingredients[i];
    ingredientsList.push(item.measure + " " + item.ingredient);
  }

  let req = await fetch("https://nutriplan-api.vercel.app/api/nutrition/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "cC9dWqR7HfnkTDpcpjFNjcQdjNWB7mhRmGFdJfbd",
    },
    body: JSON.stringify({
      recipeName: meal.name,
      ingredients: ingredientsList,
    }),
  });

  let data = await req.json();
  return data.data;
}

export async function searchProducts(name) {
  let req = await fetch('https://nutriplan-api.vercel.app/api/products/search?q=' + name + '&page=1&limit=24');
  let data = await req.json();
  return data.results;
}

export async function getProductByBarcode(code) {
  let req = await fetch("https://nutriplan-api.vercel.app/api/products/barcode/" + code);
  let data = await req.json();
  return data.result;
}
