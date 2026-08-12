import app from "ags/gtk4/app"
import { Gdk, Gtk } from "ags/gtk4"
import style from "./style/main.scss"
import Bar from "./windows/bar/Bar"
import DetailPanel from "./windows/detail-panel/DetailPanel"
import NotificationSidebar from "./windows/notification-sidebar/NotificationSidebar"
import SystemControl from "./windows/system-control/SystemControl"
import { toggleOverlay, OverlayId } from "./services/barState"

const overlayIds: Exclude<OverlayId, null>[] = [
  "notifications",
  "system-control",
]

type WindowFactory = (gdkmonitor: Gdk.Monitor) => Gtk.Window

const windowFactories: WindowFactory[] = [
  Bar,
  DetailPanel,
  NotificationSidebar,
  SystemControl,
]

const monitorWindows = new Map<Gdk.Monitor, Gtk.Window[]>()

function addMonitor(monitor: Gdk.Monitor) {
  monitorWindows.set(
    monitor,
    windowFactories.map((create) => create(monitor)),
  )
}

function removeMonitor(monitor: Gdk.Monitor) {
  monitorWindows.get(monitor)?.forEach((win) => win.destroy())
  monitorWindows.delete(monitor)
}

function syncMonitors() {
  const current = new Set(app.get_monitors())

  for (const monitor of monitorWindows.keys()) {
    if (!current.has(monitor)) removeMonitor(monitor)
  }

  for (const monitor of current) {
    if (!monitorWindows.has(monitor)) addMonitor(monitor)
  }
}

app.start({
  css: style,
  requestHandler(request, res) {
    const [command] = request
    const match = command?.match(/^toggle-(.+)$/)
    const id = match?.[1] as OverlayId

    if (id && overlayIds.includes(id)) {
      toggleOverlay(id)
      res("ok")
    } else {
      res(`unknown request: ${command}`)
    }
  },
  main() {
    syncMonitors()
    app.connect("notify::monitors", syncMonitors)
  },
})
