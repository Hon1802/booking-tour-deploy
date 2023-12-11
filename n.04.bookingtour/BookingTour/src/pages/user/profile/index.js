import React, { useEffect, useState } from 'react'
import Banner from '../../../components/Banner'
import { banner } from '../../../assets'
import classnames from 'classnames'
import avatar from '../../../assets/profile/no_avatar.png'
import { Row, Col, Label, Input, Form } from 'reactstrap'
import { Controller, useForm } from "react-hook-form"
import Uppy from "@uppy/core"
import { useDispatch, useSelector } from 'react-redux'
import ErrorNotificationToast from "../../../components/toast/ToastFail"
import SuccessNotificationToast from "../../../components/toast/ToastSuccess"
import toast from "react-hot-toast"
import FormHelperText from '@mui/material/FormHelperText'
import thumbnailGenerator from "@uppy/thumbnail-generator"
import Button from '@mui/material/Button'
import Select from "react-select"
import { Edit, X, Check } from "react-feather"
import { DragDrop } from "@uppy/react"
import ResetPasswordPopup from "./resetPasswordPopup"
import { getUserInfoById } from "../store/action"
import { useNavigate } from 'react-router-dom'
import FormControl from '@mui/material/FormControl'
import axios from "axios"
import { configHeader } from '../../../@core/plugin/configHeader'
import { isObjEmpty, checkPassword } from "../../../utility/Utils"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField } from '@mui/material'
import { logout } from "../../../redux/actions/auth"
const options = () => {
    return [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" }
    ]
}
const TourDetail = () => {
    const [isChoose, setIsChoose] = useState(false)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [isDisable, setIsDisable] = useState(true)
    const store = useSelector(state => state.user?.userInfo)
    const [data, setData] = useState(JSON.parse(localStorage.getItem("userDataUser")))
    const [editData, setEditData] = useState(data)
    const [errorGender, setErrorGender] = useState(false)
    const [gender, setGender] = useState(data?.gender || "")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const schema = yup.object().shape({
        fullname: yup.string().required(),
        address: yup.string().required(),
        phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid')
    })
    useEffect(() => {
        setData(JSON.parse(localStorage.getItem("userDataUser")))
        dispatch(getUserInfoById(
            JSON.parse(localStorage.getItem("userDataUser"))._id,
            () => handleLogoutUser()
        ))
    }, [])
    const defaultValues = {
        fullname: data?.name,
        address: data?.address,
        phoneNumber: data?.phoneNumber,
        gender: data?.gender
    }
    const {
        control,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })
    const uppy = new Uppy({
        meta: { type: "avatar" },
        autoProceed: true,
        restrictions: { allowedFileTypes: ["image/*"] }
    })

    uppy.use(thumbnailGenerator)
    uppy.on("thumbnail:generated", (file, preview) => {
        data.avatar_file = file.data
        setEditData({ ...editData, avatar: preview.toString(), urlAvatar: file.data })

        setIsChoose(true)
    })
    const handleLogoutUser = () => {
        dispatch(logout(
            data?._id,
            setLoading,
            () => navigate("/")
        ))
        localStorage.removeItem("userDataUser")
        localStorage.removeItem("accessTokenUser")
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleReset = () => {
        data.avatar_file = null
        setEditData({ ...editData, avatar: "", urlAvatar: "" })
        setIsChoose(false)
    }
    const handleSave = async () => {
        const userId = JSON.parse(localStorage.getItem("userDataUser"))._id
        if (editData?.urlAvatar) {
            const formData = new FormData()
            formData.append("id", userId)
            formData.append("image", editData?.urlAvatar)
            const result = await axios.post("/api/upload-avatar", formData, configHeader)

            if (result?.data?.message) {
                dispatch(getUserInfoById(userId), () => navigate("/unauthorized"))
                toast.success(<SuccessNotificationToast message={result?.data?.message} />)
                setIsChoose(false)
            }
        }
    }
    const onSubmit = e => {
        if (isObjEmpty(errors)) {
            const userData = {}
            userData.id = data._id
            userData.fullname = e.fullname
            userData.address = e.address
            userData.phoneNumber = e.phoneNumber
            userData.gender = gender.value
            axios.post("/api/update-by-id", userData, configHeader)
                .then(res => {
                    toast.success(<SuccessNotificationToast message={res?.data?.userData?.errMessage} />)
                    dispatch(getUserInfoById(
                        JSON.parse(localStorage.getItem("userDataUser"))._id,
                        () => handleLogoutUser()
                    ))
                    setIsDisable(true)
                })
                .catch(err => {
                    if (err.response.data.message) {
                        toast.error(<ErrorNotificationToast message={err.response.data.message} />)
                    } else {
                        toast.error(<ErrorNotificationToast message={"Something's wrong with one or more field!"} />)
                    }
                })
        }
    }
    return (
        <div id="profile">
            <Banner banner={banner} title={"Profile"} subtitle={"Profile"} />
            <div className="wrapper">
                <Row>
                    <Col lg={4} sm={6} xs={12} className="mb-3">
                        <div className="position-relative">
                            <div className="profile-img-container d-flex align-items-center">
                                <div className="profile-img">
                                    {!isChoose ? (
                                        <div className="edit-avatar rounded">
                                            <Edit size={20} />
                                            <div className="uppy-wrapper">
                                                <DragDrop uppy={uppy} locale={{ strings: { dropHereOr: "", browse: "" } }} />
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="edit-avatar rounded check" onClick={handleSave}>
                                                <Check size={20} />
                                            </div>
                                            <div className="edit-avatar rounded close" onClick={handleReset}>
                                                <X size={20} />
                                            </div>
                                        </>
                                    )}
                                    <img className="rounded img-fluid w-100 h-100 object-fit-cover" src={editData?.avatar || `data:image/jpeg;base64, ${store?.avatarBase64}`} alt="Card image" />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={8} sm={6} xs={12} className="mb-3">
                        <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col lg={6} sm={6} xs={12} className="mb-3">
                                    <FormControl fullWidth sx={{ mb: 3 }}>
                                        <Label htmlFor='auth-login-v2-password' className="text-left" error={Boolean(errors.fullname)}>
                                            Full name
                                        </Label>
                                        <Controller
                                            name='fullname'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <TextField
                                                    disabled={isDisable}
                                                    autoFocus
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    placeholder='Enter full name'
                                                    error={Boolean(errors.fullname)}
                                                />
                                            )}
                                        />
                                        {errors.fullname && (
                                            <FormHelperText sx={{ color: 'error.main' }}>{errors.fullname.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Col>
                                <Col lg={6} sm={6} xs={12} className="mb-3">
                                    <FormControl fullWidth className="mb-3">
                                        <Label className="form-label" for="phoneNumber" error={Boolean(errors.phoneNumber)}>
                                            Phone number
                                        </Label>
                                        <Controller
                                            name='phoneNumber'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <TextField
                                                    disabled={isDisable}
                                                    autoFocus
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    placeholder='Enter phoneNumber'
                                                    error={Boolean(errors.phoneNumber)}
                                                />
                                            )}
                                        />
                                        {errors.phoneNumber && (
                                            <FormHelperText sx={{ color: 'error.main' }}>{errors.phoneNumber.message}</FormHelperText>
                                        )}

                                    </FormControl>
                                </Col>
                                <Col lg={6} sm={6} xs={12} className="mb-3">
                                    <FormControl fullWidth sx={{ mb: 3 }}>
                                        <Label htmlFor='auth-login-v2-password' error={Boolean(errors.address)}>
                                            Destination
                                        </Label>
                                        <Controller
                                            name='address'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <TextField
                                                    disabled={isDisable}
                                                    autoFocus
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    placeholder='Enter address'
                                                    error={Boolean(errors.address)}
                                                />
                                            )}
                                        />
                                        {errors.address && (
                                            <FormHelperText sx={{ color: 'error.main' }}>{errors.address.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Col>
                                <Col lg={6} sm={6} xs={12} className="mb-3">
                                    <Label className="form-label" for="gender">
                                        Gender
                                    </Label>
                                    <Select
                                        styles={{
                                            valueContainer: (provided, state) => ({
                                                ...provided,
                                                height: '58px',
                                                padding: '0 6px'
                                            }),
                                        }}
                                        className="gender"
                                        classNamePrefix="select"
                                        isLoading={false}
                                        isClearable={false}
                                        isDisabled={isDisable}
                                        placeholder={gender || "Select gender"}
                                        isRtl={false}
                                        isSearchable={true}
                                        name="gender"
                                        options={options()}
                                        value={gender}
                                        onChange={(value) => {
                                            setErrorGender(false)
                                            setGender(value)
                                        }}
                                    />
                                </Col>
                                <Col lg={6} sm={6} xs={12} className="mb-3">
                                    <FormControl fullWidth sx={{ mb: 3 }}>
                                        <Label htmlFor='auth-login-v2-password'>
                                            Email
                                        </Label>
                                        <TextField
                                            disabled
                                            id="email"
                                            autoComplete="off"
                                            autoFocus
                                            defaultValue={data?.email}
                                        />
                                    </FormControl>
                                </Col>
                                <Col lg={6} sm={6} xs={12} className="mb-3">
                                    <FormControl fullWidth sx={{ mb: 3 }}>
                                        <Label for="password">
                                            Password
                                        </Label>
                                        <TextField
                                            disabled
                                            id="password"
                                            type="password"
                                            autoComplete="off"
                                            autoFocus
                                            defaultValue={data?.password}
                                        />
                                        <p onClick={handleClickOpen} className="text-link">Reset password</p>
                                    </FormControl>
                                </Col>
                                <Col lg={12} sm={6} xs={12} className="mb-3 d-flex justify-content-end">
                                    {
                                        isDisable ?
                                            <div className="btn-edit" size='large' variant='contained' type="button" sx={{ mb: 4 }} onClick={() => setIsDisable(false)}>
                                                <div className='btn-text'>
                                                    Edit
                                                </div>
                                            </div>
                                            : <Button size='large' variant='contained' type="submit" sx={{ mb: 4 }}>
                                                Save changes
                                            </Button>
                                    }
                                </Col>
                                {/* <Button size='large' variant='contained' type="submit" sx={{ mb: 4 }}>
                                    Save changes
                                </Button> */}
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </div>
            <ResetPasswordPopup
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
            />

        </div >
    )
}
export default TourDetail;