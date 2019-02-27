//Controller
import Search from './models/search';
import Recipe from './models/Recipe';
import {elements,renderLoader,clearLoader} from './views/base';
import * as searchView from './views/searchView';

const state = {};

/*
	Search Controller
*/
const controlSearch = async () => {
	//1) Get query from view
	const query = searchView.getInput();

	if(query){
		//2)New search object and add to state
		state.search = new Search(query);

		//3)Prepare UI for results
		searchView.clearInput();
		searchView.clearRecipeList();
		renderLoader(elements.searchRes);
		
		try{
			//4)Search for recipes
			await state.search.getResult();

			//5)Render results on UI
			clearLoader();
			searchView.renderResults(state.search.recipes);
		}catch(err){
			alert(err);
			clearLoader();
		}
	}
}

elements.searchForm.addEventListener('submit',e => {
	e.preventDefault();
	controlSearch();
})

//using event delegation for pages button
elements.searchResPages.addEventListener('click', e => {
	const btn = e.target.closest('.btn-inline') //closest method 
	if(btn){
		const goToPage = parseInt(btn.dataset.goto,10); //base ten
		searchView.clearRecipeList();
		searchView.renderResults(state.search.recipes,goToPage);
	}
})

/**
*RECIPE CONTROLLER
*/
//'hashchange events detect change in #id in url'

const controlRecipe = async () => {
	//Get Id from Url
	const id = window.location.hash.replace('#',''); //check hash value and then apply replace method on string
	if(id){
		//Prepare Ui for Changes

		//Create new recipe object
		state.recipe =  new Recipe(id);
		try{
			//Get Recipe Data
			await state.recipe.getRecipe();

			//Calculate servings and time
			state.recipe.calcTime();
			state.recipe.calcServings();

			//Rencder Recipe
			state.recipe.parseIngredients()

		} catch(err){
			alert(err);
		}
	}
}

// window.addEventListener('hashchange',controlRecipe);//when hash changes
// window.addEventListener('load',controlRecipe); //So that on refresh data is there because no hash changes occur
['hashchange','load'].forEach(event => addEventListener(event , controlRecipe));
