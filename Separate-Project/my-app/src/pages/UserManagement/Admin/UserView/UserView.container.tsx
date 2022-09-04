import { yupResolver } from '@hookform/resolvers/yup';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserViewView } from "./UserView.view";

export default function UserViewContainer() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string().required('First name required'),
        lastName: Yup.string().required('Last name required'),
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const defaultValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
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

    return <UserViewView {...props} />
}