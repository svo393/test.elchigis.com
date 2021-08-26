import { GetServerSidePropsContext } from 'next'
import {
  isNonEmptyArray,
  isNonEmptyString,
  isPresent,
  toPairs,
} from './utils'

export let tenMinutesInMs = 600000
export let oneHourInMs = 3600000
export let oneDayInMs = 86400000
export let halfHourInSec = 1800
export let oneHourInSec = 3600
export let halfDayInSec = 43200
export let oneDayInSec = 86400
export let oneWeekInSec = 604800
export let oneMonthInSec = 2592000

export let inProduction = process.env['NODE_ENV'] === 'production'

export let isServer = typeof window === 'undefined'

export let wait = async (x = 2000) =>
  await new Promise((resolve) => setTimeout(resolve, x))

export let apiThrottle = async () =>
  !inProduction &&
  process.env['API_THROTTLE'] === '1' &&
  (await wait(1000))

export let encodeQuery = (x = '') => x.replace(/\+/g, '%2B')
export let decodeQuery = (x = '') => x.replace(/%2B/g, '+')

export let getTextByQty = (
  x: number,
  rest: string,
  when1: string,
  when2_4?: string
) =>
  x === 1
    ? when1
    : isPresent(when2_4) &&
      ![11, 12, 13, 14].includes(x) &&
      [2, 3, 4].includes(Number(`${x}`.slice(-1)))
    ? when2_4
    : rest

export let setCacheControl = (
  res: GetServerSidePropsContext['res'],
  sMaxage = halfHourInSec,
  stale = oneHourInSec
) => {
  res.setHeader(
    'Cache-Control',
    `s-maxage=${sMaxage}, stale-while-revalidate=${stale}`
  )
}

export let parseQueryString = (
  params: Record<string, any> | null,
  filters: Record<string, any> | null
) => {
  let queryParams = toPairs(params ?? {})
    .map((a) => isPresent(a[1]) && `${a[0]}=[${a[1]}]`)
    .filter((a) => isPresent(a))
    .join('&')

  let queryFilters = toPairs(filters ?? {})
    .map((a) =>
      isNonEmptyArray(a[1])
        ? `"${a[0]}":[${a[1]}]`
        : isPresent(a[1]) && a[1] !== '""'
        ? `"${a[0]}":${a[1]}`
        : null
    )
    .filter((a) => isPresent(a))
    .join(',')

  let queryString = [
    queryParams,
    isNonEmptyString(queryFilters) ? `filter={${queryFilters}}` : '',
  ]
    .filter((a) => isNonEmptyString(a))
    .join('&')

  return isNonEmptyString(queryString) ? `?${queryString}` : ''
}

export let createOrderId = (x: number, increment = false) => {
  let _x = `${x}`.slice(-6)
  if (increment) {
    _x = `${Number(_x) + 3}`
  }
  return `${_x.slice(0, 3)}-${_x.slice(3)}`
}
