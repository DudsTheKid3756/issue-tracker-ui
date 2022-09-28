import constants from '../constants';

export default async function getIssues() {
  const data = await fetch(`${constants.BASE_URL}/issues`);
  return await data.json();
}
