//Model

import axios from 'axios';
import {key} from '../config';

export default class Search {
	constructor(query){
		this.query = query;
	}
	async getResult(){
		try{
			const result = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
			this.recipes = result.data.recipes;
		}
		catch(error){
			alert(error);
		}
	}
}