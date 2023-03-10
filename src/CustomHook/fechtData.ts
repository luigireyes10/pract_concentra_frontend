import { postRequest } from "../apicall";
import  { AxiosResponse } from 'axios'

const getSuspender =  (promise: any) => {
    let status = "pending";
    let response: any;
  
    const suspender =  promise.then(
      (res: any) => {
        status = "success";
        response = res;
      },
      (err: any) => {
        status = "error";
        response = err;
      }
    );
  
    const read =  () => {
      switch (status) {
        case "pending":
          throw suspender;
        case "error":
          throw response;
        default:
          return response;
      }
    };
  
    return { read };
  };
  
  export  function  fetchData(url: any, data:any = '') {



 
    const options = {
        method:"POST" ,
        body: data,
        headers: {
            "Content-Type": "application/json"
           }
        };

    const promise =  fetch(url , options)
      .then((response) => {return response.json()})
      .then((json) => {return json});
  
    return getSuspender(promise);
  }
