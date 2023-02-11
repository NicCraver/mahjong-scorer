/*
 * @Author: Nic
 * @Date: 2023-01-31 09:15:31
 * @LastEditTime: 2023-01-31 09:29:02
 * @LastEditors: Nic
 * @Description: liveQuery 逻辑
 * @FilePath: /mahjong-scorer/src/api/useLiveQuery.ts
 */

// 监听room数据表的数据变化
export const useRoomLiveQuery = async () => {
  console.log('useGetUserID()', useGetUserID())
  const roomID = await useGetRoomIDByPlayerID(useGetUserID())
  console.log('roomID===', roomID)
  const query = new AV.Query('Rooms')
  query.equalTo('objectId', roomID)
  const a = await query.find()
  console.log('a', a)
  query.equalTo('objectId', roomID).subscribe().then((liveQuery: any) => {
    console.log('liveQuery订阅成功', liveQuery)
    liveQuery.on('update', (res: any, updatedKeys: any) => {
      console.log('liveQuery 数据发生变化', res)
      console.log('updatedKeys', updatedKeys)
    })
  })
}
