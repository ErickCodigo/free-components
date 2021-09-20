import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import controlPagination from './controlPagination';

const fallbackAction = (index) => index;

const createFakeData = (len = 1, action = fallbackAction) => {
    return new Array(len).fill(null).map((_, i) => action(i));
};

/**
 * @param {String} searchString
 * @return {Object} paramsObject
 * @example
 * // 1. Puedes usarlo enviando:
 * getSearchParams(window.location.search) // retorna {param1: "",...}
 *
 * // 2. ó puedes usarlo enviando con react-router-dom:
 *  const {search} = useLocation();
 *  getSearchParams(search) // retorna {param1: "",...}
 * */
const getSearchParams = (searchString = '') => { // llevar
    return Object.fromEntries(new URLSearchParams(searchString).entries());
};

const Router = () => {
    const {page} = getSearchParams(window.location.search); // llevar
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(setPostList);
    }, []);

    const {numberOfPages, ranges} = controlPagination(postList.length, 15, page || 1); // llevar

    return (
        <div>
            <ul style={{display: 'flex'}}>
                {createFakeData(numberOfPages).map((num) => (
                    <li key={num} style={{marginRight: ".5rem", listStyle: "none"}}>
                        <Link to={{
                            pathname: '/',
                            search: `?page=${num + 1}`
                        }}>Link {num + 1}</Link>
                    </li>
                ))}
            </ul>

            <div style={{
                maxWidth: '750px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                outline: '1px solid #ddd'
            }}>
                {postList.slice(ranges.from, ranges.to).map(({id, title, body}) => (
                    <div key={id}>
                        <div>
                            {id}
                        </div>
                        <div>
                            {title}
                        </div>
                        <div>
                            {body}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Router;
