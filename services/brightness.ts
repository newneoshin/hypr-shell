import AstalBrightness from "gi://AstalBrightness?version=0.1"
import { createBinding } from "gnim"
import { decimal_to_percent } from "../utils/number"

export const brightness = createBinding(
  AstalBrightness.get_default().screen,
  "brightness",
).as(decimal_to_percent)
