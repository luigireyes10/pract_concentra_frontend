
import Form from 'antd/lib/form'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { TableRowSelection } from 'antd/lib/table/interface'
import { ContentContainer, FormContainer, showNotification } from '../general'
import { Button, Col, DatePicker, Divider, Input, Row, Select, Table } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import Title from 'antd/es/typography/Title'
import {fetchData} from '../CustomHook/fechtData'
import {PATH_SERVE , PATH_POST_ONEPERMISO} from '../router'



const apiData = fetchData(PATH_SERVE)


const Permisos = (): React.ReactElement => {
  const [form] = Form.useForm()
  const data = apiData.read()
  const [apvApartado, setapvApartado] = useState<any>()


 useEffect(() => {
   if(apvApartado){
    dataOnePermiso()
   }
 }, [apvApartado])
 

  

 const dataOnePermiso = async  ()=>{
 
  const param = JSON.stringify({ID_PERMISO:apvApartado?.ID_TIPO_PERMISO})


const url= PATH_POST_ONEPERMISO 
  const options = {
    method:"POST" ,
    body: param,
    headers: {
        "Content-Type": "application/json"
       }
    };

const promise = await fetch(url , options)
  .then((response) =>{

    return response.json()
    })
  .then((json) =>   json);

     form.setFieldsValue({TIPOPERMISO: promise?.usuario?.TIPO_PERMISO})
     form.setFieldsValue({APELLIDO: promise?.usuario?.USUARIO_INSERCION})
     form.setFieldsValue({NOMBRE: promise?.usuario?.USUARIO_INSERCION})
     form.setFieldsValue({FECHA_ESTIMADA_PERMISO:  dayjs(promise?.usuario?.FECHA_INSERCION, 'YYYY/MM/DD') })
 }
 

  const columns = [
    {
      title: 'ID_PERMISO',
      dataIndex: 'ID_TIPO_PERMISO',
      key: 'ID_TIPO_PERMISO',
    },
    {
      title: 'TIPO_PERMISO',
      dataIndex: 'TIPO_PERMISO',
      key: 'TIPO_PERMISO',
      width: '15%',
    },
    {
      title: 'DESC_TIPO_PERMISO',
      dataIndex: 'DESC_TIPO_PERMISO',
      key: 'DESC_TIPO_PERMISO',
    },
    {
      title: 'ESTADO',
      dataIndex: 'ESTADO',
      key: 'ESTADO',
    },
    {
      title: 'FECHA PERMISO',
      dataIndex: 'FECHA_INSERCION',
      key: 'FECHA_INSERCION',
    },
  
  ]



  const saveData = async () => {
    try {
      const data = (await form.validateFields()) 

      showNotification({
        message: 'manda a guardar la data.',
        type: 'warning',
      })
     
       
   
    } catch (e) {
      showNotification({
        message: 'ocuurio un error.',
        type: 'error',
      })
    }
  }

  const rowSelection: TableRowSelection<any> = {

    type: 'radio',
    onChange: (_, record: any[]) => {
      const data = record[0]
      setapvApartado(data)
    },
  }

  return (
    <Row justify={'start'}>
      <Col span={24}>
        <ContentContainer>
          <Divider orientation={'left'}>
            <Title level={3}>PERMISOS  DE EMPLEADO</Title>
          </Divider>
          <Form
            form={form}
          >
            <FormContainer>
              <Row justify={'start'}>
                <Col span={12}>
                 

                  <FormItem 
                  label={'Nombre'} 
                  name={'NOMBRE'}
                  rules={[{ required: true }]}
                  >
                    <Input placeholder={'Nombre'}  />
                  </FormItem>

                  <FormItem
                    label={'Apellido'}
                    name={'APELLIDO'}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder={'Apellido'}  />
                  </FormItem>

                  <FormItem 
                  label={'Tipo Permiso'} 
                  name={'TIPOPERMISO'}
                  rules={[{ required: true }]}
                  >
                  <Select placeholder={'Tipo Permiso'} allowClear>
                      {data?.usuarios?.map(
                        (tipopermiso: any, index: number) => {
                          return (
                            <Select.Option
                              key={`${tipopermiso.ID_PERMISO}-${index}`}
                              value={`${tipopermiso.ID_TIPO_PERMISO}`}
                            >
                              {tipopermiso.TIPO_PERMISO}
                            </Select.Option>
                          )
                        }
                      )}
                    </Select>
                  </FormItem>

                 
                  <FormItem
                    label={'Fecha/Hora'}
                    name={'FECHA_ESTIMADA_PERMISO'}
                    rules={[{ required: true }]}
                  >
                    <DatePicker placeholder={'Fecha'} />
                  </FormItem>

                </Col>
              </Row>

              <Row justify={'start'}>
              
                <Col span={24}>
                  <Table
                      title={() => (
                        <Title level={4}>Lista de permisos</Title>
                      )}
                    bordered
                    rowSelection={rowSelection}
                    dataSource={
                      data?.usuarios
                    }
                    columns={columns}
                    rowKey={(record: any) => record?.ID_TIPO_PERMISO}
                    rowClassName="editable-row"
                  />
                </Col>

                <br />
                <br />
              
              </Row>

              <br />
              <br />
              <Row justify={'center'} align={'top'}>

              <Button
                  type={'primary'}
                  shape={'round'}
                >
                  Cancelar
                </Button>
                <Button
                  type={'primary'}
                  shape={'round'}
                  onClick={async () => await saveData()}
                >
                  Guardar
                </Button>


                <Button
                  type={'primary'}
                  shape={'round'}
                   disabled={apvApartado? false: true}
                >
                  ATUALIZAR
                </Button>
              </Row>
            </FormContainer>
          </Form>
        </ContentContainer>
      </Col>
    </Row>
  )
}
export default Permisos
