import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {AddPlacePage} from "../add-place/add-place";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  addPlacePage: any;

  constructor(public navCtrl: NavController) {
      this.addPlacePage = AddPlacePage;
  }

}
