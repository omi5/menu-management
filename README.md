# Bento - Menu Builder

Bento -Menu Builder system is designed to seamlessly connect the Inventory system. You can make a menu by using these ingredients available in the inventory. There is a profit margin calculator, you can see how much profit you are making by setting the price of the item.

## Main Features

1. **Create Menu By Using Available Ingredients:** The menu builder connects with the inventory by using the ingredients you can make the menu item for the restaurant.
2. **Profit Margin Calculator:** You can set the price for the item. when you add the ingredients you see how much profit you can make by selling the item.
3. **Delete Menu from one meal** You can Delete one menu item from a specific meal, and you can also Delete the menu item for all meal.

## Folder Structure

**_Client_**

```
  src
│
├── app
│   ├── components
│   │   ├── category-container
│   │   │── category-form
│   │   │── category-table
│   │   ├── create-menu-form
│   │   ├── edit-menu-item
│   │   ├── modal-form
│   │   ├── navbar
│   │   ├── nz-header-for-trigger
│   │   ├── nz-sider
│   │   ├── recipe-form
│   │   ├── recipe-table
│   │   ├── sidebar
│   │   └── splash-logo
│   ├── interceptors
│   ├── interfaces
│   ├── pages
│   │   ├── all-day
│   │   ├── auth-redirect
│   │   ├── breakfast
│   │   ├── dinner
│   │   ├── item-details
│   │   ├── lunch
│   │   ├── menu-item
│   │   └── services
│   ├── drawer
│   ├── ingredient
│   └── selected-item
│
    ├── services
│   ├── api-client.service.ts
│   ├── category.service.ts
│   ├── cloudinary.service.spec.ts
│   ├── cloudinary.service.ts
│   ├── get-menu-item-by-schudule.service.ts
│   ├── inventory.service.ts
│   ├── make-recipe.service.ts
│   ├── menu-item-service.service.ts
│   └── schedule-time.service.ts
│
├── app-routing.module.ts
├── app.component.css
├── app.component.html
├── app.component.spec.ts
├── app.component.ts
├── app.module.ts
│
└── assets
|── favicon.ico
|── index.html
```

## Getting Started

### How to Run the App Locally

To run the app on your local machine, follow these steps:

1. Clone the repository: `git clone https://github.com/omi5/menu-management.git`
2. Navigate to the server directory: `cd menu-management`
3. Install dependencies: `npm install`
4. Start the development server: `ng serve`

### Live Link

Access the live version of the app at [Bento Menu Builder](https://bento-menu-builder.vercel.app/allDay).


# MenuBuilder

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
