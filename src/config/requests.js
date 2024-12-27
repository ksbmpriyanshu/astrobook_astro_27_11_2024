import axios from 'axios';

class _ApiRequests {
  post_header = {
    'Content-Type': 'multipart/form-data',
  };
  get_header = {
    'Content-Type': 'application/json',
  };

  postRequest = async ({url = null, data = null}) => {
    try {
      const response = await axios({
        method: 'post',
        url: url,
        headers: this.post_header,
        data: data,
      });
      return response.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  getRequest = async ({url = null}) => {
    try {
      const response = await axios({
        method: 'post',
        url: url,
        headers: this.get_header,
      });
      return response.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
}

export const ApiRequests = new _ApiRequests();
