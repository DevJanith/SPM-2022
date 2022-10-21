import { PaymentDialogBoxView } from "./PaymentDialogBox.view"

export default function PaymentDialogBoxContainer(containerProps) {

    const props = {
        ...containerProps
    }

    return <PaymentDialogBoxView {...props} />
}