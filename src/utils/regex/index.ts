/* eslint-disable*/
export const noSpaceAtBeginning = /(^\s*)/gi
export const noSpaceAtBeginningAndLast = /(^\s*)|(\s*$)/gi
export const fixDoubleSpacing = /[ ]{2,}/gi
export const fixSpacing = /\n +/
export const emailInputFormat = /(?!.*\.{2}(?:(?=(\\?))\2.)*?\1)^([a-z\d]+)([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0](\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0]+)*|((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0]))*(([ \t]*\r\n)?[ \t]+)){1,64}@(?![a-z\d\-\u00A0]*[.]{1}[a-z\d\-\u00A0]*[.]{1}[a-z\d\-\u00A0]*[.]{1})(([[]*(([a-z\d\-\u00A0]|[a-z\d\u00A0][a-z\d\-.:_~\u00A0][a-z\d\-\u00A0])\ ){0,255})*([a-z\d\u00A0]{1,253}|[a-z\d\u00A0][a-z\d\-.:_~\u00A0]{1,253}[a-z\d\u00A0]\]*)|(?:[A-Z0-9.-]+\.[A-Z]{2,4}|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\]))$/i
export const numberExp = /^[0-9]*$/
export const numberFullWidthExp = /^[０-９]*$/
export const alphaExp = /^[A-Za-z]+$/
export const alphaFullWidthExp = /^[Ａ-ｚ]+$/
export const alphaNumeric = /[^a-zA-Z0-9０-９Ａ-ｚ]/g
export const numberFullAndHalfWidth = /^[0-9０-９]*$/
export const aplhaFullAndHalfWidth = /^[A-Za-zＡ-ｚ]*$/
export const noWhiteSpace = /\s/
export const noDotinLast = /\.$/
export const invalidUrl1 = /[a-zA-Z]+\-\.[a-zA-Z]+$/
export const invalidUrl2 = /[a-zA-Z]+\+[a-zA-Z]+\.[a-zA-Z]+$/
export const invalidUrl3 = /[0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]\.[a-zA-Z0-9]+$/
export const invalidUrl4 = /[a-zA-Z\#]+\/[a-zA-Z\-]+$/
export const validDomain = /(www.)?(?!-)(?!\.)(?!.*?\.\.)([a-zA-Z0-9@%._~#=]+-*[a-zA-Z0-9@%._~#=]+)+.(?!-)[a-z]{1,24}\b([-a-zA-Z0-9@%_+.~?&//=:$]*)$/
export const validDoma1n = /(www.)?(?!-)([^-\s][a-zA-Z0-9@%._+~#=]+-*[a-zA-Z0-9@%._+~#=]+)+.(?!-)[^-\s][a-z]{1,24}\b([^-\s][-a-zA-Z0-9@%_+.~?&//=]*)$/
export const urlWais = /^wais:\/{2}(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(:\d+)?$/gi
export const urlPort = /((http|https):\/{2})+(www\.)?(?!\-)(\d+\.)+\d+(?!\-):([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])\?port=\5/gi
export const urlPortHTTP = /((http):\/{2})+(www\.)?(?!\-)(\d+\.)+\d+(?!\-):([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])\?port=\5/gi
export const urlPortHTTPS = /((https):\/{2})+(www\.)?(?!\-)(\d+\.)+\d+(?!\-):([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])\?port=\5/gi
export const httpAndhttps = /^(http|https):/
export const httpOnly = /^http?:/i
export const httpsOnly = /^https:/i
export const negativeNumber = /^[-]?[0-9０-９]*$/g
export const numberOnly = /^[0-9０-９]*$/g
export const allowNegativeDecimal = /^[-]?[0-9０-９]*\.?[0-9０-９]*$/g
export const allowDecimal = /^[0-9０-９]*\.?[0-9０-９]*$/g
export const digitsAndSpecialChars = /^[0-9#()+*-０－９＃（）＋＊－]*$/g
export const addComma = /\B(?=(\d{3})+(?!\d))/g
export const removeComma = /,/g
export const phoneNumberFormat = /^(((\(.[(（]{0,1}[+＋]{0,1}[0-9]+[)]{0,1}?\)|[+＋]{0,1}[0-9]+)[-―]{0,1}[0-9０－９]{1,4}[-―]{0,1}[0-9０－９]{1,4}[-―]{0,1}[0-9０－９]{1,4})*((?![*]{2}|[#]{2}|[#]{1}[*]{1}|[*]{1}[#]{1})((#{1}|[*]{1})((\d)+(#{1}|[*]{1}))*)(?![*]{2}|[#]{2}|[#]{1}[*]{1}|[*]{1}[#]{1}))*)$/g
export const singleHypenSpaceAndHypenWithNumber = /^(([0-9]{2,5}([-]?[0-9]{3,4}))$|^([A-Z0-9]{2,5}([ ]?[A-Z0-9]{1,4})))$/
export const hourFormatHMS = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/gm
export const hourFormatHM = /(?:[01]\d|2[0123]):(?:[012345]\d)/gm
export const dateFormatYMD = /^\d{4}[\-ｰ−\/\s]?((((0[13578])|(1[02]))[\-ｰ−\/\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\-ｰ−\/\s]?(([0-2][0-9])|(30)))|(02[\-ｰ−\/\s]?[0-2][0-9]))$/
export const dateFormatMDY = /^((0[1-9]|1[012])[-ｰ−/.](0[1-9]|[12][0-9]|3[01])[-ｰ−/.](19|20)\d\d)$|^((0[1-9]|1[012])[-ｰ−/.](0[1-9]|[12][0-9]|3[01])[-ｰ−/.](19|20)\d\d)$/
export const dateFormatDMY = /^((0[1-9]|[12][0-9]|3[01])[-ｰ−/.](0[1-9]|1[012])[-ｰ−/.](19|20)\d\d)$|^((0[1-9]|[12][0-9]|3[01])[-ｰ−/.](0[1-9]|1[012])[-ｰ−/.](19|20)\d\d)$/
export const dateFormatDMY2 = /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}|(([0-9])|([0-2][0-9])|([3][0-1]))\/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\/\d{4}$/
export const allNumbers = /^(\d*|\.*|\-|[0-9０-９]*)*$/g
export const numberCombination = /[0-9]{3} [0-9]{4}/g
