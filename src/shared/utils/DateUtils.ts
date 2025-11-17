export const formatDataInicio = (dataInicio: Date): string => {
    const d = new Date(dataInicio);
    d.setHours(0, 0, 0, 0);

    const offsetMinutes = d.getTimezoneOffset();
    const corrected = new Date(d.getTime() - offsetMinutes * 60 * 1000);
    return corrected.toISOString().split(".")[0];
};


export const formatDataFim = (dataFim: Date): string => {
    const d = new Date(dataFim);
    d.setHours(23, 59, 59, 999); // fim do dia

    const offsetMinutes = d.getTimezoneOffset();
    const corrected = new Date(d.getTime() - offsetMinutes * 60 * 1000);

    return corrected.toISOString().split(".")[0];
};
