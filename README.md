# Setup Exam With Docker 

Install Docker 
Create Docker File with Dockerfile
Add Docker file Commands

# Docker Commands
    docker buid .  // To create build of your image
    docker image ls // TO show all images on docker
 => writing image sha256:fe6a018af3804dfe004794f5da57448d611313a4d496bdd340f050e7ac7eadf4 
    docker run "imageID"
    docker stop "imageName" 
    docker run -p 3000:3000 "imageID"   // To access port outside container
    docker rm "Container Name or Id"
    docker image rm "image Id"
     docker run -d -p 3000:3000 "imageID"   //  -d detached terminal and running in background
    docker run -d --rm -p 3000:3000 "imageID"   // --rm commands to remove container on stop
    docker run -d --rm --name "CatopenAI" -p 3000:3000 "imageID"  // custom name added with --name "imagename"
     docker build -t chat:01 . // Give name and tag to image 
     docker rmi "name or id" // remove docker image