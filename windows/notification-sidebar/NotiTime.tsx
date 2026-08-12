import Gtk from "gi://Gtk?version=4.0"
import { createPoll } from "ags/time"
import { formatRelativeTime } from "../../utils/realTime"

export default function NotiTime({ time }: { time: number }) {
  const relative = createPoll(formatRelativeTime(time), 30_000, () =>
    formatRelativeTime(time),
  )

  return <label class="content" label={relative} valign={Gtk.Align.END} />
}
