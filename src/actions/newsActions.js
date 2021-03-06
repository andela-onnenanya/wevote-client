import axios from 'axios';

import actionTypes from './constants';
import { handleError } from '../utils/errorHandler';

const { DISPLAY_NEWS, DISPLAY_IMAGE } = actionTypes;

export function getNews(){
    return (dispatch) => {
        return axios.get('http://inecnews.com/wp-json/wp/v2/posts')
            .then((res) => {
                dispatch(displayNews(res.data));
            })
            .catch(error => handleError(error));
    };
}

export function getImage(media_id){
    return (dispatch) => {
        return axios.get(`http://inecnews.com/wp-json/wp/v2/media/${media_id}`)
            .then((res) => {
                dispatch(displayImage(res.data.post, res.data.source_url));
            })
            .catch(error => handleError(error));
    };
}

function displayNews(posts) {
    return {
        type: DISPLAY_NEWS,
        payload: posts
    };
}

function displayImage(post_id, source_url){
    return {
      type: DISPLAY_IMAGE,
        payload: {
          post_id,
          source_url
      }
    };
}
