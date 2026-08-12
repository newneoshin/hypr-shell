import AstalNotifd from "gi://AstalNotifd?version=0.1"
import { createState } from "gnim"

const notifd = AstalNotifd.get_default()
export const [notiMap, setNotiMap] = createState<
  Map<number, AstalNotifd.Notification>
>(new Map())

notifd.connect("notified", (_source, id, replaced) => {
  const newNoti = _source.get_notification(id)
  if (newNoti === null) {
    return
  }

  setNotiMap((prev) => {
    const newMap = new Map(prev)
    newMap.delete(id)
    newMap.set(id, newNoti)
    return newMap
  })
})

notifd.connect("resolved", (_source, id, reason) => {
  setNotiMap((prev) => {
    const newMap = new Map(prev)
    newMap.delete(id)
    return newMap
  })
})
