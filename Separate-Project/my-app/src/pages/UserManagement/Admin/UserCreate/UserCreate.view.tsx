import { LoadingButton } from '@mui/lab';
import { Card, Container, IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import Iconify from '../../../../components/Iconify';
import Page from "../../../../components/Page";
import { UserCreateViewProps } from './Types/Types';

export function UserCreateView(props: UserCreateViewProps) {
    const {
        methods,
        handleSubmit,
        onSubmit,
        showPassword,
        setShowPassword,
        isSubmitting,
        ContentStyle
    } = props

    return <>
        {/* @ts-ignore */}
        <Page Page title="User-Create" >
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        User Create
                    </Typography>
                </Stack>
                <Card>
                    <Container>
                        <ContentStyle>
                            <Typography variant="h6" gutterBottom>
                                User Form
                            </Typography>
                            <Typography sx={{ color: 'text.secondary', mb: 3 }}>View User Details.</Typography>
                            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                                <Stack spacing={3}>
                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                        <RHFTextField name="firstName" label="First name" />
                                        <RHFTextField name="lastName" label="Last name" />
                                    </Stack>

                                    <RHFTextField name="email" label="Email address" />

                                    <RHFTextField
                                        name="password"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                                                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} sx={undefined} />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Stack spacing={3}>
                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}> 
                                            <LoadingButton fullWidth size="large" type="button" variant="contained" loading={isSubmitting}>
                                                Cancel
                                            </LoadingButton>
                                            <LoadingButton fullWidth size="large" type="button" variant="contained" loading={isSubmitting}>
                                                Reset
                                            </LoadingButton>
                                            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                                                Create
                                            </LoadingButton>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </FormProvider>
                        </ContentStyle>
                    </Container>

                </Card>
            </Container>
        </Page>
    </>
}