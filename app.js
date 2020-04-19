const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_mealEl = document.getElementById('single-meal')

// Search Meal fetch API
searchMeal = (e) => {
    e.preventDefault()

    // clear single meal 
    single_mealEl.innerHTML = ''

    // get search term 
    const term = search.value

   
   
    // check for empty
    if(term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then( response => response.json())
            .then(data => {
                console.log(data)
                resultHeading.innerHTML =  `<h2>Search result for '${term}' </h2>`

                if(data.meals === null){
                    resultHeading.innerHTML = `<p> There are no search results for ${term}. Please try again.</p>`
                } else {
                    mealsEl.innerHTML= data.meals.map(meal => ` <div class='meal'> <img src="${meal.strMealThumb}" alt = "${meal.strMeal}"/>

                    <div class="meal-info" data-mealId="${meal.isMeal}">
                   <h3>${meal.strMeal}</h3>
                    </div>
                    </div>
                    `)
                    .join('')
                }
            })

            // Clear search
            search.value = ''
    } else {
        alert('Please enter a search term')
    }
}
 // Event Listeners 
    submit.addEventListener('submit',searchMeal)