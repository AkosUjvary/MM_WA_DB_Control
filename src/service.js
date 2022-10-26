export const BASE_URL = "https://mm-dbloader.azurewebsites.net/api/mm-wa-api?code=0I1DbdzAAKItPOJK3RSYwGojK8UhLi4dX_5P4vCZXEg-AzFu-kuMcw==&";

export const service = {
    load: () => {
        return fetch(encodeURI(BASE_URL + "fnc=lparam"), { method: 'post' });
    },
    save: (body) => {
        return fetch(encodeURI(BASE_URL + "fnc=sparam"), { method: 'post', body: JSON.stringify(body) });
    },
    listfiles: (body) => {
        if (!body) {
            body = {"folder": "filmlist_imdbid"};
        }

        return fetch(encodeURI(BASE_URL + "fnc=listfiles"), { method: 'post', body: JSON.stringify(body) });
    },
    view: (body) => {
        if (!body) {
            body = {"file":"output/filmlist_omdb/filmlist_omdb_12_1970_1974_global"};
        }

        return fetch(encodeURI(BASE_URL + "fnc=viewfile"), { method: 'post', body: JSON.stringify(body) });
    }
};
