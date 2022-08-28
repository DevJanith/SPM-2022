// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../../components/Page';


export function FeedBackView(props) {
    // const {
    // } = props

    return (
        <Page title="Dashboard: FeedBack">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        FeedBack Page
                    </Typography>
                </Stack>

                {/* you're content */}
            </Container>
        </Page>
    )
}