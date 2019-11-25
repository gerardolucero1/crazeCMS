const nombreCompuesto = value => {
    if (value == undefined || value == null || value == '') {
        return true
    }

    return /^(?! )(?!.*  )[a-zA-ZñÑ ]+$/.test(value)
}

export { nombreCompuesto }