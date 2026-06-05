function convertToDays(dateStr) {
    const [year, month, day] = dateStr.split('.').map(Number);
    return (year * 12 * 28) + (month * 28) + day;
}

function createMap(terms) {
    const map = new Map();
    
    terms.forEach(term => {
        const [type, month] = term.split(' ');
        map.set(type, Number(month) * 28); 
    });
    
    return map;
}

function solution(today, terms, privacies) {
    const answer = [];
    const todayDays = convertToDays(today);
    const termsMap = createMap(terms);
    
    privacies.forEach((privacy, index) => {
        const [date, type] = privacy.split(' ');
        const expiryDays = convertToDays(date) + termsMap.get(type);
 
        if (expiryDays <= todayDays) {
            answer.push(index + 1);
        }
    });
    
    return answer;
}