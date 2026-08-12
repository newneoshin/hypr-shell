import { Astal, Gdk } from "ags/gtk4"
import { ProgressPanel } from "./ProgressPanel"
import { TextPanel } from "./TextPanel"
import { With } from "gnim"

import { figma } from "../../utils/figma"
import { hovered } from "../../services/barState"
import { networkLabel } from "../../services/network"
import { brightness } from "../../services/brightness"
import { volume } from "../../services/volume"
import { battery } from "../../services/battery"

export default function DetailPanel(gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor

  return (
    <window
      gdkmonitor={gdkmonitor}
      visible={hovered.as((v) => v !== null)}
      class="DetailPanel"
      namespace="detail-panel"
      layer={Astal.Layer.OVERLAY}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={TOP | RIGHT}
      margin_top={figma(112)}
      margin_right={figma(0)}
    >
      <With value={hovered}>
        {(v) => {
          switch (v) {
            case "network":
              return <TextPanel value={networkLabel()} />
            case "brightness":
              return <ProgressPanel value={brightness()} />
            case "volume":
              return <ProgressPanel value={volume()} />
            case "battery":
              return <ProgressPanel value={battery()} />
            default:
              return <box /> // hovered === null
          }
        }}
      </With>
    </window>
  )
}
