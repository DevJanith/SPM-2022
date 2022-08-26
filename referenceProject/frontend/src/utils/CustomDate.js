export default function customDate() {
    const currentDate = new Date().toISOString().slice(0, 10)
    return currentDate
}

