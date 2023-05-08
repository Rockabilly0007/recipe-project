import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
 
@Injectable()
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-recipe-book-f2548-default-rtdb.firebaseio.com/recipes.json', recipes)
        .subscribe(response => {
            console.log(response);
        })
    }

    fetchRecipes() {
        return this.http
            .get<Recipe[]>(
                'https://ng-recipe-book-f2548-default-rtdb.firebaseio.com/recipes.json'
            )
            .pipe(
                map(recipes => {  //this map is a rxjs operator.
                    return recipes.map(recipe => {  // this is normal JS map() array method.
                        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                }); 
            }),
             tap(recipes => {
                this.recipeService.setRecipes(recipes);
                console.log(recipes);
            })
        )
    }
}

