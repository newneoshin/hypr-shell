import Gtk from "gi://Gtk?version=4.0"
import AstalApps from "gi://AstalApps?version=0.1"
import { resolveAppIcon } from "../../utils/image"
import { figma } from "../../utils/figma"

export default function AppCell(props: { app: AstalApps.Application }) {
  return (
    <box
      class="app-cell"
      heightRequest={figma(64)}
      widthRequest={figma(64)}
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
    >
      <image {...resolveAppIcon(props.app)} pixel_size={figma(64)} />
    </box>
  )
}
