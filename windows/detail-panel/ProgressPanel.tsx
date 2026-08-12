import { Gtk } from "ags/gtk4"
import { figma } from "../../utils/figma"

export function ProgressPanel(props: { value: number }) {
  return (
    <box class="panel" spacing={0} halign={Gtk.Align.END}>
      <levelbar
        class="progress-bar"
        value={props.value}
        min_value={0}
        max_value={100}
        hexpand
        valign={Gtk.Align.CENTER}
        mode={Gtk.LevelBarMode.CONTINUOUS}
      />

      <box hexpand />

      <label valign={Gtk.Align.CENTER} label={`${props.value}%`} />
    </box>
  )
}
