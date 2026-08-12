import Gtk from "gi://Gtk?version=4.0"
import { changeFocusWorkspace, focusedWorkspace } from "../../services/hyprland"
import { figma } from "../../utils/figma"
import Workspace from "./Workspace"
import { setOpenOverlay } from "../../services/barState"

const DOCK_SLOT_COUNT = 10

export default function Workspaces() {
  return (
    <box
      orientation={Gtk.Orientation.VERTICAL}
      class="sys-options"
      spacing={figma(8)}
    >
      <label
        label="WORKSPACES"
        class="content"
        halign={Gtk.Align.START}
        valign={Gtk.Align.CENTER}
      />
      <Gtk.FlowBox
        orientation={Gtk.Orientation.HORIZONTAL}
        minChildrenPerLine={1}
        maxChildrenPerLine={1}
        selectionMode={Gtk.SelectionMode.NONE}
        rowSpacing={figma(8)}
        $={(self) => {
          self.connect("child-activated", (_, child) => {
            changeFocusWorkspace(child.get_index() + 1)
            setOpenOverlay(null)
          })
          self.connect("map", (self) => {
            const child = self.get_child_at_index(focusedWorkspace().id - 1)
            child?.grab_focus()
          })
        }}
      >
        {Array.from({ length: DOCK_SLOT_COUNT }, (_, i) => (
          <Workspace index={i + 1} />
        ))}
      </Gtk.FlowBox>
    </box>
  )
}
