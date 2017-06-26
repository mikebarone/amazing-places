import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {NgForm} from "@angular/forms/forms";

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

}
