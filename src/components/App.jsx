import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const App = (props) => {
  const { children } = props;

  return (
    <div className="page-container">
      <header className="page-container-header">
        <h1>Estonian Folk Calendar</h1>
      </header>
      <nav className="page-container-navigation">
        <ul className="page-container-navigation-list">
          <li className="page-container-navigation-listitem">
            <Link className="page-container-navigation-listitem__link" to="/">
              Home
            </Link>
          </li>
          <li className="page-container-navigation-listitem">
            <Link
              className="page-container-navigation-listitem__link"
              to="/calendar"
            >
              Calendar
            </Link>
          </li>
        </ul>
      </nav>
      <hr />
      <article className="page-container-body">
        <header className="page-container-body-header">
          <h2>Welcome to the calendar.</h2>
          <p className="page-container-body-header__text">
            The following app displays the date and weekday of each day and the
            names of all the events that exist for that day. The events
            displayed are Estonian public holidays and holidays from the
            Estonian Folk Calendar.
          </p>
        </header>
        <section className="page-container-body__content">
          {children}
        </section>
      </article>
    </div>
  );
};

App.propTypes = propTypes;

export default App;
