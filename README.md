# Art Retail Tracking (ART)

A personal project built using MERN stack, hosted on Heroku. 
In my free time, I make digital collages and am lucky enough to be represented by a gallery that sells limited edition prints of my work. One problem I have encountered over the past few years is trying to keep track of my prints, their editions, prices, sales, etc. The workflow involves keeping several resources up-to-date (a Google Drive I share with the gallery, my own personal tracking on an excel sheet, etc), which invariably becomes difficult to do with each sale or change to a print. 
I thought it might be fun to build myself a web app where I could keep track of everything in one place - which led me to this project. It is far from complete, but it has been wonderful to work on something I find exciting and to further improve my skills simultaneously.  

So far, I have implemented:
- Register, login, and logout using JWT tokens. An unregistered or logged out user will be redirected to the login page and has no access until they sign up or login. On the backend, I built a custom auth middleware that checks for an Authorization header and verifies any tokens in order to handle authenticating each request. On the frontend, the JWT token is stored in local storage using Context API, and each private route can only be accessed once the existence of the token is verified. 
- The homepage, which makes a request for the user's artwork then displays it. 
- An upload page where a user can upload new artwork and fill out a form with any relevant info like title, edition, description, how many prints are currently available, etc. On the backend, the image gets stored in an AWS S3 bucket, and the info gets stored in a mongodb database.
- A page that displays a single artwork once you click on it, along with all info that is relevant to the artwork. There is also an Edit button which allows the user to edit and update information. If a print has been sold, the user can click "I sold this print!", which increases the edition number and decreases the number of available prints, while adding the print to the user's monthly sales statement.
- A sales page that displays the prints a user has sold for each month of the year. On the backend, a lookup operation is performed on the data in order to reorganize it and serve it in a structured manner.
- A profile page that displays basic user information. 

For styling, I opted to use SASS and recreate a design from a theme bought off of themeforest. No frameworks were used. 

# The challenging bits

- This app is a Progressive Web App and can be accessed offline. It was insanely fun learning about PWAs, web workers, and best practice when converting a web app into a PWA.
- Optimizations through code splitting using React.lazy and Suspense, and resource prefetching to increase Lighthouse speed index
- Learning about and using React Hooks, which I have quickly come to prefer over class components
- Deploying a monorepo to Heroku and all the pitfalls/caveats that come with it. This helped solidify how a fullstack app interacts with itself internally, and what the different things you need to be aware of when deploying a fullstack app are. Here, I chose for Express to serve both the frontend and backend.

# To Do
- Add different permission roles to User so that someone working for a gallery that represents a number of users can log in and check those users' artwork for updated information.
- Optimize images to reduce bundle sizes and load times.
