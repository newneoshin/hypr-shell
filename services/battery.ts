import AstalBattery from "gi://AstalBattery?version=0.1"
import { createBinding, Accessor } from "gnim"
import { decimal_to_percent } from "../utils/number"

const device = AstalBattery.get_default()

export const battery = device
  ? createBinding(device, "percentage").as(decimal_to_percent)
  : new Accessor(() => 100)
