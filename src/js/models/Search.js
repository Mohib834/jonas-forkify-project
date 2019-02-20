import axios from 'axios';

export default class Search {
	constructor(query){
		this.query = query
	}
	getRecipe(){
	const key = '4729350a62ceb252a9bf28b293d69f52';	
	axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
	.then(result => console.log(result.data.recipes))
	.catch(error => alert(error))
	}
}

