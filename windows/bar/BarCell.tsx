import Gtk from "gi://Gtk?version=4.0"
import { Accessor } from "gnim"

export default function BarCell<T extends string>(props: {
  id: T
  label: string | Accessor<string>
  setHovered: ((id: T | null) => void) | null
  selected: Accessor<T | null> | null
  setSelected: ((id: T | null) => void) | null
}) {
  return (
    <box
      class={
        props.selected
          ? props.selected.as((v) => `cell ${v === props.id ? "selected" : ""}`)
          : "cell"
      }
      $={(self) => {
        const motion = new Gtk.EventControllerMotion()
        const click = new Gtk.GestureClick()

        motion.connect("enter", () => props.setHovered?.(props.id))
        motion.connect("leave", () => props.setHovered?.(null))
        click.connect("released", () => {
          if (props.selected?.() === props.id) {
            props.setSelected?.(null)
          } else {
            props.setSelected?.(props.id)
          }
        })

        self.add_controller(motion)
        self.add_controller(click)
      }}
    >
      <label label={props.label} />
    </box>
  )
}
