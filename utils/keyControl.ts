import { Gdk, Gtk } from "ags/gtk4"

export function installEscClose(self: Gtk.Widget, onEsc: () => void) {
  const key = new Gtk.EventControllerKey()
  key.connect("key-pressed", (_, keyval) => {
    if (keyval === Gdk.KEY_Escape) onEsc()
  })
  self.add_controller(key)
}
