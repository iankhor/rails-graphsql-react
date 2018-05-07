// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomepageLayout from './components/Home/Home'
import ProviderContainer from './components/ProviderSearch/ProviderContainer'



const Root = () => (
  <Router>
    <div>
      <Route exact path="/" component={HomepageLayout} />
      <Route path="/provider_search" component={ProviderContainer} />
    </div>
  </Router>
);

// <Route path="/topics" component={Topics} />

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Root />,
    document.body.appendChild(document.createElement('div')),
  )
})
