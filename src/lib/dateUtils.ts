
import { format, isToday, isYesterday, formatDistanceToNow } from 'date-fns';

export const formatLeadDate = (dateString: string | Date) => {
    const date = new Date(dateString);

    if (isToday(date)) {
        return `Today at ${format(date, 'p')}`;
    }

    if (isYesterday(date)) {
        return 'Yesterday';
    }

    // If within last 3 days, show 'X hours ago' style for richness
    if (Date.now() - date.getTime() < 3 * 24 * 60 * 60 * 1000) {
        return formatDistanceToNow(date, { addSuffix: true });
    }

    return format(date, 'MMM d, yyyy');
};
