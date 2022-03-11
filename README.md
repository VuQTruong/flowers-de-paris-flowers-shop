# Flowers de Paris - Flowers Shop

---

## Table of Contents

- [Introduction](#introduction)
- [Project Demo](#project-demo)
- [Installing](#installing)
- [Running the app](#running-the-app)
- [APIs Overview](#apis-overview)
	- [Auth Service](#auth-service)
	- [Users Service](#users-service)
	- [Files Service](#files-service)
	- [Categories Service](#categories-service)
	- [Products Service](#products-service)
	- [Reviews Service](#reviews-service)
	- [Cart Service](#cart-service)
	- [Orders Service](#orders-service)
	- [Payment Service](#payment-service)
	- [Blog Service](#blog-service)
	- [AboutUs Service](#aboutus-service)
	- [Contacts Service](#contacts-service)
	- [AppConfig Service](#appconfig-service)

---

## Introduction
Flowers de Paris is a fully functional eCommerce website that supports online trading with credit/debit cards or Paypal. The project was built using the **MERN** tech stack which are **MongoDB**, **Express**, **ReactJS**, **NodeJS**.

The most important thing to any business is the reputation or how to let the customers know about the business. For this reason, **SEO** was also implemented to increase the site's ranking in search engine results. To support this, the site also provides the ability to manage its own blog including creating, updating, and deleting an article.

Even though the Back-end's APIs are ready to implement features like the **Content Management Systems - CMS**, the Front-end side will be implemented in the future. Other features such as **Dashboard** and **Analytic** are also in the next phase.

---

## Project Demo

- Live at http://flowersdeparis.ca

![Project Demo](project-demo.gif)

---

## Installing

Execute these commands from the project directory

```
cd client/ && npm install
```

```
cd server/ && npm install
```

---

## Running the app

Open a terminal on server directory

```
npm run dev
```

And open another terminal on client directory

```
npm start
```

---

## APIs Overview

### Auth Service

| Method | Route | Description |
|---|---|---|
| POST | /api/auth/signup | user sign up |
| POST | /api/auth/signin | user sign in |
| GET | /api/auth/signout | user sign out |
| GET | /api/auth/google | google sign in with oauth2 |
| GET | /api/auth/facebook | facebook sign in with oauth2 |
| GET | /api/auth/verify | verify user sign in status |

### Users Service

| Method | Route | Description |
|---|---|---|
| **Client Routes** |
| GET | /api/users | get current user information |
| PATCH | /api/users | update user information |
| PATCH | /api/users/avatar | update user avatar |
| **User Favourites Routes** |
| GET | /api/users/favourites | get all favourite products |
| PATCH | /api/users/favourites | update user favorites list |
| **Admin Routes** |
| GET | /api/users/all | get all users |
| PATCH | /api/users/block/:id | block or unblock a user |
| DELETE | /api/users/:id | delete a user |
| PATCH | /api/users/setadmin:id | set a user as an admin |

### Files Service

| Method | Route | Description |
|---|---|---|
| POST | /api/files/cloud-images | upload images to Cloudinary |
| DELETE | /api/files/cloud-images | delete an image from Cloudinary |

### Categories Service

| Method | Route | Description |
|---|---|---|
| **Client Routes** |
| GET | /api/categories | get all active categories |
| **Admin Routes** |
| POST | /api/categories | create a new category |
| PATCH | /api/categories/:id | update a category |
| PATCH | /api/categories/setactive/:id | activate or deactivate a category |
| DELETE | /api/categories/:id | delete a category |
| GET | /api/categories/admin | get all categories including inactive ones |
| GET | /api/categories/:id | get a category by id |

### Products Service

| Method | Route | Description |
|---|---|---|
| **Client Routes** |
| GET | /api/products/ping/:productId | ping to identify product's status (active, inactive, or deleted) |
| GET | /api/products/slug/:slug | get a product by product slug |
| GET | /api/products/:id | get a product by product id |
| GET | /api/products | get all products |
| GET | /api/products/category/:slug | get all products by category slug |
| **Admin Routes** |
| POST | /api/products | create a new product |
| PATCH | /api/products/:id | update a product information |
| PATCH | /api/products/setstatus/:id | activate or deactivate a product |
| DELTE | /api/products/:id | delete a product |
| GET | /api/products/admin/:id | get a product regardless its status (active or inactive) |

### Reviews Service

| Method | Route | Description |
|---|---|---|
| **Client Routes** |
| POST | /api/reviews | create a new review for a product |
| PATCH | /api/reviews/:reviewId | update a review |
| DELETE | /api/reviews/:reviewId | delete a review |
| GET | /api/reviews/tags | get all pre-produced tags for a review |
| **Admin Routes** |
| POST | /api/reviews/tags | create a new tag |
| PATCH | /api/reviews/tags/:tagId | update a tag |
| DELTE | /api/reviews/tags/:tagId | delete a tag |

### Cart Service

| Method | Route | Description |
|---|---|---|
| GET | /api/cart | get current user's cart |
| PATCH | /api/cart | update current user's cart items |
| DELETE | /api/cart | empty current user's cart |

### Orders Service

| Method | Route | Description |
|---|---|---|
| **Client Routes** |
| POST | /api/orders | create a new order |
| GET | /api/orders | get all orders of current user |
| GET | /api/orders/:orderId | get an order details |
| PATCH | /api/orders/:orderId | cancel an order |
| **Admin Routes** |
| GET | /api/orders/admin/all | get all orders |
| GET | /api/orders/admin/:orderId | get an order details |
| PATCH | /api/orders/admin/:orderId | update an order status |

### Payment Service

| Method | Route | Description |
|---|---|---|
| POST | /api/payments/paypal | process payment with Paypal |

### Blog Service

| Method | Route | Description |
|---|---|---|
| **Client Routes** |
| GET | /api/blogs/:id | get an article by id |
| GET | /api/blogs/slug/:slug | get an article by article slug |
| GET | /api/blogs | get all articles |
| **Admin Routes** |
| POST | /api/blogs | create a new article |
| PATCH | /api/blogs/:id | update an article |
| DELETE | /api/blogs/:id | delete an article |
| GET | /api/blogs/admin | get all articles |
| GET | /api/blogs/admin/:id | get an article by id |
| PATCH | /api/blogs/setactive/:id | set an article status (active or inactive) |

### AboutUs Service

| Method | Route | Description |
|---|---|---|
| **Client Routes** |
| GET | /api/about | get about us information |
| **Admin Routes** |
| POST | /api/about | create a new about us information |
| PATCH | /api/about/:id | update an about us information |
| DELETE | /api/about/:id | delete an about us information |

### Contacts Service

| Method | Route | Description |
|---|---|---|
| **Client Routes** |
| GET | /api/contacts | get all contacts information |
| **Admin Routes** |
| POST | /api/contacts | create a new contact information |
| PATCH | /api/contacts/:id | update a contact information |
| DELETE | /api/contacts/:id | delete a contact information |
| GET | /api/contacts/:id | get a contact information |

### AppConfig Service

| Method | Route | Description |
|---|---|---|
| POST | /api/config/init | initialize or reset to default the app config |
| **Layout Config Routes** |
| GET | /api/config/layout | get layout configuration |
| POST | /api/config/layout | create a new feature for layout |
| PATCH | /api/config/layout/:id | update an existing feature in layout |
| DELETE | /api/config/layout/:id | delete a feature in layout |
| **Slides Config Routes** |
| GET | /api/config/slides | get slides information |
| POST | /api/config/slides | create a new slide |
| PATCH | /api/config/slides/:id | update an existing slide |
| DELETE | /api/config/slides/:id | delete a slide from slideshow |