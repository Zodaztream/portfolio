# TDDD27 2020 Portfolio

Welcome to portfolio!

Customize and display up to 12 different stock charts on your profile. View other people's profiles to see what they are doing. Maximize your earnings with this easy-to-use, and free, website.

## Main idea
The core idea is to have a website built in **React + Redux** that displays
a user's portfolio to them (with up to 12 different stock charts), and others who may find it interesting. 
A user can also visit other people's **customized** portfolio.
A user shall be able to customize their profile by means of resizing elements/
and or by selecting different possible **layouts** (see figure 1). Furthermore, a user shall be able to customize
the background image of their profile.

*below should be moved to Functional/Technological*
A user shall be able to pick their stock charts from the *Yahoo Finance API*
All charts and customizations will be saved in a database using *Flask-Sql-lite a backend* as JSON.

<div align="center">
<img src="https://i.imgur.com/Y3TrLp9.png"  width="50%" height="50%">
</div>

### Functional specification

A user shall be able to create a simple account and login

A user shall be able to customize their profile by resizing chart elements, reshaping, and changing background.

A user shall be able to visit others' profile by searching and see their stock-charts with their customization

A user shall be able to display stock-charts from *Yahoo Finance API* (or others, if such exist)



## Technological specification

### Client
React with Redux implemented

### Server
*Gevent* server with *Flask-SQL-lite backend* in *Python*.

*Postman* will be used to test various http calls to the server

Profile customizations will be stored as *JSON-files* in the *database*

*D3* Will be used to display stock-charts

*Yahoo Finance API* will be used to gather data to create said stock-charts

*React Mosaic* will be used to allow profile customization

*Typescript* to keep the code clean.

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

