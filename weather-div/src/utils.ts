export type DivId = string | null | undefined;

const getDivById = (divId: DivId): HTMLDivElement | null => {
    if (divId) {
        return document.getElementById(divId) as HTMLDivElement | null;
    }
    return null;
};

const createDivInBody = (): HTMLDivElement => {
    const newDiv = document.createElement('div');
    newDiv.id = 'weather-forecast';
    document.body.insertBefore(newDiv, document.body.firstChild);
    return newDiv;
};

export const getOrCreateDiv = (divId: DivId): HTMLDivElement => {
    const div = getDivById(divId);
    return div ? div : createDivInBody();
};

export const isValidNumber = (value: string): boolean => {
    const numberRegex = /^-?\d+(\.\d+)?$/;
    return numberRegex.test(value);
}