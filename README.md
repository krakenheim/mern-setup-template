# mern-setup-template

Create config.env file and add mongodb atlas connection string to an 'mongoDBURL=' variable.

In config.env create a PORT variable and set it to desired local port. Tested at 5555.

HTTP requests tested on postman https://web.postman.co/ through the desktop agent. OBS: Localhost request cannot be handled without the Postman desktop agent.

# Running the application

Check if you must start the MongoDB, or you can just run "npm run dev" in the backend folder, and connect without problems

If not, go to mongoDB and add the current IP to trusted IP's.

-> cd ./backend/
-> npm run dev

server should run no problem

Use Postman to run requests and see of they work.

# setup guides

MERN stack setup tutorial
https://www.youtube.com/watch?v=-42K44A1oMA
30:10

MongoDB
https://www.youtube.com/watch?v=bBA9rUdqmgY&t=317s
