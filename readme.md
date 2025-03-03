# Spotify recently listened albums app
This app aims to create a website that summarizes the albums the user has recently listened to. The app checks the users status every 10 minutes and if a new album is being listened to it saves the album reference. 

When visiting the website, the user will be able to see the albums in a grid and will be able to download all the album covers on a single image.

 ## Dependencies 
- Docker
- node
- npm
## How to run
The following command will build the app 
```{shell}
docker-compos build
```
The next one will run it
```{shell}
docker-compose up 
```
The app automatically detects updates in files and runs again when a file is updated. To teardown the program the next command can be used
```{shell}
docker-compose down
```
The program can also be run using Make by executing the commands build, start and clean respectively.