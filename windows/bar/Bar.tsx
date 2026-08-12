import app from "ags/gtk4/app"
import { Astal, Gdk } from "ags/gtk4"
import BarCell from "./BarCell"
import { figma } from "../../utils/figma"
import {
  setHovered,
  openOverlay,
  setOpenOverlay,
} from "../../services/barState"
import { focusedWorkspace } from "../../services/hyprland"
import { createComputed } from "gnim"

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
  const ws = createComputed(() => `󰣇 ${focusedWorkspace().get_id()}`)

  return (
    <window
      visible
      name="bar"
      namespace="bar"
      class="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox cssName="centerbox">
        <box $type="start">
          <BarCell
            id="system-control"
            label={ws}
            setHovered={null}
            selected={openOverlay}
            setSelected={setOpenOverlay}
          />
        </box>
        <box $type="center" />
        <box $type="end" spacing={figma(2)}>
          <BarCell
            id="network"
            label="NETWORK"
            setHovered={setHovered}
            selected={null}
            setSelected={null}
          />
          <BarCell
            id="brightness"
            label="BRIGHTNESS"
            setHovered={setHovered}
            selected={null}
            setSelected={null}
          />
          <BarCell
            id="volume"
            label="VOLUME"
            setHovered={setHovered}
            selected={null}
            setSelected={null}
          />
          <BarCell
            id="battery"
            label="BATTERY"
            setHovered={setHovered}
            selected={null}
            setSelected={null}
          />
          <BarCell
            id="notifications"
            label="NOTIFICATIONS"
            setHovered={null}
            selected={openOverlay}
            setSelected={setOpenOverlay}
          />
        </box>
      </centerbox>
    </window>
  )
}
