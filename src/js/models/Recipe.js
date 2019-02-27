import axios from 'axios';
import {key} from '../config';

export default class Recipe {
	constructor(id){
		this.id = id;
	}

	async getRecipe(){
		try{
			const result = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
			this.title =  result.data.recipe.title;
			this.author = result.data.recipe.publisher;
			this.img = result.data.recipe.image_url;
			this.url = result.data.recipe.source_url;
			this.ingredients = result.data.recipe.ingredients;
		}
		catch(error){
			alert(error);
		}
	}

	calcTime(){
		//Assuming that we need 15 min for each 3 ingredients
		const numIng = this.ingredients.length;
		const period = Math.ceil(numIng/3);
		this.time = period * 15;
	}

	calcServings(){
		this.servings = 4;
	}

	parseIngredients(){
		const unitLong = ['tablespoons','tablespoon','ounce','ounces','teaspoons','cups','pounds'];
		const unitShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];

		const newIngredients = this.ingredients.map( e => {
			//1)Uniform Units			
			let ingredient = e.toLowerCase();
			//finding that long unit and replacing with short unit in ingredients
			unitLong.forEach((el,i) => {
				ingredient.replace(el,unitShort[i]);
			})

			//2)Remove Parenthesis
			ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
			//3)Parse ingredients into count, unit and ingredient

			return ingredient 
		})

		this.ingredient = newIngredients;
	}
}