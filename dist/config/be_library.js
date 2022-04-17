"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderPage = exports.clearUndefined = void 0;
/**
 *
 * @param queryStr
 * @param clearStr
 * @returns Hàm chuyển chuỗi underfind thành null
 */
function clearUndefined(queryStr, clearStr) {
    do {
        queryStr = queryStr.replace(clearStr, 'null');
    } while (queryStr.indexOf(clearStr) >= 0);
    return queryStr;
}
exports.clearUndefined = clearUndefined;
/**
 *
 * @param query
 * @param total
 * @returns Hàm trả về trang hiện tại, limit, offset và total page
 */
function renderPage(query, total) {
    const dataPage = {
        page: +(query.page || 1),
        limit: +(query.limit || 10)
    };
    dataPage.offset = dataPage.page * dataPage.limit - dataPage.limit;
    if (total && total >= 0)
        dataPage.total = total;
    console.log(dataPage);
    return dataPage;
}
exports.renderPage = renderPage;
//# sourceMappingURL=be_library.js.map