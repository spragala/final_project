# Katie App

Client-attracting website for a therapist and for her to use to manage her existing client's appointments.

Site can be found [here](https://safe-mesa-87284.herokuapp.com/).

## Description

Catherine Sprague is a therapist working in the bay area. She's building her client base so I built a site for her that would act as a marketing tool to advertise herself as well as a useful tool for her and her clients.

Katie's registered clients will see their personal page after logging where they can view information about their appointments, information for getting a hold of Catherine and a customized 'bookshelf'. Catherine can add links to whatever information she think might be pertinent to that client in the bookshelf. Future features include adding a calendar for clients to request additional appointments or changes and the ability to pay Catherine from the site.

As the administrator Katie has the ability to upload links to specific clients as mentioned above, as well as add clients, edit appointment details, delete appointments and so forth. Future features include a calendar to better see her schedule.

## Mobile

The site was designed with mobile in mind.

"About Me" page mobile view:
<img src= "https://user-images.githubusercontent.com/28071777/28790996-cf8fc6dc-75df-11e7-93ab-30f2017ee0af.png" width="375"/>
"About Me" page desktop view:
<img src= "https://user-images.githubusercontent.com/28071777/28790930-9cdf96ea-75df-11e7-8a73-60091215d090.png" width="600"/>
"Profile" page mobile view:
<img src= "https://user-images.githubusercontent.com/28071777/28790938-a23ad62c-75df-11e7-8978-73e82f2bb975.png" width="375"/>
"Profile" page desktop view:
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
