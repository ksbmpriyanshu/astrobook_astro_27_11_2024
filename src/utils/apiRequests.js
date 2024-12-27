import axios from 'axios'
import moment from 'moment'
import RNFetchBlob from 'rn-fetch-blob'
import { encode as btoa } from 'base-64';
import { showToastMessage } from './services';

if (typeof global.btoa === 'undefined') {
    global.btoa = btoa;
  }



export const postRequest = async ({ url = null, data = null, header = 'json' }) => {
    try {
        const response = await axios({
            method: 'post',
            url: url,
            headers: {
                'Content-Type': header == 'json' ? 'application/json' : 'multipart/form-data'
            },
            data: data
        })

        if (response?.data) {
            return response?.data
        }
        return null

    } catch (e) {
        console.log(e,"error")
        // showToastMessage({message:'Network Error'})
        return null
    }
}

export const getRequest = async ({ url = null, data = null }) => {
    try {
        const response = await axios({
            method: 'get',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.data) {
            return response.data
        }
        return null

    } catch (e) {
        console.log(e)
        return null
    }
}

export const blobRequest = async ({ url = null, data = null }) => {
    try {
        const response = await RNFetchBlob.fetch(
            'POST',
            url,
            {
                'Content-Type': 'multipart/form-data',
            },
            data
        )

        return JSON.parse(response.data)

    } catch (e) {
        console.log(e)
        return null
    }
}

export const kundliRequest = async ({ url = null, data = null, header = 'json' }) => {
    try {
        const credentials = `${630051}:${'861bba6a92587a326a9b11ab9dfb9b7ca3492fab'}`;
        const token = btoa(credentials);

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Basic ${token}`);

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (e) {
        console.error(e);
        return null;
    }
};

