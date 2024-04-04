function fetchRecipes() {
    fetch('/api/recipes')
        .then(response => response.json())
        .then(recipes => displayRecipes(recipes))
        .catch(error => console.error('Error fetching recipes:', error));
}


function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = ''; // Clear existing recipes

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.innerHTML = `
            <h3>${recipe.title}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients ? recipe.ingredients.join(', ') : 'No ingredients listed'}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions || 'No instructions provided'}</p>
            <p><strong>Cooking Time:</strong> ${recipe.cookingTime || 'Not specified'} minutes</p>
            <button onclick="deleteRecipe('${recipe._id}')">Delete</button>
            <button onclick="editRecipe('${recipe._id}')">Edit</button>
        `;
        recipeList.appendChild(recipeElement);
    });
}


function deleteRecipe(id) {
    if (confirm('Are you sure you want to delete this recipe?')) {
        fetch(`/api/recipes/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(() => fetchRecipes())
            .catch(error => console.error('Error deleting recipe:', error));
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display recipes when the page loads
    fetchRecipes();

    // Add a new recipe
    const addForm = document.getElementById('add-form');
    if (addForm) {
        addForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const newRecipe = {
                title: document.getElementById('add-title').value,
                ingredients: document.getElementById('add-ingredients').value.split(','),
                instructions: document.getElementById('add-instructions').value,
                cookingTime: parseInt(document.getElementById('add-cookingTime').value, 10),
            };

            fetch('/api/recipes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRecipe),
            })
            .then(response => {
                if (response.ok) {
                    fetchRecipes();
                } else {
                    console.error('Failed to add a new recipe');
                }
            })
            .catch(error => console.error('Error adding new recipe:', error));
        });
    }

    // Handle recipe editing logic here...
});
