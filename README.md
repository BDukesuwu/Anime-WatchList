# Anime watchlist

---

## User Stories 

https://github.com/users/BDukesuwu/projects/3

---

## ERD

![ERD List](https://imgur.com/x1jUSU7.png)

---

#### Anime

|HTTP|URL|Controller|Purpose|
|---|---|---|---|
| GET | /anime | animeCtrl.index	| View all anime watched/starred by the logged in user |		
|	GET	| /anime/all | animeCtrl.allAnime	| View all the anime regardless of who watched what |			
|	GET	| /anime/:id | animeCtrl.show	| View the details of any anime |
|	GET	| /animenew | animeCtrl.new	| View a form for submitting a new anime to the list |		
|	POST | /anime | animeCtrl.create	| Handle the new anime form being submitted |
|	GET	| /anime/:id/edit |	animeCtrl.edit | View a form for editing an anime (for logged in user only) |	
|	PUT	| /anime/:id | animeCtrl.update| Handle the edit anime form being submitted (for logged in user only) |	
|	DELETE | /anime/:id | animeCtrl.delete | Delete an anime submission(for logged in user only) |
|	POST | /anime/:id | animeCtrl.addWatching | Add the logged in user/weeb id to an anime's watched array |		

#### Reviews

|HTTP|URL|Controller|Purpose|
|---|---|---|---|
| n/a | n/a | index action | View all the reviews for an anime |
| n/a | n/a | show action | Viewing a single review is useless |
| n/a | n/a | new action | Display the form to add a new review on the animes detail view |
| POST | /anime/:id/reviews | commentsCtrl.create | Handle the new comment form being submitted |
| GET | /reviews/:id/edit | commentsCtrl.edit | View a form for editing a comment (for logged in user only) |
| PUT | /reviews/:id| commentsCtrl.update | Handle the edit comment form being submitted (for logged in user only) |
| DELETE | /reviews/:id| commentsCtrl.delete | Delete comment (for logged in user only) |

---

## Technologies Used

- [HTML](https://www.w3schools.com/html/)
- [CSS](https://www.w3schools.com/cssref/)
- [JavaScript](https://developer.mozilla.org/en-US/)
- [Express](https://expressjs.com/)
- [EJS](https://www.npmjs.com/package/express-ejs-layouts)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Google Oauth](https://developers.google.com/identity/protocols/oauth2)
- [Heroku](https://id.heroku.com/login)
- [Google Fonts](https://fonts.google.com/)
- [Figma](https://www.figma.com/)
- [Imgur](https://imgur.com/)

---

## Wireframe

![Anime Watchlist Login Page](https://imgur.com/F0e1CK9.png)
![Anime Watchlist Anime List Page](https://imgur.com/oEEh9EX.png)
![Anime Watchlist Review Page](https://imgur.com/9e0GCAh.png)
![Anime Watchlist Watchlist Page](https://imgur.com/Pd2BgOJ.png)

---

## Wins

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae dui euismod, vulputate odio a, ultricies ante. Mauris non quam ornare, sodales mauris eget, luctus libero. Curabitur a pulvinar augue. In vitae posuere risus. Nunc rutrum purus a dolor auctor, et convallis mauris dapibus. Mauris ac lobortis ipsum. Sed tempus lectus vitae velit consequat condimentum.

## Hurdles

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae dui euismod, vulputate odio a, ultricies ante. Mauris non quam ornare, sodales mauris eget, luctus libero. Curabitur a pulvinar augue. In vitae posuere risus. Nunc rutrum purus a dolor auctor, et convallis mauris dapibus. Mauris ac lobortis ipsum. Sed tempus lectus vitae velit consequat condimentum.

## Next Steps

- [ ] Add a food category selection where the user can choose if the food item goes in the fridge, freezer or pantry list.
- [ ] Add a *Add To Grocery List* button in the food details page to add to a grocery list.
- [ ] Add functionality to where the food item that is past it's expiration date will go red and go to an expired foods list.

## Credits

* My very knowledgeable and patient instructional team and classmates
