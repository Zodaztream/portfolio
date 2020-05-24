# TDDD27 2020 Portfolio

**08/05/20 Progress report** : https://youtu.be/jHLrYLrzEbs

**LINK TO DEPLOYED SITE** : https://reactportfoliotddd27.herokuapp.com/

Welcome to portfolio!

Customize and display up to 12 different stock charts on your profile. View other people's profiles to see what they are doing. Maximize your earnings with this easy-to-use, and free, website.

## Main idea

The core idea is to have a website built in **React + Redux** that displays
a user's portfolio to them (with up to 12 different stock charts), and others who may find it interesting.
A user can also visit other people's **customized** portfolio.
A user shall be able to customize their profile by means of resizing elements/
and or by selecting different possible **layouts**. Furthermore, a user shall be able to customize
the background image of their profile.

<div align="center">
<img src="https://i.imgur.com/Y3TrLp9.png"  width="50%" height="50%">
</div>

## Functional specification

~~A user shall be able to create a simple account and login~~ ✔️

~~A user shall be able to customize their profile by resizing chart elements, reshaping, and changing background.~~ ✔️

~~A user shall be able to visit others' profile by searching and see their stock-charts with their customization~~ ✔️

~~A user shall be able to display stock-charts from _Alpha vantage API_ (or others, if such exist)~~ ✔️

## Technological specification

### Client

React with Redux implemented

_React stockcharts_ Will be used to display stock-charts

_React Grid layout_ will be used to allow profile customization

_Typescript_ to keep the code clean.

### Server

_Gevent_ server with _Flask-SQL-lite backend_ in _Python_.

_Postman_ will be used to test various http calls to the server

_Redux devtools_ to ensure correct state updates in the redux store

Profile customizations will be stored as _JSON-files_ in the _database_

_Alpha Vantage API_ will be used to gather data to create said stock-charts

## More images

<div align="center">
<img src="https://imgur.com/2SYDPBn.png"  width="50%" height="50%">
</div>

<div align="center">
<img src="https://imgur.com/061vt0S.png"  width="50%" height="50%">
</div>

<div align="center">
<img src="https://imgur.com/IA9lIJH.png"  width="50%" height="50%">
</div>
