import Gtk from "gi://Gtk?version=4.0"

export type SysOptionType = "poweroff" | "reboot" | "suspend"

function icon(type: SysOptionType) {
  switch (type) {
    case "poweroff":
      return "󰐥"
    case "reboot":
      return "󰑙"
    case "suspend":
      return "󰒲"
  }
}

export default function SysOptionButton(props: { type: SysOptionType }) {
  return (
    <box
      class="sys-option-button"
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

        // FlowBox가 이 box를 FlowBoxChild로 감싸는 시점이 $ 콜백보다 늦을 수 있어서,
        // parent가 아직 없으면 parent가 생기는 순간(notify::parent)까지 기다림
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
        label={icon(props.type) + " " + props.type.toUpperCase()}
        class="content"
        hexpand
        halign={Gtk.Align.CENTER}
        valign={Gtk.Align.CENTER}
      />
    </box>
  )
}
