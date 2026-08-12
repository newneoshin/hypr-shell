import Gtk from "gi://Gtk?version=4.0"
import { createComputed } from "gnim"
import { figma } from "../../utils/figma"
import { workspaces } from "../../services/hyprland"

export default function Workspace(props: { index: number }) {
  const ws = createComputed(
    () => workspaces().find((w) => w.id === props.index) ?? null,
  )
  const appClass = createComputed(() => ws()?.last_client?.class ?? "(EMPTY)")

  return (
    <box
      class="workspace"
      orientation={Gtk.Orientation.VERTICAL}
      spacing={figma(12)}
      $={(self) => {
        const attach = () => {
          const parent = self.get_parent() // FlowBox가 자동으로 씌운 FlowBoxChild
          if (!parent) return

          const focusController = new Gtk.EventControllerFocus()
          focusController.connect("enter", () => self.add_css_class("focused"))
          focusController.connect("leave", () =>
            self.remove_css_class("focused"),
          )
          parent.add_controller(focusController)
        }

        if (self.get_parent()) {
          attach()
        } else {
          const id = self.connect("notify::parent", () => {
            attach()
            self.disconnect(id)
          })
        }
      }}
    >
      <label
        class="title"
        label={`󰍹 WORKSPACE${props.index}`}
        hexpand
        halign={Gtk.Align.START}
      />
      <label class="content" label={appClass} hexpand halign={Gtk.Align.END} />
    </box>
  )
}
