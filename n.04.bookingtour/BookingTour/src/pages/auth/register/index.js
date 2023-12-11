// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Import
import { Link } from "react-router-dom"
import Banner from "../../../components/Banner"
// ** MUI Components
import Button from '@mui/material/Button'
import Select from "react-select"
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import { isObjEmpty, checkPassword } from "../../../utility/Utils"
import { banner } from "../../../assets"
import useJwt from "../../../auth/jwt/useJwt"
import { Label, Form } from 'reactstrap'
// ** Icon Imports
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ErrorNotificationToast from "../../../components/toast/ToastFail"
import SuccessNotificationToast from "../../..//components/toast/ToastSuccess"
// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import toast from "react-hot-toast"
const defaultValues = {
    email: '',
    fullname: '',
    password: '',
    address: '',
    phone: '',
    gender: ''
}


const options = () => {
    return [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" }
    ]
}
const Register = () => {
    // ** States
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [gender, setGender] = useState(null)
    const [errorGender, setErrorGender] = useState(false)

    // ** Vars
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const schema = yup.object().shape({
        password: yup.string().min(8).required(),
        fullname: yup.string().required(),
        email: yup.string().email().required(),
        address: yup.string().required(),
        phone: yup.string().matches(phoneRegExp, 'Phone number is not valid')
    })

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

    const onSubmit = e => {
        if (!gender) {
            setErrorGender(true)
            return
        }

        if (isObjEmpty(errors)) {
            const userData = {}
            userData.fullName = e.fullname
            userData.password = e.password
            userData.address = e.address
            userData.phone = e.phone
            userData.gender = gender.value
            userData.email = e.email.toLowerCase()

            useJwt
                .register(userData)
                .then((res) => {
                    setError(false)
                    setLoading(false)
                    toast.success(<SuccessNotificationToast message={"Sign up success"} />)
                    localStorage.setItem("userID", JSON.stringify({ id: res?.data?.data?.id, type: "Register" }))
                })
                .catch((err) => {
                    setLoading(false)
                    if (err.response.data.message) {
                        toast.error(<ErrorNotificationToast message={err.response.data.message} />)
                    } else {
                        toast.error(<ErrorNotificationToast message={"Something's wrong with one or more field!"} />)
                    }
                })
        }
    }
    return (
        <div>
            <Banner title="Register" subtitle="Register" banner={banner} />
            <Box className='content-right'>
                <Box
                    sx={{
                        paddingTop: '30px',
                        height: '100%',
                        mb: "20px",
                        mt: "20px",
                    }}
                >
                    <Box sx={{
                        borderRadius: "25px",
                        padding: "50px",
                        boxShadow: "0 0.5rem 1rem rgba(0,0,0,.1)",
                        height: '100%',
                        maxHeight: '1300px',
                        width: '100%', maxWidth: 500, display: 'inline-block', position: 'relative', left: '50%', transform: 'translateX(-50%)',
                        talignItems: 'center'
                    }}>
                        <Box sx={{ width: '100%', maxWidth: 400 }}>
                            <Box sx={{ my: 3 }}>
                                <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
                                    Adventure starts here 🚀
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>Make your app management easy and fun!</Typography>
                            </Box>
                            <Form autoComplete="off" className="auth-login-form mt-2" onSubmit={handleSubmit(onSubmit)}>
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
                                <FormControl fullWidth sx={{ mb: 3 }}>
                                    <Label htmlFor='auth-login-v2-password' error={Boolean(errors.email)}>
                                        Email
                                    </Label>
                                    <Controller
                                        name='email'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange, onBlur } }) => (
                                            <TextField
                                                value={value}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                error={Boolean(errors.email)}
                                                placeholder='user@email.com'
                                            />
                                        )}
                                    />
                                    {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
                                </FormControl>
                                <FormControl fullWidth className='mb-3'>
                                    <Label htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                                        Password
                                    </Label>
                                    <Controller
                                        name='password'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange, onBlur } }) => (
                                            <OutlinedInput
                                                value={value}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                id='auth-login-v2-password'
                                                error={Boolean(errors.password)}
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position='end'>
                                                        <IconButton
                                                            edge='end'
                                                            onMouseDown={e => e.preventDefault()}
                                                            onClick={() => setShowPassword(!showPassword)}
                                                        >
                                                            {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        )}
                                    />
                                    {errors.password && (
                                        <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
                                    )}
                                </FormControl>
                                <FormControl fullWidth className="form-group mb-4">
                                    <Label className="form-label" for="gender">
                                        Gender
                                    </Label>
                                    <Select
                                        styles={{ menuPortal: (base) => ({ ...base, fontSize: "1.1rem" }) }}
                                        className="gender"
                                        classNamePrefix="select"
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={false}
                                        isRtl={false}
                                        isSearchable={true}
                                        placeholder={"Select gender"}
                                        name="gender"
                                        options={options()}
                                        value={gender}
                                        onChange={(value) => {
                                            setErrorGender(false)
                                            setGender(value)
                                        }}
                                    />
                                    {errorGender && (
                                        <Label className="form-label" style={{ color: "#ea5455" }}>
                                            Please select your gender
                                        </Label>
                                    )}
                                </FormControl>
                                <FormControl fullWidth className="mb-3">
                                    <Label className="form-label" for="phone">
                                        Phone number
                                    </Label>
                                    <Controller
                                        name='phone'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange, onBlur } }) => (
                                            <TextField
                                                autoFocus
                                                value={value}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                placeholder='Enter phone'
                                                error={Boolean(errors.phone)}
                                            />
                                        )}
                                    />
                                    {errors.phone && (
                                        <FormHelperText sx={{ color: 'error.main' }}>{errors.phone.message}</FormHelperText>
                                    )}

                                </FormControl>
                                <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
                                    Sign up
                                </Button>
                                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <Typography sx={{ color: 'text.secondary', mr: 2 }}>Already have an account?</Typography>
                                    <Typography variant='body2'>
                                        <Link href='/login' sx={{ fontSize: '1rem' }}>
                                            Sign in instead
                                        </Link>
                                    </Typography>
                                </Box>
                            </Form>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default Register
