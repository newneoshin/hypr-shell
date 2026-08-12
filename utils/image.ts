import GioUnix from "gi://GioUnix?version=2.0"
import AstalNotifd from "gi://AstalNotifd?version=0.1"

export function resolveIcon(n: AstalNotifd.Notification) {
  if (n.image) {
    return { file: n.image }
  }

  if (n.appIcon?.startsWith("/") || n.appIcon?.startsWith("file://")) {
    return { file: n.appIcon.replace("file://", "") }
  }

  if (n.appIcon) {
    return { iconName: n.appIcon }
  }

  if (n.desktopEntry) {
    const appInfo = GioUnix.DesktopAppInfo.new(`${n.desktopEntry}.desktop`)
    const icon = appInfo?.get_icon()
    if (icon) return { gicon: icon }
  }

  return { iconName: "dialog-information-symbolic" }
}
