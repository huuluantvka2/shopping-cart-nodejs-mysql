/**
 * 
 * @param queryStr 
 * @param clearStr 
 * @returns Hàm chuyển chuỗi underfind thành null
 */
function clearUndefined(queryStr: string, clearStr: string) {
    do {
        queryStr = queryStr.replace(clearStr, 'null')
    } while (queryStr.indexOf(clearStr) >= 0)
    return queryStr
}
/**
 * 
 * @param query 
 * @param total 
 * @returns Hàm trả về trang hiện tại, limit, offset và total page
 */
function renderPage(query: any, total?: number) {
    const dataPage: any = {
        page: +(query.page || 1),
        limit: +(query.limit || 10)
    }
    dataPage.offset = dataPage.page * dataPage.limit - dataPage.limit
    if (total && total >= 0) dataPage.total = total
    console.log(dataPage)
    return dataPage
}
export { clearUndefined, renderPage }