import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ViewChild } from '@angular/core';
import { IonInput, NavController, Events, Platform, ActionSheetController, ToastController, LoadingController } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { RestService } from '../../services/rest.service';
import { environment } from '../../../environments/environment';
import { async } from 'rxjs/internal/scheduler/async';

const STORAGE_KEY = 'my_logo_image';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  api_url = environment.api_url
  user_id : any
  profile : any
  lang : string
  logo_url : any
  name_flag : boolean =  true
  username_flag : boolean =  true
  bio_flag : boolean =  true
  country_code_flag : boolean = true
  phone_flag : boolean = true
  location_flag : boolean = true
  profile_privacy : boolean = true
  @ViewChild('input_name', { static: false }) nameInput: IonInput;
  @ViewChild('input_username', { static: false }) usernameInput: IonInput;
  @ViewChild('input_bio', { static: false }) bioInput: IonInput;
  @ViewChild('input_country_code', { static: false }) countryCodeInput: IonInput;
  @ViewChild('input_phone_number', { static: false }) phoneInput: IonInput;
  @ViewChild('input_location', { static: false }) locationInput: IonInput;

  constructor(
    private translate: TranslateService,
    private navCtrl: NavController,
    public events: Events,
    public platform: Platform,
    private camera: Camera, 
    private file: File, 
    private http: HttpClient, 
    private webview: WebView,
    private actionSheetController: ActionSheetController, 
    private toastController: ToastController,
    private storage: Storage, 
    private plt: Platform, 
    private loadingController: LoadingController,
    private ref: ChangeDetectorRef, 
    private filePath: FilePath,
    public restApi: RestService,
  ) {
    this.lang = this.translate.currentLang;
    this.storage.get('user_profile').then(profile =>{
      profile = JSON.parse(profile);
      this.profile = profile;
      this.user_id = profile.id;
      this.logo_url = profile.logo_url ? this.api_url + profile.logo_url : null;
      this.nameInput.value = profile.name;
      this.usernameInput.value = profile.username;
      this.bioInput.value = profile.bio;
      this.countryCodeInput.value = profile.country_code;
      this.phoneInput.value = profile.phone_number;
      this.locationInput.value = profile.city;
    });
  }

  ngOnInit() {
  }

  async ionViewWillLeave() {
    await this.storage.set("user_profile", JSON.stringify(this.profile));
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'middle',
        duration: 3000
    });
    toast.present();
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
                text: 'Load from Library',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
            {
                text: 'Use Camera',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA);
                }
            },
            {
                text: 'Cancel',
                role: 'cancel'
            }
        ]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
      var options: CameraOptions = {
          quality: 50,
          sourceType: sourceType,
          saveToPhotoAlbum: false,
          correctOrientation: true
      };

      this.camera.getPicture(options).then(imagePath => {
          if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
              this.filePath.resolveNativePath(imagePath)
                  .then(filePath => {
                      let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                      let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                  });
          } else {
              var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
              var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
              this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          }
      });
  }

  createFileName() {
    var d = new Date(),
        n = d.getTime(),
        newFileName = n + ".jpg";
    return newFileName;
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
        this.updateStoredImages(newFileName);
    }, error => {
        this.presentToast('Error while storing file.');
    });
  }

  updateStoredImages(name) {
    this.storage.get(STORAGE_KEY).then(images => {
        let arr = JSON.parse(images);
        if (!arr) {
            let newImages = [name];
            this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
        } else {
            arr.push(name);
            this.storage.set(STORAGE_KEY, JSON.stringify(arr));
        }

        let filePath = this.file.dataDirectory + name;
        let resPath = this.pathForImage(filePath);

        let newEntry = {
            name: name,
            path: resPath,
            filePath: filePath
        };

        this.startUpload(newEntry);
        this.ref.detectChanges(); // trigger change detection cycle
    });
  }

  startUpload(imgEntry) {
      this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
          .then(entry => {
              ( < FileEntry > entry).file(file => this.readFile(file))
          })
          .catch(err => {
              this.presentToast('Error while reading file.');
          });
  }
  
  readFile(file: any) {
      const reader = new FileReader();
      reader.onload = async () => {
        const imgBlob = new Blob([reader.result], {
            type: file.type
        });
        let base64file = await this.getBase64(imgBlob);
        const params = {
          id: this.user_id,
          file: base64file,
          file_name: file.name,
          file_type: file.type
        }
        this.uploadLogo(params);
      }
      reader.readAsArrayBuffer(file);
  }

  getBase64(file) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  async uploadLogo(params) {
    const loading = await this.loadingController.create({
        message: 'Uploading image...',
    });
    await loading.present();

    try {
      const response : any = await this.restApi.uploadLogo(params);
      this.profile.logo_url = response.result;
      this.logo_url = this.api_url + response.result;
    } catch(err) {
      this.presentToast(err.error);
    }
    loading.dismiss();
    this.ref.detectChanges();
  }

  // set all input field as disabled
  setDisabled() {
    this.name_flag = true;
    this.username_flag = true;
    this.bio_flag = true;
    this.country_code_flag = true;
    this.phone_flag = true;
    this.location_flag = true;
  }

  clickPencil(field) {
    this.setDisabled();
    // control for selected field
    if (field == 'name') {
      this.name_flag = !this.name_flag;
      setTimeout(() => {
        this.nameInput.setFocus();
      }, 400);
    } else if (field == 'username') {
      this.username_flag = !this.username_flag;
      setTimeout(() => {
        this.usernameInput.setFocus();
      }, 400);
    } else if (field == 'bio') {
      this.bio_flag = !this.bio_flag;
      setTimeout(() => {
        this.bioInput.setFocus();
      }, 400);
    } else if (field == 'phone_number') {
      this.phone_flag = !this.phone_flag;
      this.country_code_flag = !this.country_code_flag
      setTimeout(() => {
        this.countryCodeInput.setFocus();
      }, 400);
    } else if (field == 'location') {
      this.location_flag = !this.location_flag;
      setTimeout(() => {
        this.locationInput.setFocus();
      }, 400);
    }
  }

  getFocus(field) {
    console.log("focus", field);
  }

  async loseFocus(field) {
    console.log("blur", field);
    let response : any
    switch (field) {
      case "name":
        response = await this.restApi.updateProfile({
          id: this.user_id,
          field: field,
          value: this.nameInput.value
        });
        if (response.code == 200) {
          this.profile.name = this.nameInput.value;
        } else {
          this.presentToast(response.result);
        }
        break;
      case "username":
        response = await this.restApi.updateProfile({
          id: this.user_id,
          field: field,
          value: this.usernameInput.value
        });
        if (response.code == 200) {
          this.profile.username = this.usernameInput.value;
        } else {
          this.presentToast(response.result);
        }
        break;
      case "bio":
        response = await this.restApi.updateProfile({
          id: this.user_id,
          field: field,
          value: this.bioInput.value
        });
        if (response.code == 200) {
          this.profile.bio = this.bioInput.value;
        } else {
          this.presentToast(response.result);
        }
        break;
      case "location":
        response = await this.restApi.updateProfile({
          id: this.user_id,
          field: "city",
          value: this.locationInput.value
        });
        if (response.code == 200) {
          this.profile.city = this.locationInput.value;
        } else {
          this.presentToast(response.result);
        }
        break;
      case "phone_number":
        response = await this.restApi.updateProfile({
          id: this.user_id,
          field: "phone",
          country_code: this.countryCodeInput.value,
          phone_number: this.phoneInput.value
        });
        if (response.code == 200) {
          this.profile.country_code = this.countryCodeInput.value;
          this.profile.phone_number = this.phoneInput.value;
          this.navCtrl.navigateBack('/phoneverify', { queryParams: 
            {
              email: this.profile.email,
              country_code: this.countryCodeInput.value.toString(),
              phone_number: this.phoneInput.value.toString(),
              from: 'settings_page'
            }
          });
        } else {
          this.presentToast(response.result);
        }
        break;
      default:
        break;
    }
    this.setDisabled();
  }

  changeCountryCode(e) {
    var country_code = e.target.value;
    if (country_code.length == 3) {
      this.phoneInput.setFocus();
    }
  }

  changeToggle() {
    this.profile_privacy = !this.profile_privacy;
    console.log(this.profile_privacy);
  }

  setLang(langauge) {
    this.events.publish('lang:change', langauge);
    this.lang = langauge;
    this.ref.detectChanges();
  }

}
