const defaultUrl = "http://localhost:3001";

const getApiUrl = () => {
    const url = localStorage.getItem('apiUrl');
    return url === null ? defaultUrl : url;
}

const setApiUrl = (url) => {
    localStorage.setItem('apiUrl', url);
}

module.exports = {
    getApiUrl,
    setApiUrl
}