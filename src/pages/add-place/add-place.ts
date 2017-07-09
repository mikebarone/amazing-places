import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms/forms";
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location"
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {PlacesService} from "../../services/places";
import {Entry, File, FileError} from '@ionic-native/file';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  location: Location = {
    lat: 40.7624324,
    lng: -73.9759827
  };
  locationIsSet = false;
  imageUrl = '';

  constructor(
    private  modalCtrl: ModalController,
    private geolocation: Geolocation,
    private camera: Camera,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private placesService: PlacesService,
    private file: File) {}

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.placesService.addPlace(form.value.title, form.value.description, this.location, this.imageUrl);
    form.reset();
    this.location = {
      lat: 40.7624324,
      lng: -73.9759827
    };
    this.imageUrl = '';
    this.locationIsSet = false;
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, {
      location: this.location,
      isSet: this.locationIsSet
    });
    modal.present();
    modal.onDidDismiss(
      data => {
        if(data) {
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    );
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your location...'
    });
    loader.present();
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          loader.dismiss();
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
        }
      )
      .catch(
        error => {
          loader.dismiss();
          const  toast = this.toastCtrl.create({
            message: 'Could not get the location, please pick it manually',
            duration: 2000
          });
          toast.present();
        }
      );
  }

  onTakePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      //mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      //let base64Image = 'data:image/jpeg;base64,' + imageData;
      //console.log(imageData);
      const currentName = imageData.replace(/^.*[\\\/]/, '');
      const path = imageData.replace(/[^\/]*$/, '');
      const newFileName = new Date().getUTCMilliseconds() + '.jpeg';
      this.file.moveFile(path, currentName, /*cordova.file.dataDirectory*/ this.file.dataDirectory, newFileName)
        .then(
          (data: Entry) => {
            this.imageUrl = data.nativeURL;
            this.camera.cleanup();
            // this.file.removeFile(path, currentName);
          }
        )
        .catch(
          (err: FileError) => {
            this.imageUrl = '';
            const toast = this.toastCtrl.create({
              message: 'Could not save the image',
              duration: 2500
            });
            toast.present();
            this.camera.cleanup();
          }
        );
      this.imageUrl = imageData;
    }, (err) => {
      const toast = this.toastCtrl.create({
        message: 'Could not take the image',
        duration: 2500
      });
      toast.present();
    });
  }

}
