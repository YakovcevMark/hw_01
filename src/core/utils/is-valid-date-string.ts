export const isValidDateString = (dateString: string) => {
    const dateObject = new Date(dateString);
    return !isNaN(dateObject.getTime());
}