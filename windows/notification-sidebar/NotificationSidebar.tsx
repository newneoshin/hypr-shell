import { Astal, Gdk } from "ags/gtk4"
import { figma } from "../../utils/figma"
import { openOverlay } from "../../services/barState"
import { notiMap } from "../../services/notification"
import NotiList from "./NotiList"
import Overlay from "../../components/Overlay"

export default function NotificationSidebar(gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor

  return (
    <Overlay
      id="notifications"
      class="NotificationSidebar"
      gdkmonitor={gdkmonitor}
      namespace="notification-sidebar"
      anchor={TOP | RIGHT}
      marginTop={figma(120)}
      marginRight={figma(8)}
    >
      <NotiList notiMap={notiMap} />
    </Overlay>
  )
}
