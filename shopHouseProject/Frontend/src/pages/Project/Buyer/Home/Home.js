import { Card, CardContent } from "@mui/material"
import { Container } from "@mui/system"
import Page from "../../../../components/Page"
import container1 from "./images/container1.jpg"
import container2 from "./images/container2.jpg"

export function Home() {

    return (
        <>
            <Page title="Home">
                <Container maxWidth="xl">
                    <Card>
                        <CardContent>
                            <img src={container1} />
                        </CardContent>
                    </Card>
                    <Card style={{ marginTop: "3%" }}>
                        <CardContent>
                            <img src={container2} />
                        </CardContent>
                    </Card>
                </Container>
            </Page>
        </>
    )
}