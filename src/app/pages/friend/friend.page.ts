import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.page.html',
  styleUrls: ['./friend.page.scss'],
})
export class FriendPage implements OnInit {
  lang : string
  name : string = "محمد أحمد"
  bio : string = "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال"
  city : string = "المدينة المنورة"
  user_id : any
  is_followed : boolean = true
  logo_url : string
  favorite_restaurants : any = []
  favorite_dishes : any = []
  selected_dishes : boolean = false
  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
  ) { 
    this.lang = this.translate.currentLang;
    this.route.queryParams.subscribe((params: any) => {
      this.user_id = params.user_id;
      this.is_followed = params.is_followed;
      this.logo_url = params.logo_url;
    });
    this.favorite_restaurants = [
      {
        id: 1,
        name: 'ResName',
        logo_url: 'https://png.pngtree.com/png-clipart/20190515/original/pngtree-simple-coffee-elemental-design-png-image_3597680.jpg',
        cover_img_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/ZY-Photo-2018-09-23-00000030%20(Copy).JPG_1547864374.jpeg',
        favorite_checked: true,
        distance: 5,
        category_name: "Cate"
      },
      {
        id: 2,
        name: 'Name',
        logo_url: '',
        cover_img_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/unnamed.jpg_1547870811.jpeg',
        favorite_checked: true,
        distance: 2,
        category_name: "Cate"
      },
      {
        id: 3,
        name: 'Res_name',
        logo_url: '',
        cover_img_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/rst_911429.jpg_1547870543.jpeg',
        favorite_checked: true,
        distance: 23,
        category_name: "Cate"
      },
      {
        id: 4,
        name: 'Name',
        logo_url: 'https://png.pngtree.com/png-clipart/20190515/original/pngtree-simple-coffee-elemental-design-png-image_3597680.jpg',
        cover_img_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/CMTHYqDUcAAa8yB.jpg_1547869818.jpeg',
        favorite_checked: true,
        distance: 23,
        category_name: "Cate"
      },
      {
        id: 5,
        name: 'Name',
        logo_url: '',
        cover_img_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/ZY-Photo-2018-09-23-00000030%20(Copy).JPG_1547864374.jpeg',
        favorite_checked: true,
        distance: 3,
        category_name: "Cate"
      }
    ]

    this.favorite_dishes = [
      {
        dish_id: 1,
        dish_img_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/CMTHYqDUcAAa8yB.jpg_1547869818.jpeg',
        favorite_checked: true,
        name: 'yyyyyy',
        category_name: 'uuuuuuu',
      },
      {
        dish_id: 2,
        dish_img_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/CMTHYqDUcAAa8yB.jpg_1547869818.jpeg',
        favorite_checked: true,
        name: 'ssssss',
        category_name: 'yyyyyyyyy',
      },
      {
        dish_id: 3,
        dish_img_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/CMTHYqDUcAAa8yB.jpg_1547869818.jpeg',
        favorite_checked: true,
        name: 'gggggg',
        category_name: 'uuuuuuu',
      }
    ]
  }

  ngOnInit() {
  }

  switchDishRest(field) {
    if (field == 'dish') {
      this.selected_dishes = true;
    } else {
      this.selected_dishes = false;
    }
  }

  setFavorite(id) {
    console.log(id);
  }

  makeFriend() {
    this.is_followed = true;
  }

}
