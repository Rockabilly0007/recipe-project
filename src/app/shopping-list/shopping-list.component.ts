import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingService } from './shopping.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

    ingredients: Ingredient[];
    private subscription: Subscription;

    constructor(private shoppingService: ShoppingService) { }

    ngOnInit(): void {
        this.ingredients = this.shoppingService.getIngredients();
        this.subscription = this.shoppingService.ingredientChanged.subscribe(
            (ingredient: Ingredient[]) => {
                this.ingredients = ingredient;
            }
        )
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onEditItem(index: number) {
        this.shoppingService.startedEditing.next(index)
    }
}
