import notification from "antd/lib/notification"
import styled from 'styled-components'

export const showNotification = (data: any) => {
    switch (data?.type) {
      case 'success':
        data.style = { backgroundColor: '#f6ffed', border: '1px solid #b7eb8f' }
        break
      case 'info':
        data.style = { backgroundColor: '#e6f7ff', border: '1px solid #91d5ff' }
        break
      case 'warning':
        data.style = {
          backgroundColor: '#fffbe6',
          border: '1px solid #ffe58f',
        }
        break
      case 'error':
        data.style = {
          backgroundColor: '#fff2f0',
          border: '1px solid #ffccc7',
        }
        break
  
      default:
        return false
    }
   // @ts-ignore
    notification[data?.type](data) 
  }


  export const ContentContainer = styled.div`
  text-align: start;
  background-color: white;
  padding: 35px 20px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
`

export const FormContainer = styled.div`
  padding-left: 10px;
  padding-right: 20px;
`