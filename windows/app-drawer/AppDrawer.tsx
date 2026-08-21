import { createState } from "gnim"
import Gdk from "gi://Gdk?version=4.0"
import Overlay from "../../components/Overlay"
import AppList from "./AppList"
import Gtk from "gi://Gtk?version=4.0"

export default function AppDrawer(gdkmonitor: Gdk.Monitor) {
  const [query, setQuery] = createState("")

  return (
    <Overlay
      id="app-drawer"
      class="AppDrawer"
      gdkmonitor={gdkmonitor}
      namespace="app-drawer"
    >
      <box
        class="app-drawer-card"
        orientation={Gtk.Orientation.VERTICAL}
        spacing={0}
      >
        <entry
          class="search"
          placeholderText="SEARCH"
          $={(self) => {
            self.connect("changed", () => {
              setQuery(self.get_text())
            })

            self.connect("map", () => {
              setQuery("")
              self.set_text("")
              self.grab_focus()
            })
          }}
        />
        <AppList query={query} />
      </box>
    </Overlay>
  )
}
