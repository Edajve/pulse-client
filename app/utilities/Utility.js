 export const dynamicStatusColor = (status) => {
        switch (status) {
            case "PROGRESS":
                return 'text-yellow-600';
            case "ACTIVE":
                return 'text-green-600';
            case "FINISHED":
                return 'text-blue-600';
            case "CANCELLED":
                return 'text-red-600';
            default:
                return 'text-grey-100';
        }
    }