import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import { TwitterOutlined, UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, FacebookOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { withFormik } from "formik";
import * as yup from 'yup';
import { connect } from 'react-redux';
import { actLoginFetchData } from './reducer/actions';
import { useSelector } from 'react-redux';
import { GridLoader } from 'react-spinners';

import { CustomCard } from '@tsamantanis/react-glassmorphism';
import '@tsamantanis/react-glassmorphism/dist/index.css'
import './login.css';
import Loading from '../../../Loading';
function Auth(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  const value = useSelector(state => state.loginMovieReducer)
  const [loadingFlow, setLoadingFlow] = useState(false)
  useEffect(() => {
    setLoadingFlow(true)
    setTimeout(() => {
      setLoadingFlow(false)
    }, 3000)
  }, [])
  if (value.loading)
    return <GridLoader color='rgba(54, 215, 183, 1)' />
  if (localStorage.getItem("user"))
    return <Navigate replace to="/admin/movie" />;
  const renderNoti = () => {
    return (
      value.error && (
        <div className="alert alert-danger">{value.error.response.data.content}</div>
      )
    );
  };

  return (
    <>
      {
        loadingFlow ? <GridLoader color='rgba(54, 215, 183, 1)' />
          :
          <form onSubmit={handleSubmit} className='form__Login' style={{ padding: '250px' }}>
            <div className='row'>
              <div className='col-lg-12' >
                <CustomCard className="form_mobile"
                  style={{ display: 'flex', flexDirection: 'column', padding: '80px 150px' }}
                  effectColor='rgba(54, 215, 183, 1)' // required
                  color="#14AEFF" // default color is white
                  blur={5} // default blur value is 10px
                  borderRadius={0} // default border radius value is 10px
                >
                  <h1 className='mb-5' style={{ textAlign: 'center',color: 'ghostwhite',fontWeight:'700' }}>????ng nh???p</h1>
                  {renderNoti()}
                  <div>
                    <Input onChange={handleChange} className='mb-2' size="large" placeholder="T??i kho???n" name='taiKhoan' prefix={<UserOutlined />} />
                  </div>
                  <div className='text-danger'>{errors.taiKhoan}</div>
                  <div>
                    <Input.Password onChange={handleChange} className='mb-2'
                      placeholder="M???t kh???u" name='matKhau' prefix={<LockOutlined />}
                      size="large"
                      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                  </div>
                  <div className='text-danger'>{errors.matKhau}</div>
                  {/* onClick={() => } */}
                  <button type='submit' className="btn-4">Login</button>
                  <div className='mt-3' style={{ display: 'flex', justifyContent: 'center' }} >
                    <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0b4f8f' }} type="primary" shape="circle">
                      <FacebookOutlined />
                    </Button>
                    <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='ml-2' type="primary" shape="circle">
                      <TwitterOutlined />
                    </Button>
                  </div>
                </CustomCard>
              </div>
            </div>

          </form>
      }
    </>
  )
}
const LoginMovie = withFormik({
  mapPropsToValues: () => ({
    taiKhoan: '',
    matKhau: '',

  }),
  validationSchema: yup.object().shape({
    taiKhoan: yup.string().required('T??i kho???n kh??ng ???????c b??? tr???ng !!!'),
    matKhau: yup.string().min(6, 'T??i kho???n ph???i nhi???u h??n 6 k?? t???(*)').max(32, 'T??i kho???n kh??ng ???????c qu?? 32 k?? t???(*)')
  }),
  // Custom sync validation
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log(setSubmitting);
    console.log(values);
    props.dispatch(actLoginFetchData(values))
  },
  displayName: 'Login Movie',
})(Auth);
export default connect()(LoginMovie);