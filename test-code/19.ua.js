/**
 * 只区分浏览器版本，不区分平台，包括PC, 移动端(IOS、安卓)等
 * @param {*} userAgent
 * @returns
 */
function getBrowserVersion(userAgent) {
  const ua = userAgent.toLowerCase()
  let s = null

  if ((s = ua.match(/chrome\/([\d.]+)/))) {
    return { browser: 'Chrome', version: s[1] }
  }
  // chrome for IOS
  if ((s = ua.match(/crios\/([\d.]+)/))) {
    return { browser: 'Chrome', version: s[1] }
  }

  // google app for IOS
  if ((s = ua.match(/gsa\/([\d.]+)/))) {
    return { browser: 'Google', version: s[1] }
  }

  if ((s = ua.match(/version\/([\d.]+).*safari/))) {
    return { browser: 'Safari', version: s[1] }
  }
  //  Line App for IOS
  if ((s = ua.match(/safari line\/([\d.]+)/))) {
    return { browser: 'Safari', version: s[1] }
  }

  if ((s = ua.match(/firefox\/([\d.]+)/))) {
    return { browser: 'Firefox', version: s[1] }
  }
  // firefox for IOS
  if ((s = ua.match(/fxios\/([\d.]+)/))) {
    return { browser: 'Firefox', version: s[1] }
  }

  if ((s = ua.match(/opera.([\d.]+)/))) {
    return { browser: 'Opera', version: s[1] }
  }

  if ((s = ua.match(/edge\/([\d.]+)/))) {
    return { browser: 'Edge', version: s[1] }
  }

  if ((s = ua.match(/rv:([\d.]+)\) like gecko/))) {
    return { browser: 'IE', version: s[1] }
  }
  if ((s = ua.match(/msie ([\d.]+)/))) {
    return { browser: 'IE', version: s[1] }
  }

  return { browser: 'unknown', version: '0' }
}


function getBrowserEnv(userAgent) {
  const ua = userAgent.toLowerCase()
  if (/windows|win32|win64|wow32|wow64/.test(ua)) {
    return 'Windows'
  }
  if (/macintosh|macintel/.test(ua)) {
    return 'MacOS'
  }
  if (/x11/.test(ua)) {
    return 'Linux'
  }
  if (/android/.test(ua)) {
    return 'Android'
  }
  if (/ios|iphone|ipad/.test(ua)) {
    return 'IOS'
  }

  if (/tizen/.test(ua)) {
    return 'Tizen'
  }

  return 'unknown'
}

function getBrowserPlatform(userAgent) {
  const result = getBrowserEnv(userAgent)
  if (['Windows', 'MacOS', 'Linux'].includes(result)) {
    return 'PC'
  }
  if (['Android', 'IOS', 'Tizen'].includes(result)) {
    return 'Mobile'
  }

  return result
}