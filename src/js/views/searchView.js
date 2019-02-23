//View

import {elements} from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
	elements.searchInput.value = '';
}
export const clearRecipeList = () => {
	elements.searchResList.innerHTML = '';
	elements.searchResPages.innerHTML = '';

}

//Will work on this algorithm later
const limitRecipeTitle = (title, limit = 17) => {
}
//=====

const renderRecipe = recipe => {
	const markup = `
		<li>
            <a class="results__link" href="#${recipe.recipe_id}">
	            <figure class="results__fig">
					<img src="${recipe.image_url}" alt="${recipe.title}">
				</figure>
	            <div class="results__data">
					<h4 class="results__name">${recipe.title}</h4>
	            	<p class="results__author">${recipe.publisher}</p>
	            </div>
	        </a>
        </li>
	`;
	elements.searchResList.insertAdjacentHTML('beforeend',markup);
}

const createBtn = (page,type) => `

	<button class="btn-inline results__btn--${type}" data-goto="${type === 'prev'? page-1:page+1}">
		<span>Page ${type === 'prev'? page - 1 : page + 1}</span>
		<svg class="search__icon">
			<use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
	</button>
`;

const renderButton = (page,numResults,resPerPage) => {
	const pages = Math.ceil(numResults / resPerPage);
	let btn;

	if(page === 1 && pages > 1){
		//only button to go next page
		btn = createBtn(page,'next');
	}else if(page < pages){
		//both button
		btn = `${createBtn(page,'prev')}
			   ${createBtn(page,'next')}
			   `;
	}else if(page === pages && pages > 1){
		//only button to go prev page
		btn = createBtn(page,'prev');
	}

	elements.searchResPages.insertAdjacentHTML('afterbegin',btn);
}

export const renderResults = (recipes,page = 1, resPerPage = 10) => {
	//render results of current page
	const start = (page - 1) * resPerPage;
	const end = page * resPerPage;

	recipes.slice(start,end).forEach(renderRecipe);

	//render pagination buttons
	renderButton(page,recipes.length,resPerPage);
}

