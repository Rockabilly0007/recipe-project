import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

    @ViewChild('form', {static: false}) ShoppingListForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editedItemIndex: number;
    editedItem: Ingredient;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing
    .subscribe(
        (index: number) => {
            this.editedItemIndex = index;
            this.editMode = true;
            this.editedItem = this.shoppingService.getIngredient(index);
            this.ShoppingListForm.setValue({        // this makes you populate the form with the right values.
                name: this.editedItem.name,
                amount: this.editedItem.amount
            })
        }
    );
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
        this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
        this.shoppingService.addIngredient(newIngredient);
    }
    console.log(value);
    console.log(newIngredient);
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.ShoppingListForm.reset()
    this.editMode = false;
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.onClear();
    }
}
