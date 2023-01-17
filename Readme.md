# How to start project  
 1) run git clone git@github.com:Drakenwolf/NSChallenge.git
 2) create a .env file using the variable from .example.env
 3) run sudo docker-compose up


## Architecture overview

We have the following elements on the rest api:

repos: Manage the storage of the entities. 

models: Manage the rest interface. 

services: Manage the business logic implementations and external services, creating instances of the models. 

On top of this the application has a auth middleware.

Here is a simple diagram that illustrates the architecture and design of this rest api: 

https://www.figma.com/file/4UHtm1XbloAMfHDxP4DIFQ/Nica-source-technical-challenge?node-id=1%3A566&t=hJShLxKebca8cJlC-1


## Docs

 ### http://localhost:${port}/docs


