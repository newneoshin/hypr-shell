import Gtk from "gi://Gtk?version=4.0"
import SysOptionButton, { type SysOptionType } from "./SysOptionButton"
import { figma } from "../../utils/figma"
import { execAsync } from "ags/process"

const OPTIONS: SysOptionType[] = ["poweroff", "reboot", "suspend"]

export default function SysOptions() {
  return (
    <box
      orientation={Gtk.Orientation.VERTICAL}
      class="sys-options"
      spacing={figma(8)}
    >
      <label
        label="SYSTEM OPTIONS"
        class="content"
        halign={Gtk.Align.START}
        valign={Gtk.Align.CENTER}
      />
      <Gtk.FlowBox
        orientation={Gtk.Orientation.HORIZONTAL}
        minChildrenPerLine={3}
        maxChildrenPerLine={3}
        selectionMode={Gtk.SelectionMode.NONE}
        columnSpacing={figma(1)}
        $={(self) => {
          self.connect("child-activated", (_, child) => {
            const type = OPTIONS[child.get_index()]
            execAsync(["systemctl", type]).catch((r) => console.error(r))
          })
        }}
      >
        {OPTIONS.map((type) => (
          <SysOptionButton type={type} />
        ))}
      </Gtk.FlowBox>
    </box>
  )
}
