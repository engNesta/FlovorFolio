require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const recipeRoutes = express.Router();
const recipeController = require('./controllers/recipeController');
const Recipe = require('./models/recipeModel');
const cors = require('cors');



const app = express();
app.use(express.json()); // for parsing application/json

recipeRoutes.get('/api/recipes', recipeController.getAllRecipes);
recipeRoutes.get('/api/recipes/:title', recipeController.getRecipeByTitle);
recipeRoutes.post('/api/recipes', recipeController.createRecipe);
recipeRoutes.put('/api/recipes/:id', recipeController.updateRecipe);
recipeRoutes.delete('/api/recipes/:id', recipeController.deleteRecipe);



app.use('/', recipeRoutes);
app.use(cors());


app.use(express.static('public'));

app.get('/favicon.ico', (req, res) => res.status(204)); // Respond with 204 No Content

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
  



const port = process.env.PORT || 5000;



// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(port, () => console.log(`Server running on port: ${port}`)))
    .catch((error) => console.log(error.message));



    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });
    
    