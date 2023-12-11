import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { Link, useNavigate } from "react-router-dom"
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import { useForm, Controller } from 'react-hook-form'
import Banner from "../../../components/Banner"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Form } from "reactstrap"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { banner } from '../../../assets'
import { useDispatch, useSelector } from "react-redux"
import { USER_STATUS } from "../../../constants/user-constant"
import { encrypt, decrypt, parseHexString } from "../../../utility/Crypto"
import toast from "react-hot-toast"
import useJwt from "../../../auth/jwt/useJwt"
import jwtDefaultConfig from "../../../@core/auth/jwt/jwtDefaultConfig"

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
    '& .MuiFormControlLabel-label': {
        fontSize: '0.875rem',
        color: theme.palette.text.secondary
    }
}))

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required()
})
const config = useJwt.jwtConfig
const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [remember, setRemember] = useState(!!localStorage.getItem(jwtDefaultConfig.rememberUser))
    const isObjEmpty = (obj) => Object.keys(obj).length === 0

    const {
        setValue,
        control,
        register,
        formState: { errors },
        handleSubmit,
        getValues
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    // useEffect(() => {
    //     const rememberUser = localStorage.getItem(jwtDefaultConfig.rememberUser)
    //     const userRemember = localStorage.getItem(jwtDefaultConfig.storageUserRemember)
    //     if (rememberUser) {
    //         setValue("email", decrypt(parseHexString(JSON.parse(userRemember).email.split("@")[0]), JSON.parse(userRemember).email.split("@")[1]))
    //         setValue("password", decrypt(parseHexString(JSON.parse(userRemember).password.split("@")[0]), JSON.parse(userRemember).password.split("@")[1]))
    //     }
    // }, [])
    const onSubmit = (data) => {
        if (isObjEmpty(errors)) {
            localStorage.removeItem("userDataUser")
            localStorage.removeItem("accessTokenUser")
            // const emailCipher = encrypt(data.email)
            // const passwordCipher = encrypt(data["password"])
            // localStorage.setItem(
            //     config.storageUserRemember,
            //     JSON.stringify({
            //         email: emailCipher,
            //         password: passwordCipher
            //     })
            // )
            // if (remember) {
            //     localStorage.setItem(config.rememberUser, true)
            // } else {
            //     localStorage.removeItem(config.rememberUser)
            // }
            useJwt
                .login({ email: data.email, password: data.password })
                .then((res) => {
                    /* Login condition */
                    if (res?.data?.userData) {
                        const userData = res?.data?.userData.data
                        localStorage.setItem(config.storageUserData, JSON.stringify({ ...userData }))
                        localStorage.setItem(config.storageTokenKeyName, userData.token)
                        navigate("/", { state: { isLogin: true } })
                    }
                }
                )
                .catch((error) => {
                    switch (error?.response?.data?.errCode) {
                        case USER_STATUS.NOT_FOUND:
                            toast.error("Email doesn't exist!")
                            break
                        case USER_STATUS.INCORRECT_PASSWORD:
                            toast.error("Password is wrong!")
                            break
                        default:
                            break
                    }
                })
        }
    }
    return (
        <div id="login">
            <Banner title="Login" subtitle="Login" banner={banner} />
            <Box className='content-right'>
                <Box
                    sx={{
                        paddingTop: '30px',
                        height: '100%',
                        width: '100%',
                        alignItems: 'center',
                        mb: "20px",
                        mt: "20px",
                    }}
                >
                    <Box sx={{
                        borderRadius: "25px",
                        padding: "50px",
                        boxShadow: "0 0.5rem 1rem rgba(0,0,0,.1)",
                        height: '100%',
                        maxHeight: '700px',
                        width: '100%', maxWidth: 500, display: 'inline-block', position: 'relative', left: '50%', transform: 'translateX(-50%)',
                        textAlign: 'center', alignItems: 'center'
                    }}>
                        <Box sx={{ my: 6 }}>
                            <Typography sx={{ color: 'text.secondary', textAlign: 'left' }}>
                                Please sign-in to your account and start the adventure
                            </Typography>
                        </Box>
                        <Form autoComplete="off" className="auth-login-form mt-2" onSubmit={handleSubmit(onSubmit)}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='email'
                                    control={control}
                                    id="email"
                                    defaultValue={""}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            type='email'
                                            autoFocus
                                            label='Email'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.email)}
                                            placeholder='username@gmail.com'
                                        />
                                    )}
                                />
                                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
                            </FormControl>
                            <FormControl fullWidth sx={{ mb: 1.5 }}>
                                <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                                    Password
                                </InputLabel>
                                <Controller
                                    name='password'
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={""}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <OutlinedInput
                                            value={value}
                                            onBlur={onBlur}
                                            label='Password'
                                            onChange={onChange}
                                            id='auth-login-v2-password'
                                            error={Boolean(errors.password)}
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        sx={{ color: 'black' }}
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
                                    <FormHelperText sx={{ color: 'error.main' }} id=''>
                                        {errors.password.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <Box
                                sx={{
                                    mb: 1.75,
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <FormControlLabel
                                    label='Remember Me'
                                    control={<Checkbox checked={remember} onChange={e => setRemember(e.target.checked)} />}
                                />
                                <Typography variant='body2'>
                                    <Link to='/forgot-password' className='link'>Forgot Password?</Link>
                                </Typography>
                            </Box>
                            <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
                                Login
                            </Button>
                            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <Typography sx={{ color: 'text.secondary', mr: 2 }}>New on our platform?</Typography>
                                <Typography variant='body2'>
                                    <Link to="/register" className='link' sx={{ fontSize: '1rem' }}>
                                        Create an account
                                    </Link>
                                </Typography>
                            </Box>
                        </Form>
                    </Box>
                </Box>
            </Box>
        </div >
    );

}
export default Login