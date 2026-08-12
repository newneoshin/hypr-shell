import AstalWp from "gi://AstalWp?version=0.1"
import { createBinding } from "gnim"
import { decimal_to_percent } from "../utils/number"

export const volume = createBinding(
  AstalWp.get_default(),
  "default_speaker",
  "volume",
).as(decimal_to_percent)
