# GuitStrum

Over the weekend I planned out my project. The initial state of everything prior to working with the UX team can be seen below.

## Wireframes, Routes, and Database Planning:

These are the initial routes I for this project:

![Routes](/img/image4.gif)

These are the intial wireframes for the pages.  They include all user navigable buttons and general layouts of the page.

![Wireframes](/img/image3.gif)
![Wireframes](/img/image2.gif)
![Wireframes](/img/image1.gif)

This is the intial structure for the database.  There are still a few possible changes I may make, but at the moment, this is the plan.

![Database](/img/image0.gif)


## Sprint Planning

Saturday: Models
	- What data our API queries, and what parameters it needs to get the job done. 
        - [ ] Read API documentation		
	- What data is available back to us from the API, and which pieces of this data are we going to store in our local db?
        - [ ] Make tests queries of API to see what data comes back
	- Declare model declaration
        - [ ] Draw out ERD (model diagrams, can be by hand or with an online tool)
    - [ ] Add all findings/work to working README
	- Write code declaration of models
        - [ ] Write out models in Sequelize on the command line
	- Migrate models to db
        - [ ] Run sequelize migrate command		
	- Seed/add test data and test models for functionality
        - [ ] Either in PSQL (in vanilla SQL) or using a testdb code add instances to our db, and use node or vanilla sql commands to run tests. 
    - [ ] Add all findings/work to working README
Sunday: Controllers + Auth
	- Write out based on our user flow our necessary routes
        - [ ] Code out scaffold routes in server.js
	- Organize and declare our routers
        - [ ] Break out routes into router or controller folder, and then add command in server.js to do this	
	- Start working router by router, testing as we go 
        - [ ] Starting with / or homepage route, start writing logic based on user flow to handle
Monday: API setup + data scraping chord image
    Finish README setup
    Create footer
    Chord routes
Tuesday: Controllers
    JS functions for chord naming for DB
		Finish basic routes
Wednesday: Songs
    JS functions for song formatting
Thursday: Routes finish
		Do final test of routes
		Add auth into routes
Saturday: Views 
	- Wireframes + asset picking
        - [ ] Draw out wireframe
        - [ ] Collect and save to local folder all image or other assets you want to use
	- Write principal EJS template to be used on all pages 
        - [ ] Based on wireframe, write out HTML/CSS/EJS template for site
	- Any forms written for user login or other purposes
        - [ ] Based on wireframes, write any individual views that require forms and add form logic, then test 
Sunday: Views 
	- Finishing out any additional views not completed yesterday
        - [ ] Working through each view to build out, testing as building
	- Updating CSS/HTML so that app fits visual recommendations
        - [ ] Updating visual frontend until desired effect reached. 	
FINISHED PROJECT
- App
    - Models/db that gets related
    - Controller system that allows the user to go to multiple routes
    - A way to authorize users so that they log in and out, and stay logged in through use
    - Views: edited pages that give the user visual cues of how interact with our website