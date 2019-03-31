/* @flow */
import axios from 'axios';

export const getShalat = (latlng: string) => {
  let url = `https://pure-scrubland-91075.herokuapp.com/api/${latlng}`;
  return axios(url)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err;
    });
};
