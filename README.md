# Sample React App as an Embeddable Widget

This is a widget used for displaying a stock symbol, name, price and intraday variation in an embeddable div.

Here is an example of the 3 widget items in the same page :

![Image of Finance Widget](https://github.com/nicoraynaud/react-widget/blob/master/sample.png)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Purpose and disclaimer

This project is a demo aiming at showing how one can build an embeddable React widget from a React App.

The full blog post explaining how it works is available [here](https://tekinico.medium.com/build-a-react-embeddable-widget-c46b7f7999d8).

## How to use

### `npm install`

Install all dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm build:widget`

Builds the app as an embeddable widget. Creates two files :
- index.js
- index.css

That can be included in any web page to trigger the load of the widget.

## Integration

Once built, the widget can be integrated by creating a div with the proper class identifier and parameters (here we use a stock symbol as parameter), and referencing the js and css files as resources.

**Note that the resources should only be included once in a page, even if injecting the widget several times.**

Here follows an example integration :

```html
...
<div id="something-in-your-website">
  <div class="nicoraynaud-finance-widget"
       data-symbol="GME">
  </div>
</div>
...
...
<div id="something-else-in-your-website">
  <div class="nicoraynaud-finance-widget"
       data-symbol="AMZN">
  </div>
</div>
<!-- /!\ Only add these two tags once per page -->
<link href="https://cdn.somewhere/react-widget/index.css" rel="stylesheet"/>
<script src="https://cdn.somewhere/react-widget/index.js"></script>
...
```
