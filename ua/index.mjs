import fs from 'fs'
import path from 'path'
import xlsx from 'node-xlsx'
import { fileURLToPath } from 'url'
import { uniq } from 'lodash-es'
import { round, enableBoundaryChecking } from 'number-precision'
enableBoundaryChecking(false)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const langExcel = xlsx.parse(path.join(__dirname, './ua.csv')) // 需要转换的excel文件
const excelSheet = langExcel[0].data
// body: excel排除header的数据
const [columns, ...body] = excelSheet
const decodedBody = body.map((item) => decodeURIComponent(item[0]))
// 数据总数 835895
const dataTotal = decodedBody.length

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

function parseBrowserVersion() {
  // 去重后的数据
  const data = uniq(decodedBody)
  const result = data.map((ua) => {
    const browserInfo = getBrowserVersion(ua)
    return browserInfo.browser !== 'unknown'
      ? browserInfo
      : { ...browserInfo, version: ua }
  })

  console.log('数据总条数: ', result.length)

  const outData = result.reduce((acc, cur) => {
    const key = cur.browser
    if (acc[key]) {
      acc[key].push(cur.version)
      // 版本号排序
      acc[key].sort((a, b) => {
        let i = 0
        const arr1 = a.split('.')
        const arr2 = b.split('.')

        while (true) {
          const s1 = arr1[i]
          const s2 = arr2[i++]

          if (s1 === undefined || s2 === undefined) {
            return arr1.length - arr2.length
          }

          if (s1 === s2) continue

          return s1 - s2
        }
      })
    } else {
      acc[key] = [cur.version]
    }
    return acc
  }, {})

  fs.writeFileSync(
    './version.json',
    JSON.stringify(outData, null, '\t'),
    'utf-8'
  )
}

// parseBrowserVersion()

// 浏览器比例
function parseBrowserRatio() {
  const data = decodedBody

  const result = data.map((ua) => {
    const browserInfo = getBrowserVersion(ua)
    return browserInfo.browser !== 'unknown'
      ? browserInfo
      : { ...browserInfo, version: ua }
  })

  const outData = result.reduce((acc, cur) => {
    const key = cur.browser

    if (acc[key]) {
      acc[key].count += 1
    } else {
      acc[key] = { count: 1, ratio: 0 }
    }
    acc[key].ratio = `${round((acc[key].count / dataTotal) * 100, 6)}%`
    return acc
  }, {})

  fs.writeFileSync(
    './browserRatio.json',
    JSON.stringify(outData, null, '\t'),
    'utf-8'
  )
}

// parseBrowserRatio()

function parseBrowserVersionRatio() {
  const data = decodedBody

  const result = data.map((ua) => {
    const browserInfo = getBrowserVersion(ua)
    return browserInfo.browser !== 'unknown'
      ? browserInfo
      : { ...browserInfo, version: ua }
  })

  const outData = result.reduce((acc, cur) => {
    const key = cur.browser
    const version = cur.version
    if (!acc[key]) {
      acc[key] = { total: 1 }
    } else {
      acc[key].total += 1
    }

    if (acc[key][version]) {
      acc[key][version].count += 1
    } else {
      acc[key][version] = { count: 1, ratio: 0 }
    }
    return acc
  }, {})

  for (const [key, value] of Object.entries(outData)) {
    const { total, ...obj } = value
    const versions = []
    for (const [version, versionData] of Object.entries(obj)) {
      versionData.ratio = `${round(versionData.count / total * 100, 6)}%`
      versions.push({ ...versionData, version })
    }
    outData[key] = versions.sort((a, b) => b.count - a.count)
  }

  fs.writeFileSync(
    './browserVersionRatio.json',
    JSON.stringify(outData, null, '\t'),
    'utf-8'
  )
}

// parseBrowserVersionRatio()

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

function parseBrowserEnv() {
  const data = decodedBody

  const result = data.map((ua) => {
    const browserInfo = getBrowserEnv(ua)
    return { browser: browserInfo, version: ua }
  })

  const outData = result.reduce((acc, cur) => {
    const key = cur.browser
    if (acc[key]) {
      acc[key].count += 1
    } else {
      acc[key] = { count: 1, ratio: 0 }
    }
    acc[key].ratio = `${round((acc[key].count / dataTotal) * 100, 6)}%`
    return acc
  }, {})

  fs.writeFileSync(
    './env.json',
    JSON.stringify(outData, null, '\t'),
    'utf-8'
  )
}

// parseBrowserEnv()

function parseBrowserPlatform() {
  const data = decodedBody

  const result = data.map((ua) => {
    const browserInfo = getBrowserPlatform(ua)
    return { platform: browserInfo, version: ua }
  })

  const outData = result.reduce((acc, cur) => {
    const key = cur.platform
    if (acc[key]) {
      acc[key].count += 1
    } else {
      acc[key] = { count: 1, ratio: 0 }
    }
    acc[key].ratio = `${round((acc[key].count / dataTotal) * 100, 6)}%`
    return acc
  }, {})

  fs.writeFileSync(
    './platform.json',
    JSON.stringify(outData, null, '\t'),
    'utf-8'
  )
}

parseBrowserPlatform()