export interface topcard {
    bgcolor: string,
    icon: string,
    title: string,
    subtitle: string
}

export const topcards: topcard[] = [

    {
        bgcolor: 'success',
        icon: 'bi bi-people',
        title: '6500',
        subtitle: 'Cantidad de electores'
    },
    {
        bgcolor: 'danger',
        icon: 'bi bi-people',
        title: '3000',
        subtitle: 'Votos completos'
    },
    {
        bgcolor: 'warning',
        icon: 'bi bi-people',
        title: '3500',
        subtitle: 'Votos Faltantes'
    },
    {
        bgcolor: 'info',
        icon: 'bi bi-percent',
        title: '49%',
        subtitle: 'Porcentaje avance'
    },

]
