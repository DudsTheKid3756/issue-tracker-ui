import constants from './constants';

const httpHelper = (uri, method) => {
  fetch(`${constants.BASE_URL}/${uri}`, {});
};
