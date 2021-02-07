const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");


//-- Event Listener handler --//
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
    mealDetailsContent.parentElement.classList.remove("showRecipe");
});


// --- Find all meals by first letter ---//
function getMealList() {
    let searchInputTxt = document.getElementById("search-input").value;

    fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInputTxt}`
        )
        .then((response) => response.json())
        .then((data) => {
            let html = "";

            if (data.meals) {
                data.meals.forEach((meal) => {
                    html += `
    
                    <div class="meal-item" data-id = "${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>
                        <div class="meal-name" style="background:white;">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
                });
                mealList.classList.remove("notFound");
            } else {
                html = "Sorry,We didn't find any meal!";
                mealList.classList.add("notFound");
            }
            mealList.innerHTML = html;
        });
}




//--For Creating recipe of the meal--//
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains("recipe-btn")) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
            )
            .then((response) => response.json())
            .then((data) => mealRecipeModal(data.meals));
    }
}

// .--meal details --//
function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
                    <div class="recipe-meal-img">
                            <img src="${meal.strMealThumb}" alt="food">
                     </div>
                    <h2 class="recipe-title">${meal.strMeal}</h2>
                    <p class="recipe-category">1.Origin :${meal.strArea}</p> \n
                    <p class="recipe-category">2.Type : ${meal.strCategory}</p>
                    
                    <div class="recipe-instruct" style="text-align:center; color:goldenrod">
                    <h1 style="text-align:center;color:black" >Ingredients:</h1>
                    <hr style = "color:black"><hr style = "color:black">
                    <p>1.${meal.strIngredient1}</p>
                    <p>2.${meal.strIngredient2}</p>
                    <p>3.${meal.strIngredient3}</p>
                    <p>4.${meal.strIngredient4}</p>
                    <p>5.${meal.strIngredient5}</p>
                    </div>
    
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add("showRecipe");
}