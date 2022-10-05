import constants from "../constants"
import httpHelper from "../httpHelper"

const getIssues = async (setIssues, setApiError) => {
    await httpHelper('issue', 'GET')
        .then(response => {
            if (!response.ok) {
                throw new Error(constants.API_ERROR);
            }
            return response.json();
        })
        .then(data => setIssues(data))
        .catch(() => setApiError(true));
}

const addIssue = async (newIssue, setIssues, setApiError) => {
    await httpHelper('issue', 'POST', newIssue)
        .then(response => {
            if (!response.ok) {
                throw new Error(constants.API_ERROR);
            }
            return response.json();
        })
        .then(data => setIssues(data))
        .catch(() => setApiError(true));
}

export { getIssues, addIssue };