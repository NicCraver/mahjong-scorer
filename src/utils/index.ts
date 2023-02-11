/*
 * @Author: Nic
 * @Date: 2022-09-07 09:38:47
 * @LastEditTime: 2023-01-30 17:54:25
 * @LastEditors: Nic
 * @Description:
 * @FilePath: /mahjong-scorer/src/utils/index.ts
 */

// 随机六位数
export const getRandomSixDigit = () => {
  let code = '1'
  for (let i = 0; i < 5; i++) code += parseInt(Math.random() * 10)
  return code
}
export const isEmptyStr = (s: string) => {
  if (s === undefined || s === null || s === '')
    return true

  return false
}
