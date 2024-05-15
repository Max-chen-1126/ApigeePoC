var responseContent = JSON.parse(context.getVariable('response.content'));

// 函數將日期時間轉換為 ISO 格式
function convertToISO(dateTime) {
    // 將日期時間字串分割為日期和時間部分
    var parts = dateTime.split(' ');
    var dateParts = parts[0].split('-');
    var timeParts = parts[1].split(':');

    // 建立一個新的 Date 對象
    var date = new Date(
        Date.UTC(
            parseInt(dateParts[0], 10), // 年
            parseInt(dateParts[1], 10) - 1, // 月
            parseInt(dateParts[2], 10), // 日
            parseInt(timeParts[0], 10), // 時間
            parseInt(timeParts[1], 10), // 分鐘
            parseInt(timeParts[2], 10)  // 秒
        )
    );
    return date.toISOString();
}

// 函數將物件的鍵名轉換為小駝峰格式
function toCamelCase(obj) {
    var newObj = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var newKey = key.toLowerCase() === "id" ? "id" : key.charAt(0).toLowerCase() + key.slice(1);
            newObj[newKey] = obj[key];
        }
    }
    return newObj;
}

// 處理 result 數組中的每個對象
if (responseContent.result && Array.isArray(responseContent.result)) {
    responseContent.result = responseContent.result.map(function(item) {
        var newItem = toCamelCase(item);
        newItem.dateTime = convertToISO(newItem.dateTime);
        return newItem;
    });
}

// 將處理後的回應內容轉換回 JSON 字串
context.setVariable('response.content', JSON.stringify(responseContent));