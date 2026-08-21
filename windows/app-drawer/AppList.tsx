import AstalApps from "gi://AstalApps?version=0.1"
import Gtk from "gi://Gtk?version=4.0"
import { Accessor, For } from "gnim"
import { figma } from "../../utils/figma"
import AppCell from "./AppCell"
import { launchApp } from "../../services/apps"
import { setOpenOverlay } from "../../services/barState"

export default function AppList(props: {
  results: Accessor<AstalApps.Application[]>
}) {
  return (
    <scrolledwindow
      hscrollbarPolicy={Gtk.PolicyType.NEVER}
      vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
      minContentHeight={figma(253)}
      maxContentHeight={figma(253)}
    >
      <Gtk.FlowBox
        minChildrenPerLine={6}
        maxChildrenPerLine={6}
        columnSpacing={figma(8)}
        rowSpacing={figma(8)}
        selection_mode={Gtk.SelectionMode.NONE}
        valign={Gtk.Align.START}
        halign={Gtk.Align.START}
        $={(self) => {
          self.connect("child-activated", (_, child) => {
            const app = props.results()[child.get_index()]
            if (app) {
              launchApp(app)
              setOpenOverlay(null)
            }
          })
        }}
      >
        <For each={props.results}>{(app) => <AppCell app={app} />}</For>
      </Gtk.FlowBox>
    </scrolledwindow>
  )
}
