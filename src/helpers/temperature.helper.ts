const FahrenheitToCelsius = (temp: number) => {
    const celsius = (5 * (temp - 32) / 9).toFixed(1)
    return celsius
}

export default FahrenheitToCelsius