

export const formatDateTime = (isoString: string): string => {
    const date = new Date(isoString);

    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        hour12: true 
    };

    return date.toLocaleString('en-US', options);
};


export function getDateOnly(dateTimeString:string) {
    return dateTimeString.split('T')[0];
}

export function formatDate(dateString:string) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit'
    }).format(date);
}