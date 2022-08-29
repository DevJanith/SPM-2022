import { SamplePageView } from "./Sample.view"

export default function SamplePageContainer() {

    const name = "Janith Gamage"

    const test = () => {
        return <>
            <h1>Function</h1>
        </>
    }


    const props = {
        name,
        test
    }

    return <SamplePageView  {...props} />
}