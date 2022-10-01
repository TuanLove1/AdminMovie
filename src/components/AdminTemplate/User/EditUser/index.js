import { CustomCard } from '@tsamantanis/react-glassmorphism'
import React, {  useEffect, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { api } from '../../../../api/apiUtil';
import { actUpdateUser } from '../Update/actions'
const  EditUser = () => {
  const params = useParams()
  const [state,setState] = useState({
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDT: '',
      maNhom: 'GP10',
      maLoaiNguoiDung: 'Khách Hàng!',
      hoTen: '',
    })
 
    const dispatch = useDispatch();
  // state = {
  //   value: {
  //     taiKhoan: this.props.taiKhoan,
  //     matKhau: this.props.matKhau,
  //     email: this.props.email,
  //     soDt: this.props.soDT,
  //     maNhom: 'GP10',
  //     maLoaiNguoiDung: 'Khách Hàng!',
  //     hoTen: this.props.hoTen,
  //   }
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actUpdateUser(state));
  }
  useEffect(()=>{
    const editUser = async() => {
        const res = await api.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP10&tuKhoa=${params.id}`);
        console.log(res.data.content[0]);
        Object.assign(res.data.content[0], { maNhom: "GP10" });
        setState(res.data.content[0]);
    }
    editUser();
  },[])
  const handleOnChange = (e) => {
    let { value, id } = e.target;
    setState({
      ...state,
      [id]: value,
    })
  }
  // }
  // componentWillReceiveProps(newProps) { //Lifecycle này kích hoạt khi props của component thay đổi và trước khi render
  //   //Đem props gán vào state => giao diện binding từ state
  //   setState({
  //     value: newProps.user
  //   })
  // }
  // render() {
    // let { taiKhoan, matKhau, email, soDT, maNhom, maLoaiNguoiDung, hoTen } = this.state.value;
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CustomCard className="form_mobile"
          effectColor='rgba(54, 215, 183, 1)' // required
          color="#14AEFF" // default color is white
          blur={3} // default blur value is 10px
          borderRadius={0}
           // default border radius value is 10px
        >
          <h1 style={{color:'white'}}>Sửa Người Dùng</h1>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column',width:'80%',marginLeft:'10%',color:'#00d8ff;' }}>
            <label>
              Tài khoản:
            </label>
            <input id='taiKhoan' value={state.taiKhoan} disabled  name='taiKhoan' type="text" onChange={handleOnChange}
            />
            <label>Mật khẩu:
            </label>
            <input id='matKhau' value={state.matKhau} name='matKhau' type="text" onChange={handleOnChange} />

            <label>Email:</label>
            <input id='email' value={state.email} data-type={"emailType"} name='email' type="text" onChange={handleOnChange} />

            <label>Số điện thoại: </label>
            <input id='soDT' value={state.soDT} name='soDT' type="text" onChange={handleOnChange} />
            <label>Mã nhóm: </label>
            <input id='maNhom' value={state.maNhom} name='maNhom' type="text" onChange={handleOnChange} />
            <label>Mã loại người dùng:</label>
            <select id='maLoaiNguoiDung' value={state.maLoaiNguoiDung} name='maLoaiNguoiDung' onChange={handleOnChange} >
              <option value='KhachHang'>Khách Hàng</option>
              <option value='QuanTri'>Quản Trị</option>
            </select>

            <label>Họ tên:</label>
            <input id='hoTen' value={state.hoTen} name='hoTen' type="text" onChange={handleOnChange} />

            <button className='btn btn-primary mt-2' type='submit'>Update</button>
          </form>
          </CustomCard>
      </div>
    );
};
  // }
// }
// const mapStateToProps = (rootReducer) => {
//   return {
//     user: {
//       "taiKhoan": rootReducer.editUserReducer.data?.taiKhoan,
//       "matKhau": rootReducer.editUserReducer.data?.matKhau,
//       "email": rootReducer.editUserReducer.data?.email,
//       "soDT": rootReducer.editUserReducer.data?.soDT,
//       "maNhom": rootReducer.editUserReducer.data?.maNhom,
//       "maLoaiNguoiDung": rootReducer.editUserReducer.data?.maLoaiNguoiDung,
//       "hoTen": rootReducer.editUserReducer.data?.hoTen
//     }
//   }
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateUser: (user) => {
//       dispatch(actUpdateUser(user))
//     }
//   }
// }


// export default connect(mapStateToProps, mapDispatchToProps)(EditUser);

export default EditUser;


