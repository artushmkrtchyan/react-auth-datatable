import jwt from 'jsonwebtoken';

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const isValidEmail = (email) => {
    const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
};

export const strReplaceAll = (str = '', search = '', replacement = '') =>
    str.split(search).join(replacement);

export const arrayInsertNewItem = (arr, idx, newItem) => [
    ...arr.slice(0, idx),
    newItem,
    ...arr.slice(idx + 1),
];

export const isValidToken = () => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            const decodeJwt = jwt.decode(token);
            if (decodeJwt) {
                const exp = decodeJwt.exp;
                if (exp && exp * 1000 > Date.now()) {
                    return true;
                }
            }
        }
        localStorage.removeItem('token');
        return false;
    } catch (e) {
        localStorage.removeItem('token');
        return false;
    }
};

export const sortArrayOfObject = (data, sortField, sortOrder) => {
    if (!sortField || !sortOrder) {
        return data;
    }
    try {
        const fields = sortField.split('.');
        const res = data.sort(function (a, b) {
            const nameA = fields[1]
                ? a[fields[0]]
                    ? a[fields[0]][fields[1]]
                    : ''
                : a[fields[0]];
            const nameB = fields[1]
                ? b[fields[0]]
                    ? b[fields[0]][fields[1]]
                    : ''
                : b[fields[0]];
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        if (sortOrder === 'desc') {
            return res.reverse();
        }

        return res;
    } catch (e) {
        console.log(e);
    }
};
