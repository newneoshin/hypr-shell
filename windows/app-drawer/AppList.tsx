import AstalApps from "gi://AstalApps?version=0.1"
import Gtk from "gi://Gtk?version=4.0"
import { Accessor } from "gnim"
import { figma } from "../../utils/figma"
import AppCell from "./AppCell"
import { launchApp, listApps, fuzzyScore, matchesQuery } from "../../services/apps"
import { setOpenOverlay } from "../../services/barState"

export default function AppList(props: { query: Accessor<string> }) {
  // A plain Map (not WeakMap): nothing else holds a strong JS reference to
  // the cell widgets, so a WeakMap here lets the GC reclaim their wrappers.
  // A later child.get_child() then returns a freshly-wrapped GObject that
  // was never a key in the map, so lookups silently return undefined —
  // apps stop launching and the filter treats every cell as non-matching.
  const cellApp = new Map<Gtk.Widget, AstalApps.Application>()

  function getApp(child: Gtk.FlowBoxChild) {
    const content = child.get_child()
    return content ? cellApp.get(content) : undefined
  }

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
          // Cells are created once and never removed/re-appended: repeatedly
          // reparenting them into GtkFlowBox's auto-wrapped GtkFlowBoxChild
          // (the old <For>-driven approach) corrupted GTK's bookkeeping and
          // caused icons to vanish or land in the wrong cell.
          for (const app of listApps()) {
            const cell = AppCell({ app })
            cellApp.set(cell, app)
            self.append(cell)
          }

          self.set_filter_func((child) => {
            const app = getApp(child)
            return app ? matchesQuery(props.query(), app) : false
          })

          self.set_sort_func((a, b) => {
            const appA = getApp(a)
            const appB = getApp(b)
            if (!appA || !appB) return 0
            const query = props.query()
            return fuzzyScore(query, appB) - fuzzyScore(query, appA)
          })

          const dispose = props.query.subscribe(() => {
            self.invalidate_filter()
            self.invalidate_sort()
          })

          self.connect("child-activated", (_, child) => {
            const app = getApp(child)
            if (app) {
              launchApp(app)
              setOpenOverlay(null)
            }
          })

          self.connect("destroy", dispose)
        }}
      />
    </scrolledwindow>
  )
}
