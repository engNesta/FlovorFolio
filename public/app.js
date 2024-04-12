function fetchRecipes() {
    fetch('/api/recipes')
        .then(response => response.json())
        .then(recipes => displayRecipes(recipes))
        .catch(error => console.error('Error fetching recipes:', error));
}

function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = ''; 

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.innerHTML = `
            <h3>${escapeHtml(recipe.title)}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients ? escapeHtml(recipe.ingredients.join(', ')) : 'No ingredients listed'}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions ? escapeHtml(recipe.instructions) : 'No instructions provided'}</p>
            <p><strong>Cooking Time:</strong> ${recipe.cookingTime || 'Not specified'} minutes</p>
            <button onclick="deleteRecipe('${recipe._id}')">Delete</button>
            <button onclick="editRecipeForm('${recipe._id}', '${escapeHtml(recipe.title)}', '${escapeHtml(recipe.ingredients.join(','))}', '${escapeHtml(recipe.instructions)}', ${recipe.cookingTime})">Edit</button>
        `;
        recipeList.appendChild(recipeElement);
    });
}

function editRecipeForm(id, title, ingredients, instructions, cookingTime) {
    document.getElementById('edit-id').value = id;
    document.getElementById('edit-title').value = title;
    document.getElementById('edit-ingredients').value = ingredients;
    document.getElementById('edit-instructions').value = instructions;
    document.getElementById('edit-cookingTime').value = cookingTime;

    document.getElementById('edit-form').style.display = 'block'; 
}

function editRecipe(id) {
    const updatedRecipe = {
        title: document.getElementById('edit-title').value,
        ingredients: document.getElementById('edit-ingredients').value.split(',').map(ingredient => ingredient.trim()),
        instructions: document.getElementById('edit-instructions').value,
        cookingTime: parseInt(document.getElementById('edit-cookingTime').value, 10),
    };

    fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecipe),
    })
    .then(response => {
        if (response.ok) {
            fetchRecipes(); 
            document.getElementById('edit-form').style.display = 'none'; 
        } else {
            throw new Error('Failed to update the recipe');
        }
    })
    .catch(error => console.error('Error updating recipe:', error));
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
    fetchRecipes();

    const addForm = document.getElementById('add-form');
    if (addForm) {
        addForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const newRecipe = {
                title: document.getElementById('add-title').value,
                ingredients: document.getElementById('add-ingredients').value.split(',').map(ingredient => ingredient.trim()),
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

    document.getElementById('edit-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const id = document.getElementById('edit-id').value; 
        editRecipe(id); 
    });
});

function escapeHtml(text) {
    return text
        .toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
