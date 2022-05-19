module.exports = (injection) => {
    return [
        { usecase: require('./carros/consultarAnoModeloCarro')(injection), tags: { group: 'Carros' } },
        { usecase: require('./carros/consultarMarcasCarro')(injection), tags: { group: 'Carros' } },
        { usecase: require('./carros/consultarModelosCarro')(injection), tags: { group: 'Carros' } },
        { usecase: require('./carros/consultarValorModelo')(injection), tags: { group: 'Carros' } },
    ]
}