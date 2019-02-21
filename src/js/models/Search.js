//Model

import axios from 'axios';

export default class Search {
	constructor(query){
		this.query = query;
	}
	async getRecipe(){
		const key = '4729350a62ceb252a9bf28b293d69f52';
		try{
			const result = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
			this.recipes = result.data.recipes;
		}
		catch(error){
			alert(error);
		}
	}
}