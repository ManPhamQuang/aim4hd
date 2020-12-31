const setTokenHeader = (token) => {
    return {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
};

export default setTokenHeader;
