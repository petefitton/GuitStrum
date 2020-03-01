# GuitStrum

Over the weekend I planned out my project. The initial state of everything prior to working with the UX team can be seen below.

## Wireframes, Routes, and Database Planning:

These are the initial routes I planned for this project:

![Routes](/img/image4.gif)

These are the intial wireframes for the pages.  They include all user navigable buttons and general layouts of the page.

![Wireframes](/img/image3.gif)
![Wireframes](/img/image2.gif)
![Wireframes](/img/image1.gif)

This is the intial structure for the database.  There are still a few possible changes I may make, but at the moment, this is the plan.

![Database](/img/image0.gif)


## Sprint Planning

Friday: Pre-planning
  * API research
  * Materialize research

Saturday: Pre-planning
  * Wireframes
  * Routes
  * DB models/migrations/relationships

Sunday: Setup
  * File setup:
    * File creation from template
    * File creation for
      * models
      * views
      * controllers
    * README
      * Document planning stage
      * Sprint planning

Monday: Chords & Meeting with UX Designer
  * UX Designer Meeting
    * Assess suggestions relative to timeline
    * Adjust plans accordingly
  * API
  * Initial setup:
    * Chords models
    * Chords views
    * Chords controllers

Tuesday: Songs
  * Initial setup:
    * Songs models
    * Songs views
    * Songs controllers

Wednesday: EJS and DB link
  * User/Auth
  * Songs
  * Chords

Thursday: Final Model/DB
  * User/Auth
  * Songs
  * Chords

Friday: Final View
  * User/Auth
  * Songs
  * Chords

Saturday: Final Controller
  * User/Auth
  * Songs
  * Chords

Sunday: Test/Bugs/Final Details
  * Edit all aspects of project that are incomplete or otherwise have issues
    * Likely includes authorization final details
    * CSS

#### MONDAY DELIVERABLE
  * Fully function App for Chords and Songs with Login
    * Models/DB
      * Models
      * Migration files
      * Other DB
    * Controller
      * Routes
      * API
    * Views
      * EJS
      * CSS
    * Authorization
      * User login/signup & logout
      * Conditional rendering of items/pages based on current user
    * README
      * Pre-planning
      * Sprint plan
      * How to use app
        * Functionality
      * Sources of Information

# How to use this app

This app is designed for beginner and intermediate guitar players.  Visitors to the site can view the site with some functionality - they can search for Chords and view public songs that users have posted.

A visitor can easily create an account and become a user.  Users have the ability to save chords to view in a list on both their profile as well as the chords index page of the site.  They can also create new songs.  They can make a song either public or private.  Public songs would be viewable to anyone who views the site whether logged in or not whereas private songs are only viewable by the creator.

The songs can be edited after creation which gives flexibility to a user who is in the early stages of sketching out song ideas or in the later stage of refining a song.

A user can also choose to share a private song that the user has created with another user while still keeping the song set as private.  This feature is accessible when viewing the particular song's page.

A visitor or user can also click on the chord on a particular song which will open up a new browser tab which displays how to play the particular guitar chord.


#### Sources of Information
  * https://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-an-object-with-an-attribute-that-e
    * How to iterate over an array to check to see if a condition is met or not
      * Used for conditional rendering of Adding or Deleting a chord based off of if a user has added it to their favorite chords or not
