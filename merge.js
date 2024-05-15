// 獲取 CalloutCarStatusResponse 和 CalloutAlcoholInfoResponse 變量
var carStatusResponse = context.getVariable("CalloutCarStatusResponse");
var alcoholInfoResponse = context.getVariable("CalloutAlcoholInfoResponse");

// 檢查變量是否存在並且是有效的 JSON 字符串
if (carStatusResponse && alcoholInfoResponse) {
  try {
    var carStatus = JSON.parse(carStatusResponse);
    var alcoholInfo = JSON.parse(alcoholInfoResponse);

    // 檢查 carStatus 和 alcoholInfo 是否包含 result 屬性
    if (carStatus.result && alcoholInfo.result) {
      var carResult = carStatus.result;
      var alcoholResult = alcoholInfo.result;

      // 檢查 carNumber 是否相同
      if (carResult[0].carNumber === alcoholResult[0].carNumber) {
        // 將 alcohol_info 加入 carResult 中
        for (var i = 0; i < carResult.length; i++) {
          carResult[i].alcohol_info = alcoholResult;
        }

        var response = {
          responseMsg: carStatus.responseMsg,
          result: carResult,
          failResult: null,
          responseStatus: carStatus.responseStatus,
        };

        // 設置 response
        context.setVariable("response.content", JSON.stringify(response));
      } else {
        // carNumber 不相同，返回錯誤
        context.setVariable(
          "response.content",
          JSON.stringify({
            responseMsg: "ERROR",
            result: null,
            failResult: "carNumber mismatch between carStatus and alcoholInfo",
            responseStatus: 400,
          })
        );
      }
    } else {
      // 處理缺少 result 屬性的情況
      throw new Error("Missing 'result' property in carStatus or alcoholInfo");
    }
  } catch (e) {
    // 處理 JSON 解析錯誤或其他錯誤
    context.setVariable(
      "response.content",
      JSON.stringify({
        responseMsg: "ERROR",
        result: null,
        failResult: e.message,
        responseStatus: 500,
      })
    );
  }
} else {
  // 處理缺少變量的情況
  context.setVariable(
    "response.content",
    JSON.stringify({
      responseMsg: "ERROR",
      result: null,
      failResult:
        "Missing CalloutCarStatusResponse or CalloutAlcoholInfoResponse",
      responseStatus: 500,
    })
  );
}
