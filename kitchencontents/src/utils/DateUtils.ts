
import moment from 'moment';

export const formatDateYMD = (date: string) => {
    let formattedDate = moment(date).utcOffset(0).format("YYYY-MM-DD");
    return formattedDate;
}