# Katie App

Client-attracting website for a therapist that will also allow ongoing therapist-client communication and appointment management.

Site can be found [here](https://safe-mesa-87284.herokuapp.com/).

## Description

Catherine Sprague is a therapist working in the Bay Area. She is building her client base, so I built a site that would act as a marketing tool for her business; as a platform for communication with both prospective and established clients; and as a way to track appointments for both Catherine and her clients.

After logging in, Catherine's registered clients will see their personal page; here they can view information about their appointments, information for getting ahold of Catherine, and view a customized "bookshelf" (a collection of links or other information Catherine thinks would be useful to share with the client). Future features include adding a calendar for clients to request or change appointments and the ability to pay Catherine from the site.

As the administrator, Catherine has the ability to upload links to a client's bookshelf, to add clients, to edit appointment details, and to delete appointments. Future features include a calendar to better see her schedule and the ability to receice payment through the site.

## Mobile

The site was designed with mobile in mind.

<img src= "https://user-images.githubusercontent.com/28071777/28790996-cf8fc6dc-75df-11e7-93ab-30f2017ee0af.png" width="250"/>
<img src= "https://user-images.githubusercontent.com/28071777/28790930-9cdf96ea-75df-11e7-8a73-60091215d090.png" width="600"/>
<img src= "https://user-images.githubusercontent.com/28071777/28790938-a23ad62c-75df-11e7-8978-73e82f2bb975.png" width="250"/>
<img src= "https://user-images.githubusercontent.com/28071777/28790956-a829b2f6-75df-11e7-9137-1cc39acc49bf.png" width="600"/>


## Built With

* [Mongo](https://www.mongodb.com/) - Database
* [Express.js](https://expressjs.com/) - Web framework used
* [Node](https://nodejs.org/)
* [Passport.js](https://passportjs.org/) - Authentication
* [handlebars.js](handlebarsjs.com/) - Templating
* [Materialize](materializecss.com/) - CSS framework

## ERD

* User -< Appointments
* User -< links (embedded data)

## Authors

* **Matt Sprague** - *Initial work* - [Matt Sprague](https://github.com/spragala)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to Brad Traversy for the awesome tutorial on the Authentication with Passport
https://www.youtube.com/user/TechGuyWeb
* Also a huge thank you to Michelle and Nathan for the hard-work schooling us and specifically for the help with this project.
* Lastly hat tip to my classmates - thanks for all your help!
