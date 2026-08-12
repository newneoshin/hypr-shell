import AstalHyprland from "gi://AstalHyprland?version=0.1"
import { createBinding } from "gnim"
import { execAsync } from "ags/process"

const hyprland = AstalHyprland.get_default()

export const focusedWorkspace = createBinding(hyprland, "focused_workspace")
export const workspaces = createBinding(hyprland, "workspaces")

export function changeFocusWorkspace(id: number) {
  execAsync(["hyprctl", "dispatch", `hl.dsp.focus({workspace = ${id}})`]).catch(
    (reason) => {
      console.error(reason)
    },
  )
}
