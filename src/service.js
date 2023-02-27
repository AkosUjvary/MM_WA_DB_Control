export const BASE_URL = "https://mm-dbloader.azurewebsites.net/api/mm-wa-api?code=0I1DbdzAAKItPOJK3RSYwGojK8UhLi4dX_5P4vCZXEg-AzFu-kuMcw==&";
//export const BASE_URL = "http://localhost:7071/api/mm-wa-api?"

export const service = {
    loadParam: () => {
        return fetch(encodeURI(BASE_URL + "fnc=lparam"), { method: 'post' });
    },
    saveParam: (body) => {
        return fetch(encodeURI(BASE_URL + "fnc=sparam"), { method: 'post', body: JSON.stringify(body) });
    },
    loadMapping: () => {
        return fetch(encodeURI(BASE_URL + "fnc=lmapping"), { method: 'post' });
    },
    saveMapping: (body) => {
        return fetch(encodeURI(BASE_URL + "fnc=smapping"), { method: 'post', body: JSON.stringify(body) });
    },
    loadCorr: () => {
        return fetch(encodeURI(BASE_URL + "fnc=lcorrections"), { method: 'post' });
    },
    loadSched: () => {
        return fetch(encodeURI(BASE_URL + "fnc=lsched"), { method: 'post' });
    },
    saveSched: (body) => {
        return fetch(encodeURI(BASE_URL + "fnc=ssched"), { method: 'post', body: JSON.stringify(body) });
    },
    saveCorr: (body) => {
        return fetch(encodeURI(BASE_URL + "fnc=scorrections"), { method: 'post', body: JSON.stringify(body) });
    },
    saveAddedCorr: (body) => {
        return fetch(encodeURI(BASE_URL + "fnc=saddedcorrs"), { method: 'post', body: JSON.stringify(body) });
    },
    listfiles: (body) => {
        if (!body) {
            body = {"folder": "filmlist_imdbid"};
        }

        return fetch(encodeURI(BASE_URL + "fnc=listfiles"), { method: 'post', body: JSON.stringify(body) });
    },
    view: (body) => {
        if (!body) {
            body = {"file":"output/filmlist_omdb/filmlist_omdb_999_2022_2022_global"};
        }

        return fetch(encodeURI(BASE_URL + "fnc=viewfile"), { method: 'post', body: JSON.stringify(body) });
    },
    deleteBlob: (body) => {
        return fetch(encodeURI(BASE_URL + "fnc=delblob"), { method: 'post', body: JSON.stringify(body) })
    }
};
