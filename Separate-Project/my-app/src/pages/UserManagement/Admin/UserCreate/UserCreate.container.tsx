import { yupResolver } from '@hookform/resolvers/yup';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserCreateView } from "./UserCreate.view";


export default function UserCreateContainer() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    //regex patterns
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const nicRegExp = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string().required('First name required'),
        lastName: Yup.string().required('Last name required'),
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
        contactNumber: Yup.string().matches(phoneRegExp, "Phone Number is not valid").required("phone number is required"),
        nic: Yup.string().matches(nicRegExp, "Nic is not validated").required("Nic is required")
    });

    const defaultValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        contactNumber: ''
    };

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async (e: any) => {
        console.log(e)
        navigate('/dashboard/user-management/admin/list', { replace: true });
    };

    //styling
    const ContentStyle = styled('div')(({ theme }) => ({
        // maxWidth: 480,
        margin: 'auto',
        // minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: theme.spacing(3, 0),
    }));

    const props = {
        methods,
        handleSubmit,
        onSubmit,
        showPassword,
        setShowPassword,
        isSubmitting,
        ContentStyle
    }

    return <UserCreateView {...props} />
}