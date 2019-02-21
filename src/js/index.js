//Controller
import Search from './models/search';
import {elements} from './views/base';
import * as searchView from './views/searchView';

const state = {};

const controlSearch = async () => {
	//1) Get query from view
	const query = searchView.getInput();

	if(query){
		//2)New search object and add to state
		state.search = new Search(query);

		//3)Prepare UI for results
		searchView.clearInput();
		searchView.clearRecipeList();
		//4)Search for recipes
		await state.search.getRecipe();

		//5)Render results on UI
		searchView.renderResults(state.search.recipes);
	}
}

elements.searchForm.addEventListener('submit',e => {
	e.preventDefault();
	controlSearch();
})

