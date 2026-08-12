import { figma } from "../../utils/figma"
import Gtk from "gi://Gtk?version=4.0"
import SysOptions from "./SysOptions"
import Workspaces from "./Workspaces"
import { Astal, Gdk } from "ags/gtk4"
import Overlay from "../../components/Overlay"

export default function SystemControl(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT } = Astal.WindowAnchor

  return (
    <Overlay
      id="system-control"
      gdkmonitor={gdkmonitor}
      class="SystemControl"
      namespace="system-control"
      anchor={TOP | LEFT}
      marginTop={figma(120)}
      marginLeft={figma(8)}
      onOpen={(self) => {
        self.present()
      }}
    >
      <box
        class="sys-card"
        spacing={figma(32)}
        orientation={Gtk.Orientation.VERTICAL}
      >
        <SysOptions />
        <Workspaces />
        <box vexpand />
      </box>
    </Overlay>
  )
}
