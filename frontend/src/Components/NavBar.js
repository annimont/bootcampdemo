import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import classNames from "classnames";

import './NavBar.css'

export default function NavBar(props) {
    const history = useHistory();
    const currentPath = history.location.pathname;

    return (
        <div className='nav-bar'>
            <ul>
                <li>
                    <Link to='/' className={classNames({ current: currentPath === "/" })}
                    >
                        Etusivu
                    </Link>
                </li>
                <li>
                    <Link to='/money'
                        className={classNames({current: currentPath.startsWith("/money"), 
                    })}
                    >
                        Tulot ja menot
                    </Link>
                </li>
                <li>
                <Link to='/networth'
                    className={classNames({current: currentPath.startsWith("/networth"),
                })}
                >
                    Nettovarallisuus
                </Link>
                </li>
            </ul>
        </div>
    );
} 