import AstalNotifd from "gi://AstalNotifd?version=0.1"
import Gtk from "gi://Gtk?version=4.0"
import NotiTime from "./NotiTime"
import Pango from "gi://Pango?version=1.0"
import { resolveIcon } from "../../utils/image"
import { figma } from "../../utils/figma"

export default function NotiCell(props: { noti: AstalNotifd.Notification }) {
  return (
    <box
      class="noti"
      orientation={Gtk.Orientation.HORIZONTAL}
      spacing={figma(16)}
      $={(self) => {
        const click = new Gtk.GestureClick()
        click.connect("released", () => {
          props.noti.dismiss()
        })
        self.add_controller(click)
      }}
    >
      <image
        {...resolveIcon(props.noti)}
        pixel_size={figma(64)}
        valign={Gtk.Align.CENTER}
      />
      <box
        orientation={Gtk.Orientation.VERTICAL}
        spacing={figma(4)}
        hexpand={false}
        vexpand={false}
        valign={Gtk.Align.CENTER}
      >
        <box orientation={Gtk.Orientation.HORIZONTAL}>
          <label
            class="app-name"
            label={props.noti.app_name ?? "UNKNOWN"}
            xalign={0}
            valign={Gtk.Align.END}
            ellipsize={Pango.EllipsizeMode.END}
          />
          <box hexpand />
          <NotiTime time={props.noti.time} />
        </box>
        <label
          class="content"
          label={props.noti.body}
          use_markup
          ellipsize={Pango.EllipsizeMode.END}
          xalign={0}
        />
      </box>
    </box>
  )
}
