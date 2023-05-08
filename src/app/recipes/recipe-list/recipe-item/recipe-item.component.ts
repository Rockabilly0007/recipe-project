import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe; // esse 'recipe' é o [recipe]= que esta no html do component list
  @Input() index: number;
  
  constructor() { }

  ngOnInit(): void {
  }

}
