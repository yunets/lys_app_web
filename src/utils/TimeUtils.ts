export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;


}


export function getDaysDifference(date1: string, date2: string) {

    // 将字符串转换为Date对象  
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    // 确保日期字符串格式正确，例如 "YYYY-MM-DD"  
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
        return false;
    }

    // 计算两个日期之间的差异（以毫秒为单位）  
    const diff = Math.abs(d2.getTime() - d1.getTime());

    // 天 = 7 * 24 * 60 * 60 * 1000 毫秒  
    const daysInMilliseconds = 24 * 60 * 60 * 1000;

    // 检查差异是否小于或等于7天（以毫秒为单位）  
    return diff / daysInMilliseconds;
}

