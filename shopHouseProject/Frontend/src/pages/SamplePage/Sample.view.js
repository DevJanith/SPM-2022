// material
import { Container, Grid, Stack, Typography } from '@mui/material';
// components
import Page from '../../components/Page';


export function SamplePageView(props) {
    const {
        name,
        test
    } = props

    return (
        <Page title="Dashboard: Sample">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Sample Page
                    </Typography>
                </Stack> 

                {/* you're content */}
                {test}
            </Container>
        </Page> 
    )
}