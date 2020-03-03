export const calculateRate = (rate) => {
    return Math.round(rate+ 0.5) === Math.round(rate)
    ? Math.ceil(rate) - 0.5
    : Math.floor(rate)
}
