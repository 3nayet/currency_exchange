# Currency_exchange

## Description
currency_exchange is an app that displays the currency exchange rates for several currencies and crypto. It retrieves the current exchange rate every interval of time and allows the user to exchange between 
different currencies and save the conversion at any given spot of time.
The app also views the history of exchanges rates as well as the saved currency exchange done by the user.


## configuration
before startup, a few configuration is needed to define the interval in (milliseconds) of retrieving the exchange rate: in root directory -> .env -> set CURR_RATE_INTERVAL_MILLS value.

## installation and running the app
To make it run easier and run independant of OS/Platform, the app is dockerized; all needed steps for installation are already included in docker-compose.yml
to run the app a pre-requisite of docker service in(MacOs/Linux) or docker desktop is required. here you can get docker ===>(https://docs.docker.com/get-docker/)
run the following command to run the app:

```bash
$ docker-compose -f docker-compose.yml up --build -V

the client can be accessed with: http://localhost:1337 



- Author - [Abubaker Enayet](abubaker.enayet@gmail.com)

