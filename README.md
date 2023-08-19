# devConnect <img src="https://cdn-icons-png.flaticon.com/512/4396/4396623.png" height="45px" width = "45px"/>

[![Mongo Badge](http://img.shields.io/badge/Database%20-MongoDB-darkgreen?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
&emsp;
[![Express Badge](http://img.shields.io/badge/Server%20-Express-black?style=for-the-badge&logo=express)](https://expressjs.com/)
&emsp;
[![Reactjs Badge](http://img.shields.io/badge/Client%20-React-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
&emsp;
[![Node Badge](http://img.shields.io/badge/Backend%20-Node-green?style=for-the-badge&logo=node.js)](https://nodejs.org/en/)
&emsp;



## Overview

A MERN stack social media app for developers to connect which includes some of the basic app functionalities.
The frontend is made with ReactJS and NodeJS is used as the Javascript runtime environment. Apart from this MongoDB is the database used and 'mongoose' is used to create models for the documents of the database. ExpressJS is integrated as the server, and Redux is used for state management.

![devConnect](https://github.com/umangutkarsh/devConnect-Social_media_app/assets/95426993/8ca76f48-fb94-4fe1-ac93-6e1777028304)



### Features

- 🔒 Authentication (Login, Logout and Register)
- 👨‍💻 Profile management
- 📱 Mobile Responsive
- ✏️ Edit Profile and Create profile
- 🎓 Add Education Background
- 💼 Add Experience Credentials
- 🤹‍♂️ Add your status and skills
- ✉️ Add your own posts
- 💌 Like and Comment on the posts
- 🗣️ Start a discussion
- 🌐 Browse other developers' profile
- 🖼️ Add your own avatar
- 📧 Add your GitHub repos and other link your social media accounts



### Work in Progress

- Some pages not able to render, need to fix some bugs
- Making all the used packages to be compatible with each other



### Bugs
* Some UI issues (Success and Error message not displayed properly, probably need to look in the css and classes)
* Delete comment (Cannot read properties of undefined (reading 'statusText') TypeError: Cannot read properties of undefined (reading 'statusText') at http://localhost:3000/static/js/bundle.js:757:27)
* Issues with the github api (repos not loading)
* Issues when creating/editing profile, and when adding experience/education (Cannot read properties of undefined (reading 'data') TypeError: Cannot read properties of undefined (reading 'data') at http://localhost:3000/static/js/bundle.js:926:33) **Data is added to the database
* Some button navigation issues
* Errors when logging out
* Dashboard issues (name not being displayed after registering, also issues with profile creation and is resolved only after user logs out)
* Error when deleting account (Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.)


### @toDo - Delete the comment and like of deleted user
