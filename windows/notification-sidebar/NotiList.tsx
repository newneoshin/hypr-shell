import Gtk from "gi://Gtk?version=4.0"
import { Accessor, createComputed, For } from "gnim"
import NotiCell from "./NotiCell"
import { figma } from "../../utils/figma"
import AstalNotifd from "gi://AstalNotifd?version=0.1"

export default function NotiList(props: {
  notiMap: Accessor<Map<number, AstalNotifd.Notification>>
}) {
  const notiList = createComputed(() =>
    [...props.notiMap().values()].sort((a, b) => b.time - a.time),
  )

  return (
    <box class="noti-card">
      <scrolledwindow
        hscrollbarPolicy={Gtk.PolicyType.NEVER}
        vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
        maxContentHeight={figma(1660)}
        minContentHeight={figma(1660)}
        minContentWidth={figma(424)}
        maxContentWidth={figma(424)}
      >
        <box
          orientation={Gtk.Orientation.VERTICAL}
          class="noti-list"
          spacing={figma(8)}
        >
          <For each={notiList}>{(noti) => <NotiCell noti={noti} />}</For>
        </box>
      </scrolledwindow>
    </box>
  )
}
