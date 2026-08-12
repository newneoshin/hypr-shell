import { Gtk } from "ags/gtk4"

export function TextPanel(props: { value: string }) {
  return (
    <box class="panel" halign={Gtk.Align.END}>
      <label
        valign={Gtk.Align.CENTER}
        label={`${props.value}`}
        halign={Gtk.Align.CENTER}
        hexpand
      />
    </box>
  )
}
