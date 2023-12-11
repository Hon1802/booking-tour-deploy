import { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Label, Form } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import toast from 'react-hot-toast';
import SuccessNotificationToast from '../../../../components/toast/ToastSuccess';
import FailNotificationToast from '../../../../components/toast/ToastFail';
import axios from 'axios';
import { configHeader } from '../../../../@core/plugin/configHeader';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const schema = yup.object().shape({
    password: yup.string().required(),
    newPassword: yup.string().required()
})

const ResetPasswordPopup = (props) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [errorConfirm, setErrorConfirm] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const onSubmit = (e) => {
        if (confirmPassword !== e.newPassword) {
            setErrorConfirm(true)
            return
        }
        else {
            const body = {
                id: JSON.parse(localStorage.getItem("userDataUser"))._id,
                oldPassword: e.password,
                newPassword: e.newPassword
            }
            axios.post("/api/update-password", body, configHeader).then((response) => {
                if (response?.data?.userData?.status === 200) {
                    props.handleClose()
                    navigate('/profile')
                    toast.success(<SuccessNotificationToast message={response?.data?.userData?.errMessage} />)
                }
            }).catch((e) => {
                toast.error(<FailNotificationToast message={e?.response?.data?.userData?.errMessage} />)
            })
        }
    }

    return (
        <div id="ticket">
            <BootstrapDialog
                onClose={props.handleClose}
                aria-labelledby="customized-dialog-title"
                open={props.open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Reset password
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={props.handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent dividers>
                        <FormControl fullWidth className='mb-3'>
                            <Label htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                                Current Password
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
                        <FormControl fullWidth className='mb-3'>
                            <Label htmlFor='auth-login-v2-password' error={Boolean(errors.newPassword)}>
                                New Password
                            </Label>
                            <Controller
                                name='newPassword'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <OutlinedInput
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        error={Boolean(errors.newPassword)}
                                        type={showNewPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    edge='end'
                                                    onMouseDown={e => e.preventDefault()}
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                >
                                                    {showNewPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                )}
                            />
                            {errors.newPassword && (
                                <FormHelperText sx={{ color: 'error.main' }}>New password is a required field</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth className='mb-3'>
                            <Label htmlFor='auth-login-v2-password'>
                                Confirm Password
                            </Label>

                            <OutlinedInput
                                type="password"
                                id='auth-login-v2-password'
                                onChange={(e) => {
                                    setErrorConfirm(false)
                                    setConfirmPassword(e.target.value)
                                }}
                            />


                            {errorConfirm && (
                                <FormHelperText sx={{ color: 'error.main' }}>Confirm password not match</FormHelperText>
                            )}
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus type="submit" >
                            Confirm
                        </Button>
                        <Button autoFocus onClick={props.handleClose}>
                            Close
                        </Button>
                    </DialogActions>
                </Form>
            </BootstrapDialog>
        </div >
    );
}

export default ResetPasswordPopup