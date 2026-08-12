import { createState } from "gnim"

export type OverlayId = "notifications" | "system-control" | "app-drawer" | null

export const [hovered, setHovered] = createState<string | null>(null)
export const [openOverlay, setOpenOverlay] = createState<OverlayId>(null)

export function toggleOverlay(id: Exclude<OverlayId, null>) {
  setOpenOverlay((prev) => (prev === id ? null : id))
}
