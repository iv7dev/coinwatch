// @flow
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="top-container">
          <div className="title">
            <h1><Link to="/">Coin Watch</Link></h1>
          </div>
          <div className="content">
          </div>
          <div className="toolbar pull-right">
            <Link to="/settings" className="link-settings"><span className="glyphicon glyphicon-cog" aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="tabs">
          <NavLink to="/coins" className="tab">Home</NavLink>
          <NavLink to="/icos" className="tab">ICOs</NavLink>
        </div>
      </nav>
    );
  }
}

export default Navbar;
