import { Astal, Gdk, Gtk } from "ags/gtk4"
import { openOverlay, setOpenOverlay, OverlayId } from "../services/barState"
import { installEscClose } from "../utils/keyControl"

export default function Overlay(props: {
  id: Exclude<OverlayId, null>
  gdkmonitor: Gdk.Monitor
  class?: string
  namespace?: string
  anchor?: number
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  onOpen?: (self: Gtk.Window) => void
  children: JSX.Element
}) {
  return (
    <window
      $={(self) => {
        installEscClose(self, () => setOpenOverlay(null))

        self.connect("map", () => {
          self.present()
          props.onOpen?.(self)
        })
      }}
      gdkmonitor={props.gdkmonitor}
      class={props.class}
      namespace={props.namespace}
      layer={Astal.Layer.OVERLAY}
      exclusivity={Astal.Exclusivity.IGNORE}
      keymode={Astal.Keymode.ON_DEMAND}
      anchor={props.anchor}
      margin_top={props.marginTop}
      margin_bottom={props.marginBottom}
      margin_left={props.marginLeft}
      margin_right={props.marginRight}
      visible={openOverlay.as((v) => v === props.id)}
    >
      {props.children}
    </window>
  )
}
