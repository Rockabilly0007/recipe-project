import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { Recipe } from './recipe.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();
    
    // private recipes: Recipe[] = [
    //     new Recipe('Egg Stir Fry', 
    //     'This tomato egg stir fry is a simple yet delicious dish that can be made in minutes with a single pan!',
    //     'https://omnivorescookbook.com/wp-content/uploads/2022/10/220810_Tomato-Egg-Stir-Fry_3.jpg',
    //      [
    //         new Ingredient('Eggs', 2),
    //         new Ingredient('Tomato', 1)
    //     ]),
    //     new Recipe('Big Fat Burger', 
    //     'What else you need to say?', 
    //     'https://img.freepik.com/premium-photo/delicious-gourmet-hamburger-tomato-lettuce_538646-11178.jpg?w=2000', 
    //     [
    //         new Ingredient('Bread', 1),
    //         new Ingredient('Hamburger', 1),
    //         new Ingredient('Cheese Slice', 2),
    //         new Ingredient('Lettuce', 2)
    //     ]),
    //     new Recipe('Tuna Pizza',
    //      'Ocean lovers and surfers may try this.',
    //      'https://images.eatsmarter.com/sites/default/files/styles/max_size/public/tuna-pizza-519466.jpg',
    //      [
    //         new Ingredient('Tuna', 2),
    //         new Ingredient('Onion', 1),
    //         new Ingredient('Cream Cheese', 1)
    //      ])
    // ];

    private recipes: Recipe[] = [];

    constructor(private shoppingService: ShoppingService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShopList(ingredients: Ingredient[]) {
        this.shoppingService.addIngredients(ingredients); 
    }

    addRecipe(recipe: Recipe) {
       this.recipes.push(recipe);
       this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}   
