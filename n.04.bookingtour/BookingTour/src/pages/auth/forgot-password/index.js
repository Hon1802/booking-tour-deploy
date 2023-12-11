import Button from '@mui/material/Button'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Link } from "react-router-dom"
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { useForm, Controller } from 'react-hook-form'
import Banner from "../../../components/Banner"
import { Form } from "reactstrap"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { banner } from '../../../assets'


const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
})

const ForgotPassword = () => {
    const [showPassword, setShowPassword] = useState(false)
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

    const onSubmit = (data) => {
        console.log(data.email)
    }
    return (
        <div id="login">
            <Banner title="Forgot Password" subtitle="Forgot password" banner={banner} />
            <Box className='content-right' >
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
                        my: 6,
                        borderRadius: "25px",
                        padding: "50px",
                        boxShadow: "0 0.5rem 1rem rgba(0,0,0,.1)",
                        height: '100%',
                        maxHeight: '700px',
                        width: '100%', maxWidth: 500, display: 'inline-block', position: 'relative', left: '50%', transform: 'translateX(-50%)',
                        textAlign: 'center', alignItems: 'center'
                    }}>
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
                            <Box
                                sx={{
                                    mb: 1.75,
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                            </Box>
                            <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
                                Reset password
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
export default ForgotPassword