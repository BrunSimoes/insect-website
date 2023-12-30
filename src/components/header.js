import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class header extends Component {
  static propTypes = {}

  render() {
    return (
      <header>
        <nav>
         <div>
          <Link to="/" ></Link>
          <Link to="/" ></Link>
          <Link to="/" ></Link>
         </div>
        </nav>
      </header>
    )
  }
}

export default header